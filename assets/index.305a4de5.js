import{g as C,m as O,r as M,C as j,d as P}from"./index.a2923c53.js";import{r as f,j as p}from"./index.1da63547.js";const G=t=>{const{componentCls:e,sizePaddingEdgeHorizontal:o,colorSplit:r,lineWidth:i}=t;return{[e]:Object.assign(Object.assign({},M(t)),{borderBlockStart:`${i}px solid ${r}`,"&-vertical":{position:"relative",top:"-0.06em",display:"inline-block",height:"0.9em",margin:`0 ${t.dividerVerticalGutterMargin}px`,verticalAlign:"middle",borderTop:0,borderInlineStart:`${i}px solid ${r}`},"&-horizontal":{display:"flex",clear:"both",width:"100%",minWidth:"100%",margin:`${t.dividerHorizontalGutterMargin}px 0`},[`&-horizontal${e}-with-text`]:{display:"flex",alignItems:"center",margin:`${t.dividerHorizontalWithTextGutterMargin}px 0`,color:t.colorTextHeading,fontWeight:500,fontSize:t.fontSizeLG,whiteSpace:"nowrap",textAlign:"center",borderBlockStart:`0 ${r}`,"&::before, &::after":{position:"relative",width:"50%",borderBlockStart:`${i}px solid transparent`,borderBlockStartColor:"inherit",borderBlockEnd:0,transform:"translateY(50%)",content:"''"}},[`&-horizontal${e}-with-text-left`]:{"&::before":{width:"5%"},"&::after":{width:"95%"}},[`&-horizontal${e}-with-text-right`]:{"&::before":{width:"95%"},"&::after":{width:"5%"}},[`${e}-inner-text`]:{display:"inline-block",padding:"0 1em"},"&-dashed":{background:"none",borderColor:r,borderStyle:"dashed",borderWidth:`${i}px 0 0`},[`&-horizontal${e}-with-text${e}-dashed`]:{"&::before, &::after":{borderStyle:"dashed none none"}},[`&-vertical${e}-dashed`]:{borderInlineStartWidth:i,borderInlineEnd:0,borderBlockStart:0,borderBlockEnd:0},[`&-plain${e}-with-text`]:{color:t.colorText,fontWeight:"normal",fontSize:t.fontSize},[`&-horizontal${e}-with-text-left${e}-no-default-orientation-margin-left`]:{"&::before":{width:0},"&::after":{width:"100%"},[`${e}-inner-text`]:{paddingInlineStart:o}},[`&-horizontal${e}-with-text-right${e}-no-default-orientation-margin-right`]:{"&::before":{width:"100%"},"&::after":{width:0},[`${e}-inner-text`]:{paddingInlineEnd:o}}})}},H=C("Divider",t=>{const e=O(t,{dividerVerticalGutterMargin:t.marginXS,dividerHorizontalWithTextGutterMargin:t.margin,dividerHorizontalGutterMargin:t.marginLG});return[G(e)]},{sizePaddingEdgeHorizontal:0});var I=globalThis&&globalThis.__rest||function(t,e){var o={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(o[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(t);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(t,r[i])&&(o[r[i]]=t[r[i]]);return o};const N=t=>{const{getPrefixCls:e,direction:o}=f.exports.useContext(j),{prefixCls:r,type:i="horizontal",orientation:l="center",orientationMargin:a,className:m,rootClassName:b,children:d,dashed:x,plain:$}=t,u=I(t,["prefixCls","type","orientation","orientationMargin","className","rootClassName","children","dashed","plain"]),n=e("divider",r),[S,w]=H(n),v=l.length>0?`-${l}`:l,s=!!d,c=l==="left"&&a!=null,h=l==="right"&&a!=null,y=P(n,w,`${n}-${i}`,{[`${n}-with-text`]:s,[`${n}-with-text${v}`]:s,[`${n}-dashed`]:!!x,[`${n}-plain`]:!!$,[`${n}-rtl`]:o==="rtl",[`${n}-no-default-orientation-margin-left`]:c,[`${n}-no-default-orientation-margin-right`]:h},m,b),g=f.exports.useMemo(()=>typeof a=="number"?a:/^\d+$/.test(a)?Number(a):a,[a]),z=Object.assign(Object.assign({},c&&{marginLeft:g}),h&&{marginRight:g});return S(p("div",{...Object.assign({className:y},u,{role:"separator"}),children:d&&i!=="vertical"&&p("span",{className:`${n}-inner-text`,style:z,children:d})}))},B=N;export{B as D};