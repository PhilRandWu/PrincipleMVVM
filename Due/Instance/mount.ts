/*
 * @Description:
 * @Author: PhilRandWu
 * @Github: https://github/PhilRandWu
 * @Date: 2022-05-07 17:09:12
 * @LastEditTime: 2022-05-07 20:24:02
 * @LastEditors: PhilRandWu
 */
import Vnode from "../vdom/vnode";
import Due from "./index";
import { prepareRender, getNode2Template, getTemplate2Node } from "./render";

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
  // 预渲染
  prepareRender(vm, vm._vnode);
  console.log(getNode2Template())
  console.log(
    getTemplate2Node())
}

function constructorVnode(vm, elm, parents) {
  let vnode = null;
  let children = [];
  let text = getElementText(elm);
  let data = null;
  let tag = elm.nodeName;
  let nodeType = elm.nodeType;
  vnode = new Vnode(tag, elm, children, text, data, parents, nodeType);

  let childs = vnode.elm.childNodes;
  for (let i = 0; i < childs.length; i++) {
    let childNodes = constructorVnode(vm, childs[i], vnode);
    if (childNodes instanceof Vnode) {
      //返回单一节点
      children.push(childNodes);
    } else {
      // 返回整个节点数组
      vnode.childNode = vnode.childNode.concat(childNodes);
    }
  }

  return vnode;
}

function getElementText(dom): string {
  if (dom.nodeType === 3) {
    return dom.nodeValue;
  }
  return "";
}
