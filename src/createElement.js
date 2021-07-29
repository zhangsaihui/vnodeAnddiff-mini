/*
 * @Author: saihui
 * @Date: 2021-07-21 17:22:47
 * @LastEditTime: 2021-07-29 11:39:10
 * @LastEditors: saihui
 * @Description: 虚拟DOM 生成真实dom
 */
/* 1, {children: undefined
data: undefined
elm: undefined
sel: "p"
text: 1} */

/* 
h("元素名称或组件名称", {
              domProps: { // 原生dom元素的一些属性
                value: 1,
                type: 'number',
                min: 1，
                innerHTML：’‘
              },
              props:{ // 传给组件数据 比喻iview  Button的type,size 等等
                type:'text',
                size:'small'
              }，
              class:{ // 类
                btn:true// 
              }，
              attrs:{ // html属性,class
	               id:'box'
	               class:'brn2'
              }，
              style:{ // 内联样式
                color:'red',
                "font-size":'12px'
              },
              slot:'slotName', // 组件的插槽
              on:{ // 事件 包括组件的自定义事件
	              click:()=>{
	              },
	              'on-change':()=>{
	              },
              }，
              nativeOn:{ // 类似vue的.native修饰符，自定义组件常用
	              click:()=>{
	              }
              }
              }
              ,'文本啊啊啊'
     )
————————————————
版权声明：本文为CSDN博主「秋刀鱼笛滋味」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_43206949/article/details/89385550 */
export default function createElement(vnode){
    let { sel, data, children, text, elm ,key} = vnode
    let dom = document.createElement(sel)
    setAttrs(data,dom)
    setEvent(data,dom)
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

function setAttrs(data,dom){
  if(!data||Object.keys(data).length<1){
    return
  }
  
  // 添加dom属性
  const {domProps,attrs,style} = data
  const attr = {...domProps,...attrs}
  Object.keys(attr).forEach(item=>{
    dom.setAttribute(item,attr[item])
  })

  // 添加className
  if(data.class){
    let classNames = Object.keys(data.class)
    classNames = classNames.filter(item=>data.class[item])
    classNames.forEach(item=>{
      dom.classList.add(item)
    })  
  }

  //已添加style
  if(style){
    let styleStr = ""
    for(let key in style){
      styleStr+=`${key}:${style[key]};`
    }
    dom.setAttribute("style",styleStr)
  }

}


// 设置事件
function setEvent(data,dom){
  const { on }=data
  for(let eventName in on){
    dom.addEventListener(eventName,on[eventName])
  }
}