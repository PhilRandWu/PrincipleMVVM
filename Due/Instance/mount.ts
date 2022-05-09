/*
 * @Description:
 * @Author: PhilRandWu
 * @Github: https://github/PhilRandWu
 * @Date: 2022-05-07 17:09:12
 * @LastEditTime: 2022-05-09 19:22:55
 * @LastEditors: PhilRandWu
 */
import Vnode from "../vdom/vnode";
import Due from "./index";
import { prepareRender, getNode2Template, getTemplate2Node } from "./render";
import { vModel } from "./grammar/vModel";
import { vFor } from "./grammar/vFor";
import { mergeAttr } from "../type/options";

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
  console.log(getNode2Template());
  console.log(getTemplate2Node());
}

function constructorVnode(vm, elm, parents) {
  // 分析相应的属性,处理 v-model
  let vnode = analysisAttr(vm, elm, parents);
  // 查看 vnode 是否是一个虚拟节点，如果不是再进行创建
  if (!vnode) {
    let children = [];
    let text = getElementText(elm);
    let data = null;
    let tag = elm.nodeName;
    let nodeType = elm.nodeType;
    vnode = new Vnode(tag, elm, children, text, data, parents, nodeType);

    // 如果有 v-for 并且绑定了 env, 则进行合并
    if (vnode.nodeType === 1 && elm.getAttribute("env")) {
      vnode.env = mergeAttr(vnode.env, JSON.parse(elm.getAttribute("env")));
    } else {
      // 继承父节点的数据
      vnode.env = mergeAttr(vnode.env, parents ? parents.env : {});
    }
  }

  let childs = vnode.elm.childNodes;
  for (let i = 0; i < childs.length; i++) {
    let childNodes = constructorVnode(vm, childs[i], vnode);
    if (childNodes instanceof Vnode) {
      //返回单一节点
      vnode.children.push(childNodes);
    } else {
      // 返回整个节点数组
      vnode.children = vnode.children.concat(childNodes);
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

function analysisAttr(vm, elm, parents) {
  if (elm.nodeType === 1) {
    // 如果当前节点为 元素节点，判断相应的属性
    const attrArr = elm.getAttributeNames();
    // console.log('attrArr',attrArr,elm.getAttribute('v-for'));
    if (attrArr.includes("v-model")) {
      vModel(vm, elm, elm.getAttribute("v-model"));
    }
    if (attrArr.includes("v-for")) {
      return vFor(vm, elm, parents, elm.getAttribute("v-for"));
    }
  }
}
