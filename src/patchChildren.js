/*
 * @Author: saihui
 * @Date: 2021-07-27 15:11:20
 * @LastEditTime: 2021-07-28 17:10:37
 * @LastEditors: saihui
 * @Description: children的diff
 */
import patch from "./path";
import createElement from "./createElement";
export default function patchChildren(oldChildren, newChildren,parentNode) {
  // diff算法优化策略
  // 新前与旧前
  // 新后与旧后
  // 新后与旧前
  // 新前与旧后
  // 

  // 新前指针
  let newStartIdx = 0;
  // 新前节点
  let newStartNode = () => newChildren[newStartIdx];

  // 新后指针
  let newEndIdx = newChildren.length - 1;
  // 新后节点
  let newEndNode = () => newChildren[newEndIdx];

  // 旧前指针
  let oldStartIdx = 0;
  // 旧前节点
  let oldStartNode = () => oldChildren[oldStartIdx];

  // 旧后指针
  let oldEndIdx = oldChildren.length - 1;
  // 旧后节点
  let oldEndNode = () => oldChildren[oldEndIdx];

  // 储存oldChildren
  let keyMap = {}
   oldChildren.forEach((item,index)=>{
     if(item){
      keyMap[item.key]=index
     }
   })

   let newKeyMap = {}
   newChildren.forEach((item,index)=>{
    if(item){
      newKeyMap[item.key]=index
    }
  })
  while (newStartIdx <= newEndIdx && oldStartIdx <= oldEndIdx) {
    if(newStartNode()===undefined){
      newStartIdx += 1;
    }else if(newEndNode()===undefined){
      newEndIdx-=1
    }else if(oldStartNode()===undefined){
      oldStartIdx+=1
    }else if(oldEndNode()===undefined){
      oldEndIdx-=1
    // 新前与旧前
    }else if (sameNode(newStartNode(), oldStartNode())) {
      console.log("@1命中：新前与旧前");
      patch(oldStartNode(), newStartNode());
      newStartIdx += 1;
      oldStartIdx += 1;
      // 新后与旧后
    } else if (sameNode(oldEndNode(), newEndNode())) {
      console.log("@2命中：新后和旧后");
      patch(oldEndNode(), newEndNode());
      newEndIdx -= 1;
      oldEndIdx -= 1;
      // 新后与旧前， 把新后指向的节点移到旧后之后
    } else if (sameNode(newEndNode(), oldStartNode())) {
      console.log("@3命中：新后和旧前");
      patch(oldStartNode(), newEndNode());
      let targetDom = oldStartNode().elm;
      parentNode.insertBefore(targetDom, null);
      // oldChildren.push(oldStartNode())
      newEndIdx -= 1;
      oldStartIdx += 1;
      // 新前与旧后, 把新前对应的节点移动到旧前之前
    } else if (sameNode(newStartNode(), oldEndNode())) {
      console.log("@4命中：新前和旧后");
      patch(oldEndNode(), newStartNode());
      let targetDom = oldEndNode().elm;
      parentNode.insertBefore(targetDom, oldStartNode().elm);
      // oldChildren.splice(oldEndNode(),)
      newStartIdx += 1;
      oldEndIdx -= 1;
      // 都没有命中
    }else{
      console.log("@5没有命中")
      const oldNodeIdx = keyMap[newStartNode().key]
      // 新的节点在old里面不存在
      if(oldNodeIdx===undefined){
        let targetDom = createElement(newStartNode())
        parentNode.insertBefore(targetDom,oldStartNode().elm)
      }else{
      // 存在就要patch ,在移动
       patch(oldChildren[oldNodeIdx],newStartNode())
       parentNode.insertBefore(oldChildren[oldNodeIdx].elm,oldStartNode().elm)
       oldChildren[oldNodeIdx] = undefined;
      }
      newStartIdx+=1;
    }
  }

  // 循环完了
  // 新的节点没有插入
  if(newStartIdx<=newEndIdx){
    console.log("新节点需要插入")
     for(let i =newStartIdx;i<=newEndIdx;i++){
      let newNode = createElement(newChildren[i])
      parentNode.insertBefore(newNode,null)
      console.log(newNode,"插入")
      oldChildren.push(newChildren[i])
     }
  }else if(oldStartIdx<=oldEndIdx){
    console.log("旧节点需要移除")
    // 旧节点有多的需要移除
    for(let i =oldStartIdx;i<=oldEndIdx;i++){
      console.log(oldChildren[i],'移除')
      parentNode.removeChild(oldChildren[i].elm)
      oldChildren[i] = undefined
     }
  }
  oldChildren = newChildren
}

export const sameNode = (oldVnode, newVnode) => {
  if (oldVnode.key === newVnode.key && oldVnode.sel === newVnode.sel) {
    return true;
  }
  return false;
};
