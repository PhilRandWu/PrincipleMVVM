/*
 * @Description: 代理 data
 * @Author: PhilRandWu
 * @Github: https://github/PhilRandWu
 * @Date: 2022-05-06 16:49:07
 * @LastEditTime: 2022-05-07 16:22:39
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
  // console.log('isArray',data instanceof Array,Array.isArray(data))
  let proxyObj = null;
  if (data instanceof Array) {
    // 是一个数组
    proxyObj = new Array(data.length);
    for (let i = 0; i < data.length; i++) {
      // 进而判断数组的每一项使用 constructor 进行代理，防止出现深层嵌套
      proxyObj[i] = constructorProxy(vm, data[i], namespace);
    }
    // 数组的修改也需要进行代理
    proxyObj = constructorArrayProxy(vm, data, namespace);
  } else {
    // 是一个对象，使用 Ts 类型检查机制，不必判断其他类型
    proxyObj = constructorObjectProxy(vm, data, namespace);
  }
  return proxyObj;
}

/**
 * @description: 处理代理对象
 * @param {*} vm
 * @param {options} data
 * @param {*} namespace
 * @return {*}
 */
export function constructorObjectProxy(vm, data: {}, namespace) {
  let proxyObj = {};
  for (const key in data) {
    Object.defineProperty(proxyObj, key, {
      configurable: true,
      get() {
        return data[key];
      },
      set: function (value) {
        console.log("set value", getNameSpace(namespace, key));
        data[key] = value;
      },
    });
    // 进一步在 Due 上代理
    Object.defineProperty(vm, key, {
      configurable: true,
      get() {
        return data[key];
      },
      set: function (value) {
        console.log("set value", getNameSpace(namespace, key));
        data[key] = value;
      },
    });
    // 判断如果是对象套对象 数组如何处理
    if (data[key] instanceof Object) {
      proxyObj[key] = constructorProxy(
        vm,
        data[key],
        getNameSpace(namespace, key)
      );
    }
  }
  return proxyObj;
}

/**
 * @description: 处理代理数组
 * @param {*} vm
 * @param {options} data
 * @param {*} namespace
 * @return {*}
 */
export function constructorArrayProxy(vm, arr, namespace) {
  let ArrayObj = {
    eleType: "Array",
    toString() {},
    push() {},
    pop() {},
    shift() {},
    unshift() {},
  };

  //   代理可能修改数组的方法
  proxyArrayFunction(vm, ArrayObj, "toString", namespace);
  proxyArrayFunction(vm, ArrayObj, "push", namespace);
  proxyArrayFunction(vm, ArrayObj, "pop", namespace);
  proxyArrayFunction(vm, ArrayObj, "shift", namespace);
  proxyArrayFunction(vm, ArrayObj, "unshift", namespace);

  //   修改 arr 的原型，将 arr 的隐式原型修改为 ArrayObj, 即可在 arr 上找不到相应方法便到 __proto__ 上查找
  arr.__proto__ = ArrayObj;
  return arr;
}

/**
 * @description: 得到其显示的命名空间
 * @param {*} nowNameSpace
 * @param {*} nowProp
 * @return {*}
 */
function getNameSpace(nowNameSpace, nowProp) {
  if (!nowNameSpace || nowNameSpace === "") {
    return nowProp;
  }
  if (!nowProp || nowProp === "") {
    return nowNameSpace;
  }
  return nowNameSpace + "." + nowProp;
}

const arrayProto = Array.prototype;
function proxyArrayFunction(vm, arrayObj, funcName: string, namespace) {
  Object.defineProperty(arrayObj, funcName, {
    configurable: true,
    enumerable: true,
    value: function (...args) {
      // 当其访问 funcName 时，进行处理
      // 监听 改变数组的 修改， 使用 funcName 对 数组修改
      console.log(getNameSpace(namespace, funcName));
      return arrayProto[funcName].apply(this, args);
    },
  });
}
