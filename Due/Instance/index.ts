/*
 * @Description: 初始化构造函数
 * @Author: PhilRandWu
 * @Github: https://github/PhilRandWu
 * @Date: 2022-05-06 16:25:43
 * @LastEditTime: 2022-05-08 15:15:22
 * @LastEditors: PhilRandWu
 */
import { init } from "./init";
import { options } from "../type/options";
import { renderMixin } from "./render";

function Due(options: options) {
  this._init(options);
  this._render();
}

init(Due);
renderMixin(Due);

export default Due;
