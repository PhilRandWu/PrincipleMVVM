/*
 * @Description:
 * @Author: PhilRandWu
 * @Github: https://github/PhilRandWu
 * @Date: 2022-05-07 19:25:53
 * @LastEditTime: 2022-05-07 20:29:09
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
    setTemplate.push(templateName);
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
