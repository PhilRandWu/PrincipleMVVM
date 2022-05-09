/*
 * @Description:
 * @Author: PhilRandWu
 * @Github: https://github/PhilRandWu
 * @Date: 2022-05-09 16:56:14
 * @LastEditTime: 2022-05-09 19:30:37
 * @LastEditors: PhilRandWu
 */

import { getValue } from "../../utils/object";
import Vnode from "../../vdom/vnode";

/**
 * @description: 实现 v-for 指令解析
 * @param {*} vm
 * @param {*} elm
 * @param {*} parents
 * @param {*} instruction v-for 对应的属性值
 * @return {*}
 */
export function vFor(vm, elm, parents, instruction) {
  const forValue = analysisInstruction(instruction);
  //   console.log('forValue',forValue);
  // 0 表示无实际意义是一个虚拟节点
  let virtualNode = new Vnode(elm.tag, elm, [], "", forValue, parents, 0);
  virtualNode.instructions = instruction;
  // 删除原先存在的 模板标签
  parents.elm.removeChild(elm);
  parents.elm.appendChild(document.createTextNode(""));
  responseVforData(vm, elm, forValue, parents);
  return virtualNode;
}

/**
 * @description: 分析指令 (item,index) in list
 * @param {*} instruction
 * @return {*}  [[item,index],list]
 */
function analysisInstruction(instruction) {
  let result = [];
  let instructionArr = instruction.trim().split(" ");
  if (instructionArr[1] !== "in" || instructionArr.length !== 3) {
    return new Error("instruction error!!!");
  }
  if (instructionArr[0][0] === "(") {
    // 如果包含 (), 则去除括号处理
    instructionArr[0] = instructionArr[0].substring(
      1,
      instructionArr[0].length - 1
    );
  }
  result.push(instructionArr[0].split(","));
  result.push(instructionArr[2]);
  return result;
}

/**
 * @description: 利用 红黑树的 原理， 生成虚拟节点，将对应的值遍历
 * @param {*} vm
 * @param {*} elm
 * @param {*} forValue
 * @param {*} parents
 * @return {*}
 */
function responseVforData(vm, elm, forValue, parents) {
  // 查找到 v-for 要循环的 数据的值
  const forList = forValue[1];
  const dataList = getValue(vm._data, forList);
  if (!dataList) {
    return new Error("this data is not Cycle!!!");
  }
  for (let i = 0; i < dataList.length; i++) {
    let tempDom = document.createElement(elm.nodeName);
    tempDom.innerHTML = elm.innerHTML;
    let env = analysisKV(forValue[0], dataList[i], i);
    // 将对应的 数据和 data 添加到 attr 中方便读取
    tempDom.setAttribute("env", JSON.stringify(env));
    parents.elm.appendChild(tempDom);
  }
}

/**
 * @description: 将对应的值进行渲染
 * @param {*} keys ['key','index']
 * @param {*} item dataList[i] 对应的数据
 * @param {*} index 索引
 * @return {*}  { key: xxx, index: x}
 */
function analysisKV(keys, item, index) {
//   console.log("keys", keys, "item", item, "index", index);
  let obj = {};
  if (keys.length === 0) {
    return;
  }
  if (keys.length >= 1) {
    obj[keys[0]] = item;
  }
  if (keys.length === 2) {
    obj[keys[1]] = index;
  }
  return obj;
}
