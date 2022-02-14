/*
 * @Description: 初始化
 * @Author: PhilRandWu
 * @Github: https://github/PhilRandWu
 * @Date: 2022-02-14 20:30:42
 * @LastEditTime: 2022-02-14 20:41:10
 * @LastEditors: PhilRandWu
 */
let uid = 0;

export function init (Due) {
    Due.prototype._init = function (options) {
        // 设置一些私有属性到实例中
        const vm = this;
        this.uid = uid ++;
        this._isDue = true;
        // 运行 beforeCreated 钩子函数
        // 进入注入流程：
        // 处理属性、computed、methods、data、provide、inject，最后使用代理模式将它们挂载到实例中
        // 运行生命周期钩子函数created
        // 生成render函数：如果有配置，直接使用配置的render，如果没有，使用运行时编译器，把模板编译为render
    };
}
