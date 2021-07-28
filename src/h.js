/*
 * @Author: saihui
 * @Date: 2021-07-21 14:39:07
 * @LastEditTime: 2021-07-28 17:12:05
 * @LastEditors: saihui
 * @Description: h返回虚拟dom
 */
// h("div",{},"text")
// h("div",{},[h("p",{},0),h("p",{},1)])
// h("div",{},h("p",{},0))
export default function h  (sel, options, c)  {
  // debugger;
  if (typeof c === "string" || typeof c === "number") {
    return vnode(sel, options, undefined, c, undefined);
  } else if (Array.isArray(c)) {
    let children = [];
    c.forEach(item => {
      if (typeof item === "object" && item.sel) {
        children.push(vnode(item.sel, item.data, item.children || undefined, item.text, undefined));
      }
    });
    return vnode(sel, options, children, undefined, undefined);
  } else if (typeof c === "object" && c.sel) {
    return vnode(sel, options, c.children||undefined, c.text||undefined, undefined);
  }
};

export const vnode = (sel, data, children, text, elm) => {
  return { sel, data, children, text, elm, key: data.key };
};
