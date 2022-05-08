/*
 * @Description: 
 * @Author: PhilRandWu
 * @Github: https://github/PhilRandWu
 * @Date: 2022-05-08 16:34:54
 * @LastEditTime: 2022-05-08 17:02:23
 * @LastEditors: PhilRandWu
 */
import { setValue } from '../../utils/object';

export function vModel(vm, elm, modelValue) {
    elm.onchange = function () {
        setValue(vm._data, modelValue, elm.value)
    }
}
