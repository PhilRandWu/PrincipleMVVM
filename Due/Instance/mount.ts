/*
 * @Description:
 * @Author: PhilRandWu
 * @Github: https://github/PhilRandWu
 * @Date: 2022-05-07 17:09:12
 * @LastEditTime: 2022-05-07 17:45:51
 * @LastEditors: PhilRandWu
 */
import Vnode from "../vdom/vnode";
import Due from "./index";
export function initMount() {
  Due.prototype.$mount = function (el) {
    let vm = this;
    let rootDom = document.getElementById(el);
    mount(vm, rootDom);
  };
}

export function mount(vm, rootDom) {
  // 4.1 beforeMount
  console.log("beforeMount");

  // 4.2 挂载
  // 根节点无父节点
  vm._vnode = constructorVnode(vm, rootDom, null);
}

function constructorVnode(vm, elm, parents) {
  let vnode = null;
  let children = [];
  let text = getElementText(elm);
  let data = null;
  let tag = elm.nodeName;
  let nodeType = elm.nodeType;
  vnode = new Vnode(tag, elm, children, text, data, parents, nodeType);
  return vnode;
}

function getElementText(dom): string {
  if(dom.nodeType === 3) {
      return dom.nodeValue;
  }
  return '';
}
