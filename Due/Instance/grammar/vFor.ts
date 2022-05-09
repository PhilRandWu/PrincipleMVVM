/*
 * @Description:
 * @Author: PhilRandWu
 * @Github: https://github/PhilRandWu
 * @Date: 2022-05-09 16:56:14
 * @LastEditTime: 2022-05-09 17:15:52
 * @LastEditors: PhilRandWu
 */

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
  let forValue = analysisInstruction(instruction);
  console.log('forValue',forValue);
  // 0 表示无实际意义是一个虚拟节点
  let virtualNode = new Vnode(elm.tag, elm, [], "", forValue, parents, 0);
}

/**
 * @description: 分析指令 (item,index) in list
 * @param {*} instruction
 * @return {*}  [[item,index],list]
 */
function analysisInstruction(instruction) {
    let result = [];
    let instructionArr = instruction.trim().split(' ');
    if(instructionArr[1] !== 'in' || instructionArr.length !== 3) {
        return new Error('instruction error!!!');
    }
    if(instructionArr[0][0] === '(') {
        // 如果包含 (), 则去除括号处理
        instructionArr[0] = instructionArr[0].substring(1,instructionArr[0].length - 1);
    }
    result.push(instructionArr[0].split(','));
    result.push(instructionArr[2]);
    return result;
}
