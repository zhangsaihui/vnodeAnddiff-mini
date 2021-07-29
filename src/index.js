/*
 * @Author: saihui
 * @Date: 2021-07-21 16:50:21
 * @LastEditTime: 2021-07-29 11:41:55
 * @LastEditors: saihui
 * @Description: 入口
 */
import h from "./h";

var vnode1 = h("section", {}, [
  h("p", {}, 1),
  h("p", {}, 2),
  h("p", {}, [
    h("span", {}, [h("b", {}, "b1"), h("b", {}, "b2")]),
    h("span", {}, h("b", {}, 7)),
  ]),
]);
var vnode2 = h("ul", { key: 1 }, [
  h(
    "li",
    {
      key: 1,
      domProps: {
        title: "title",
        class: "li1",
      },
      style: {
        color: "red",
        "font-size": "20px",
      },
      class: {
        li11: true,
      },
    },
    "li1"
  ),
  h("li", { key: 2 }, [
    h("button", {
      key: 1,
      style: {
        background: "blue",
        color: "white",
      },
      on:{
          click:()=>{
              alert(1)
          }
      }
    },"点击事件"),
  ]),
  h("li", { key: 3 }, "li3"),
  h("li", { key: 4 }, [h("p", { key: 1 }, "p1")]),
  h("li", { key: 6 }, "li6"),
]);
var vnode3 = h("ul", { key: 1 }, "kong");
var vnode4 = h("ul", { key: 1 }, [
  h("li", { key: 3 }, "li3"),
  h("li", { key: 4 }, [h("p", { key: 1 }, "p1"), h("p", { key: 2 }, "p2")]),
  h("li", { key: 1 }, "li1"),
  h("li", { key: 2 }, "li2_li2"),
  h("li", { key: 5 }, "li5"),
]);
import createElement from "./createElement";
var vnode = {
  sel: "section",
  data: {},
  children: [
    { sel: "p", data: {}, children: undefined, text: 1, elm: undefined },
    { sel: "p", data: {}, children: undefined, text: 2, elm: undefined },
  ],
  text: undefined,
  elm: undefined,
};
// console.log(createElement(vnode))

import patch from "./path";
var app = document.getElementById("app");
patch(app, vnode2);

var btn = document.getElementById("btn");
btn.onclick = function () {
  patch(vnode2, vnode4);
};
