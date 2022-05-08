import { vm } from "./../type/options";
import { getValue } from '../utils/object';
/*
 * @Description:
 * @Author: PhilRandWu
 * @Github: https://github/PhilRandWu
 * @Date: 2022-05-07 19:25:53
 * @LastEditTime: 2022-05-08 17:30:54
 * @LastEditors: PhilRandWu
 */
// 分别定义 节点 到 模板 的对应关系
const template2node = new Map();

const node2template = new Map();

/**
 * @description: 进行预先渲染，解析模板语法
 * @param {*} vm
 * @param {*} vnode
 * @return {*}
 */
export function prepareRender(vm, vnode) {
  if (vnode === null || !vnode) {
    return;
  }
  if (vnode.nodeType === 3) {
    // 文本节点,进行分析处理
    analysisNode(vnode);
  } else if (vnode.nodeType === 1) {
    // 元素节点
    for (let i = 0; i < vnode.children.length; i++) {
      prepareRender(vm, vnode.children[i]);
    }
  }
}

/**
 * @description: 利用正则匹配 {{ }}
 * @param {*} vnode
 * @return {*} 指定的模板
 */
function analysisNode(vnode) {
  let tempMatchList = vnode.text.match(/{{[a-zA-Z0-9._]+}}/g);
  // 添加判断防止 未匹配到 任何东西
  for (let i = 0; tempMatchList && i < tempMatchList.length; i++) {
    setNode2Template(tempMatchList[i], vnode);
    setTemplate2Node(tempMatchList[i], vnode);
  }
}

/**
 * @description: 设置 templateName 与 node 对应
 * @param {*} template
 * @param {*} vnode
 * @return {*}
 */
function setTemplate2Node(template, vnode) {
  let templateName = getTemplateName(template);
  const setTemplate = template2node.get(templateName);
  if (setTemplate) {
    setTemplate.push(vnode);
  } else {
    template2node.set(templateName, [vnode]);
  }
}

/**
 * @description: 设置 node 与 templateName 对应
 * @param {*} template
 * @param {*} vnode
 * @return {*}
 */
function setNode2Template(template, vnode) {
  let templateName = getTemplateName(template);
  const setNode = node2template.get(vnode);
  if (setNode) {
    setNode.push(templateName);
  } else {
    node2template.set(vnode, [templateName]);
  }
}

/**
 * @description: 得到模板的名称，去掉 {{}}
 * @param {*} template
 * @return {*}
 */
function getTemplateName(template) {
  if (
    template.substring(0, 2) === "{{" &&
    template.substring(template.length - 2, template.length) === "}}"
  ) {
    return template.substring(2, template.length - 2);
  }
  return template;
}

export function getTemplate2Node() {
  return template2node;
}

export function getNode2Template() {
  return node2template;
}

/**
 * @description: 为 Due 实例提供一个 _render 的初始化函数
 * @param {*} Due
 * @return {*}
 */
export function renderMixin(Due) {
  Due.prototype._render = function () {
    renderNode(this, this._vnode);
  };
}

/**
 * @description: 渲染节点
 * @param {*} vm
 * @param {*} vnode
 * @return {*}
 */
function renderNode(vm: vm, vnode) {
  if (vnode.nodeType === 3) {
    // 是一个文本节点
    let templates = node2template.get(vnode); // 得到当前节点对应的模板
    if (templates) {
      let text = vnode.text;
      for (let i = 0; i < templates.length; i++) {
        // 此处的[vm._data,vm.env] 的原因时 for-in 循环子节点可能使用父节点的 key 与 index
        let templateValue = getTemplateValue([vm._data, vm.env], templates[i]);
        if (templateValue) {
          text = text.replace("{{" + templates[i] + "}}", templateValue);
        }
      }
      vnode.elm.nodeValue = text; // 改变真实 dom 下的 text
    }
  } else {
    // 重新查找当前节点的子节点
    for (let i = 0; i < vnode.children.length; i++) {
      renderNode(vm, vnode.children[i]);
    }
  }
}

/**
 * @description: 从 objs 里得到 template 对应的 value
 * @param {*} objs
 * @param {*} templateName
 * @return {*}
 */
function getTemplateValue(objs, templateName) {
  for (let i = 0; i < objs.length; i++) {
    const templateValue = getValue(objs[i], templateName);
    if (!templateValue) {
      return null;
    }
    return templateValue;
  }
}

/**
 * @description: 当数据发生更改时，实时渲染数据
 * @param {*}
 * @return {*}
 */
export function renderData(vm, templateName) {
  let nodes = template2node.get(templateName);
  if (nodes) {
    // 改变的数据名有对应的 nodes
    for (let i = 0; i < nodes.length; i++) {
      // 重新渲染数据
      renderNode(vm, nodes[i]);
    }
  }
}
