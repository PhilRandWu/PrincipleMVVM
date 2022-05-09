/*
 * @Description: Due 构造函数参数限制
 * @Author: PhilRandWu
 * @Github: https://github/PhilRandWu
 * @Date: 2022-05-06 16:40:30
 * @LastEditTime: 2022-05-09 19:17:55
 * @LastEditors: PhilRandWu
 */
export interface options {
    el: string,
    data?: {} | [],
    methods?: {},
}


export interface vm {
    _data: {},
    env: {}
}


/**
 * @description: 合并两个对象
 * @param {*} obj1
 * @param {*} obj2
 * @return {*}
 */
 export function mergeAttr(obj1, obj2) {
    if (!obj1 && obj2) {
      return clone(obj2);
    }
    if (obj1 && !obj2) {
      return clone(obj1);
    }
    let result = {};
    let obj1Names = Object.getOwnPropertyNames(obj1);
    for (let i = 0; i < obj1Names.length; i++) {
      result[obj1Names[i]] = obj1[obj1Names[i]];
    }
    let obj2Names = Object.getOwnPropertyNames(obj2);
    for (let i = 0; i < obj2Names.length; i++) {
      result[obj2Names[i]] = obj2[obj2Names[i]];
    }
    return result;
  }
  
  /**
   * @description: 克隆一个数组或者对象
   * @param {*} obj
   * @return {*}
   */
  function clone(obj) {
    if (obj instanceof Array) {
      return cloneArray(obj);
    } else if (obj instanceof Object) {
      return cloneObject(obj);
    }
    return obj;
  }
  
  /**
   * @description: 克隆一个数组
   * @param {*} arr
   * @return {*}
   */
  function cloneArray(arr) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
      result[i] = clone(arr[i]);
    }
    return result;
  }
  
  /**
   * @description: 克隆一个对象
   * @param {*} obj
   * @return {*}
   */
  function cloneObject(obj) {
    let result = {};
    const objNames = Object.getOwnPropertyNames(obj);
    for (let i = 0; i < objNames.length; i++) {
      result[objNames[i]] = clone(obj[objNames[i]]);
    }
    return result;
  }
  
