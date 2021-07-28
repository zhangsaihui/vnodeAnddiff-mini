/*
 * @Author: saihui
 * @Date: 2021-07-21 17:22:47
 * @LastEditTime: 2021-07-22 15:42:06
 * @LastEditors: saihui
 * @Description: 虚拟DOM 生成真实dom
 */
/* 1, {children: undefined
data: undefined
elm: undefined
sel: "p"
text: 1} */
export default function createElement(vnode){
    let { sel, data, children, text, elm ,key} = vnode
    let dom = document.createElement(sel)
    if(text|| text == ""){
      dom.innerText = text
    }else if(Array.isArray (children)&&children.length>0){
       children.forEach(item=>{
         var childDom =  createElement(item)
         dom.appendChild(childDom)
       })
    }
    vnode.elm = dom
    return dom;
}