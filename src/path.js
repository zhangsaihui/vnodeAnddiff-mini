/*
 * @Author: saihui
 * @Date: 2021-07-21 17:37:20
 * @LastEditTime: 2021-07-28 16:54:37
 * @LastEditors: saihui
 * @Description:
 */
import { vnode } from "./h";
import createElement from "./createElement";
import patchChildren from "./patchChildren";
export default function path(oldVnode, newVnode) {
  // 是dom
  if (!oldVnode.sel) {
    const sel = oldVnode.tagName.toLowerCase();
    oldVnode = vnode(sel, {}, undefined, undefined, oldVnode);
  }
  //  console.log(oldVnode,newVnode)
  // 是同一个节点
  if (
    oldVnode.sel === newVnode.sel &&
    oldVnode.key === newVnode.key &&
    oldVnode.key !== undefined
  ) {
    console.log("是同一个节点", oldVnode.elm);
    // 新节点的
    if (newVnode.text) {
      if (newVnode.text !== oldVnode.text) {
        oldVnode.elm.innerText = newVnode.text;
      }
    } else if (Array.isArray(newVnode.children)) {
      let och = oldVnode.children;
      let nch = newVnode.children;

      // 老的vnode也是arr,就要遍历
      if (Array.isArray(och)) {
        patchChildren(och, nch, oldVnode.elm);
      } else {
        // 老vnode  不是arr, 就要把把新的vnode 插入
        nch.forEach((item) => {
          let chidDom = createElement(item);
          oldVnode.elm.appendChild(chidDom);
        });
      }
    }
  } else {
    console.log("不是同一个节点");
    let newDom = createElement(newVnode);
    if (oldVnode) {
      oldVnode.elm.appendChild(newDom);
    }
  }
}
