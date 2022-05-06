/*
 * @Description: 代理 data
 * @Author: PhilRandWu
 * @Github: https://github/PhilRandWu
 * @Date: 2022-05-06 16:49:07
 * @LastEditTime: 2022-05-06 17:12:13
 * @LastEditors: PhilRandWu
 */
import { options } from "./../type/options";

/**
 * @description: 处理代理
 * @param {*} vm
 * @param {options} data
 * @param {*} namespace
 * @return {*}
 */
export function constructorProxy(vm, data: options["data"], namespace) {
  let proxyObj = null;
  if (data instanceof Array) {
    // 是一个数组
  } else {
    // 是一个对象，使用 Ts 类型检查机制，不必判断其他类型
    proxyObj = constructorObjectProxy(vm, data, namespace);
  }
}

/**
 * @description: 处理代理对象
 * @param {*} vm
 * @param {options} data
 * @param {*} namespace
 * @return {*}
 */
export function constructorObjectProxy(vm, data: options["data"], namespace) {}

/**
 * @description: 处理代理数组
 * @param {*} vm
 * @param {options} data
 * @param {*} namespace
 * @return {*}
 */
export function constructorArrayProxy(vm, data: options["data"], namespace) {}
