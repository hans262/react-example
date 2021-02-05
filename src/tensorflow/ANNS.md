# 神经网络

## 介绍

一种类似于大脑神经突触联接的结构进行信息处理的数学模型。
 - 神经元层，输入层、隐藏层及输出层
 - input output 隐层 阈值 误差 频值

## 训练

预先给出大量的数据(包含输入和输出)来进行训练，不断的调整权值和阈值，来使得输出值向理想的方向发展。训练完成后，这套标准的数据模型，就能在我们的真实环境模拟中给出一个令我们满意的输出。

## 阈值 threshold value

阈的意思是界限，阈值可以理解为值域，即是因变量（某个值因另一个值的变化而变化）的取值范围。
 - 例如：图层的透明图阈值为0-100，

## 权重/权值 weight value

 - 数学方面：每个数的频数，频率，次数
 - 现实世界：某个指标在整个分析过程中所占的重要程度，比重，百分比。

### 说明

 1. 比如你买辆车，你对车的属性有几方面认识——假定只有3个方面、质量、价格、舒适程度。你认为这个质量对你最重要，你赋权值为0.5，价格其次重要，赋值0.3，舒适程度适当考虑，并赋值0.2。
 2. 考试一般分为平时测验、期中考试、期末考试，学校规定的每个成绩所占的比重就叫权重，平时测验占比	20%，期中考试占比30%，期末考试占比50%

## 加权平均数 weight mean

不同比重数据的平均数，把原始数据按照合理的比例来计算。

### 说明

 1. 若n个数中，x1出现f1次，x2出现f2次，...，xk出现fk次，那么
 - x1*f1+x2*f2+...+xk*fk / f1+f2+...+fk 叫做x1，x2，...，xk的加权平均数

``` ts
  const heap=[1,2,2,3,5,5]
  const weightMean=(1*1+2*2+3*1+5*2) / (1+2+1+2)
```

## BP神经网络

是一种按照误差逆向传播算法训练的多层前馈神经网络，是目前应用最广泛的神经网络。
 1. 置各权值、阈值初始化
 2. 给定P个训练样本Xp(p=1, 2, ..., p) 和对应的理想输出Dp(p=1, 2, ...p)