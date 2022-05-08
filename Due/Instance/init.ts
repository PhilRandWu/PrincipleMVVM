import { options } from "./../type/options";
import { constructorProxy } from "./proxy";
import { mount } from './mount';
/*
 * @Description: 初始化 Due 构造函数
 * @Author: PhilRandWu
 * @Github: https://github/PhilRandWu
 * @Date: 2022-05-06 16:28:07
 * @LastEditTime: 2022-05-08 17:32:15
 * @LastEditors: PhilRandWu
 */
let uid = 0;

export function init(Due) {
  Due.prototype._init = function (options: options) {
    // 创建一些私有属性
    const vm = this;
    vm.uid = uid++;
    vm._isDue = true;

    // 运行生命周期函数，配置相关属性
    // 1.beforeCreated 钩子函数
    console.log("beforeCreated");
    // 2.注入 props data computed methods provide inject 等等
    // 最后使用代理模式挂载到实例中
    // 2.1 代理 data
    if (options && options.data) {
      console.log('_data',constructorProxy(vm, options.data, ""))
      vm._data = constructorProxy(vm, options.data, "");
    }
    // 3.created
    console.log('created');
    // 4.初始化 el 并挂载
    if(options && options.el) {
      let roomDom = document.getElementById(options.el);
      mount(vm,roomDom);
    }
  };
}
