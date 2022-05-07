/*
 * @Description:
 * @Author: PhilRandWu
 * @Github: https://github/PhilRandWu
 * @Date: 2022-05-07 16:58:22
 * @LastEditTime: 2022-05-07 17:38:03
 * @LastEditors: PhilRandWu
 */

export default class Vnode {
  public env?; //环境
  public instructions?: any[] = null; // 指令
  template?: any[]; // 模板
  constructor(
    public tag: string, // 标签类型 DIV INPUT #TEXT
    public elm, // 真实 dom
    public children: Vnode | any[], // 子节点
    public text: string, // 文本内容
    public data, // 保留字
    public parents: Vnode | null, // 父节点
    public nodeType // 节点类型
  ) {
    (this.env = {}), (this.instructions = []), (this.template = []);
  }
}
