import{r as m,a as p,F as c,j as t}from"./index.1da63547.js";import{d as u}from"./debounceTime.e7311982.js";import{I as s}from"./index.91e89195.js";import{S as a}from"./Subject.cf6163b1.js";import"./async.ed1da8a1.js";import"./tslib.es6.9a4241f2.js";import"./Observable.e24fb2bb.js";import"./OperatorSubscriber.7b4f405e.js";import"./index.a2923c53.js";import"./index.434e4ebc.js";import"./button.52476b55.js";import"./isVisible.7ca29fb7.js";import"./render.43ae6a3d.js";import"./AntdIcon.78424b7e.js";import"./Compact.9bf7b630.js";import"./CloseCircleFilled.ad36d395.js";import"./useMergedState.31cb9ce1.js";const i=new a;function E(){m.exports.useEffect(()=>{const o=i.pipe(u(1e3)).subscribe(n=>{console.log("\u53D1\u9001\u8BF7\u6C42"),console.log(n)});return()=>{o.unsubscribe()}},[]);function r(e){const{value:o}=e.target;i.next(o)}return p(c,{children:[t("h1",{children:"RxSubject"}),t(s,{onChange:r}),t(s,{onChange:r})]})}export{E as default};