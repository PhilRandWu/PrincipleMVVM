/*
 * @Description: 初始化构造函数
 * @Author: PhilRandWu
 * @Github: https://github/PhilRandWu
 * @Date: 2022-05-06 16:25:43
 * @LastEditTime: 2022-05-06 16:41:47
 * @LastEditors: PhilRandWu
 */
import { init } from './init';
import { options } from '../type/options';
export default function Due(options:options) {
    this._init(options);
}

init(Due);
