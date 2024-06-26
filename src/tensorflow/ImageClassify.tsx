import { useRef } from "react";
import * as tf from '@tensorflow/tfjs'
import { Divider, message, Skeleton, Space, Button, Input } from "antd";
import { useSetState, useMount } from 'react-use'

/**
 * 人脸识别系统1.0
 * 
 */

//最大分来数
const categories = 10

export default function ImageClassify() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const xs = useRef<tf.Tensor4D>()
  const ys = useRef<tf.Tensor2D>()
  const model = useRef<tf.Sequential>()
  const mobilenet = useRef<tf.LayersModel>()

  const [state, setState] = useSetState({
    name: 'hans',
    modelReady: false,
    videoStatus: 'unstart' as 'pending' | 'started' | 'unstart' | 'faulted',
    training: false,//训练中
    list: [] as { name: string, count: number, preview: string[] }[],
    epoch: 0, loss: 0
  })


  useMount(async () => {
    //加载mobilenet模型
    const mnet = await tf.loadLayersModel(import.meta.env.BASE_URL + 'mobilenet_v1_0.25_224/mobilenet.json')
    // mnet.summary() //打印模型信息
    //预热模型，让第一个预测更快。
    const prediction = mnet.predict(tf.zeros([1, 224, 224, 3])) as tf.Tensor2D
    prediction.dispose() //内存回收
    mobilenet.current = mnet

    //创建本地模型
    const m = tf.sequential()
    m.add(tf.layers.flatten({ inputShape: [7, 7, 256] }))
    m.add(tf.layers.dense({ units: 100, activation: 'relu' }))
    m.add(tf.layers.dense({ units: categories, activation: 'softmax' })) //分类个数
    const optimizer = tf.train.adam(0.0001) // learning rate
    m.compile({ optimizer: optimizer, loss: 'categoricalCrossentropy' })
    // m.summary()
    model.current = m
    setState({ modelReady: true })
  })

  //mobilenet 的原下载地址
  const downloadMobilenet = async () => {
    const mobilenet = await tf.loadLayersModel('https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json')
    const layer = mobilenet.getLayer('conv_pw_13_relu')
    const model = tf.model({ inputs: mobilenet.inputs, outputs: layer.output })
    await model.save('downloads://mobilenet')
  }

  const openCamera = () => {
    if (state.videoStatus === 'pending') return
    setState({ videoStatus: 'pending' })
    const video = videoRef.current!
    const { width, height } = video
    navigator.mediaDevices.getUserMedia({
      video: { width, height }
    }).then(mediaStream => {
      video.srcObject = mediaStream
      setState({ videoStatus: 'started' })
    }).catch(_ => {
      message.error('摄像头故障')
      setState({ videoStatus: 'faulted' })
    })
  }

  const train = () => {
    if (!xs.current || !ys.current || !model.current) return

    setState({ training: true })
    const batchSize = ~~(xs.current.shape[0] * 0.4)
    model.current.fit(xs.current, ys.current, {
      batchSize,
      epochs: 20,
      callbacks: {
        onEpochEnd: (_, logs: any) => {
          setState(e => ({ epoch: e.epoch + 1, loss: logs.loss }))
          // console.log("Epoch: " + epoch + " Loss: " + logs.loss)
        },
        onTrainEnd: () => {
          setState({ training: false })
        }
      }
    })
  }

  const predict = () => {
    if (!model.current || !mobilenet.current) return
    const video = videoRef.current!
    const image3d = tf.browser.fromPixels(video)
    //280 280 3 -> 224 224 3
    const resized = tf.image.resizeBilinear(image3d, [224, 224])
    const xs = resized.as4D(1, 224, 224, 3)
    const mxs = mobilenet.current.predict(xs) as tf.Tensor4D
    const prediction = model.current.predict(mxs) as tf.Tensor2D
    let n = prediction.argMax(1).dataSync()[0]

    console.log(n, state.list.find((_, key) => n === key)?.name ?? '未知')
    message.success(state.list.find((_, key) => n === key)?.name ?? '未知')
  }

  const test = () => {
    // //预览图片
    // const image = image3d.dataSync()
    // // image3d.dataSync()
    // const ctx = canvas.getContext('2d')!
    // const imageData = new ImageData(width, height)
    // for (let i = 0; i < width * height; i++) {
    //   const j = i * 4
    //   const k = i * 3
    //   imageData.data[j + 0] = image[k]
    //   imageData.data[j + 1] = image[k]
    //   imageData.data[j + 2] = image[k]
    //   imageData.data[j + 3] = 255
    // }
    // // ctx.putImageData(imageData, 0, 0)
    // ctx.drawImage(video, 0, 0, 100, 100)
  }

  const imageFromVideo = (video: HTMLVideoElement, size: [number, number]) => {
    const canvas = document.createElement('canvas')
    canvas.width = size[0]
    canvas.height = size[1]
    const ctx = canvas.getContext('2d')!
    ctx.drawImage(video, 0, 0, size[0], size[1])
    return canvas.toDataURL()
  }

  const updateCount = (name: string, preview: string) => {
    let upIndex = -1
    let list = state.list.map((i, k) => {
      if (i.name === name) {
        upIndex = k
        return { ...i, count: i.count + 1, preview: [preview, ...i.preview] }
      } else {
        return i
      }
    })

    if (upIndex === -1) {
      list = [...list, { name, count: 1, preview: [preview] }]
      upIndex = list.length - 1
    }
    setState({ list })
    return upIndex
  }

  const onKeep = (name: string) => {
    //检查摄像头是否打开
    if (state.videoStatus !== 'started') {
      return message.error('请打开摄像头')
    }

    if (!name) {
      return message.warning('请输入名称')
    }

    //创建样本
    const mxs = tf.tidy(() => {
      const image3d280 = tf.browser.fromPixels(videoRef.current!)
      //280 280 3 -> 224 224 3
      const image3d224 = tf.image.resizeBilinear(image3d280, [224, 224])
      //224 224 3 -> 1 224 224 3
      const image4d224 = image3d224.as4D(1, 224, 224, 3)
      //input-> 1 224 224 3, output-> 1 7 7 256
      const cxs = mobilenet.current!.predict(image4d224) as tf.Tensor4D

      return xs.current ? xs.current.concat(cxs, 0) : cxs
    })
    xs.current?.dispose()
    xs.current = mxs

    //更新、新增分类分类，并返回当前分类索引
    const index = updateCount(name,
      imageFromVideo(videoRef.current!, [100, 100])
    )

    //创建标签
    const mys = tf.tidy(() => {
      const ysd = new Array(categories).fill(0).fill(1, index, index + 1)
      const cys = tf.tensor2d(ysd, [1, categories])
      return ys.current ? ys.current.concat(cys, 0) : cys
    })
    ys.current?.dispose()
    ys.current = mys
  }

  return (
    <div className="container mx-auto p-4">
      <div className={
        'w-[280px] h-[280px] bg-amber-600 flex items-center justify-center '
      }>
        <video
          ref={videoRef}
          autoPlay
          width={280}
          height={280}
          style={{ display: state.videoStatus === 'started' ? 'block' : 'none' }}
        />
        <Button onClick={openCamera} type="primary"
          loading={state.videoStatus === 'pending'}
          style={{ display: state.videoStatus === 'started' ? 'none' : 'block' }}
        >打开摄像头</Button>
      </div>
      <Divider />
      <Skeleton active loading={!state.modelReady}>
        <Space className="flex flex-wrap">
          <Input value={state.name}
            style={{ maxWidth: 100 }}
            onChange={e => setState({ name: e.target.value })}
          />
          <Button onClick={() => onKeep(state.name)}
            type="primary"
          >录入</Button>
        </Space>
        <Divider />
        <div className="space-x-2 mb-1">
          <Button type="primary" onClick={train} loading={state.training}>训练</Button>
          <Button type="primary" onClick={predict}
          >预测</Button>
        </div>
        <div className="font-bold text-teal-500">epoch: {state.epoch} loss: {state.loss}</div>
        <Divider />
        <>
          {state.list.map(v => <div key={v.name}>
            <div className="font-bold mb-2">
              <span className="text-xl">{v.name}</span>: {v.count}
            </div>
            <div className="space-x-2 flex overflow-x-auto pb-2">
              {v.preview.map((src, k) => <img key={k} src={src} />)}
            </div>
          </div>)}
        </>
      </Skeleton>
    </div>
  )
}