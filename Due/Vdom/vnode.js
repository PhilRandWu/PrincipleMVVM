/*
 * @Description: 虚拟节点
 * @Author: PhilRandWu
 * @Github: https://github/PhilRandWu
 * @Date: 2022-02-16 11:59:02
 * @LastEditTime: 2022-02-16 12:10:32
 * @LastEditors: PhilRandWu
 */
/**
 * @description: 
 * @param {*}
 * @return {*}
 */
export default class Vnode {
    /**
     * @description: 
     * @param {*} tag // 标签类型  DIV, INPUT, SPAN, #TEXT
     * @param {*} elm // 真实节点
     * @param {*} child // 子节点
     * @param {*} text // 虚拟节点中的文本
     * @param {*} data // VnodeData 暂时保留，毫无意义
     * @param {*} parent // 父节点
     * @param {*} nodeType // 节点类型
     * @return {*}
     */    
    constructor(tag,elm,child,text,data,parent,nodeType) {
        this.tag = tag;
        this.elm = elm;
        this.child = child;
        this.text = text;
        this.data = data;
        this.parent = parent;
        this.nodeType = nodeType;
        this.env = {}; // 环境变量，所依赖的变量
        this.instructions = null; // 存储指令集合
        this.template = []; // 当前节点需要存储的指令集合
    }
}
