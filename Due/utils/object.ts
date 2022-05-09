/*
 * @Description:
 * @Author: PhilRandWu
 * @Github: https://github/PhilRandWu
 * @Date: 2022-05-08 16:19:21
 * @LastEditTime: 2022-05-09 19:55:55
 * @LastEditors: PhilRandWu
 */
/**
 * @description: 从一个对象中得到 key.a 的value
 * @param {*} obj
 * @param {*} templateName
 * @return {*}
 */
export function getValue(obj, templateName) {
  if (!obj) {
    return;
  }
  // key.a
  let nameList = templateName.split(".");
  let temp = obj;
  for (let i = 0; i < nameList.length; i++) {
    // 查看 obj 下是否有 key, 有的话 temp 变为 temp[key]
    // console.log('nameList',nameList,temp,temp[nameList[i]])
    if (temp[nameList[i]]) {
      temp = temp[nameList[i]];
    } else {
      return;
    }
  }
  return temp;
}

/**
 * @description:
 * @param {*} obj vm._data
 * @param {*} modelValue v-model 绑定的 value
 * @param {*} value elm.value 实时的数据当修改时，elm.value 会自动修改
 * @return {*}
 */
export function setValue(obj, modelValue, value) {
  if (!obj) {
    return;
  }
  let temp = obj;
  let nameList = modelValue.split(".");
  // 查询直到倒数第二个判断是否有对应属性
  for (let i = 0; i < nameList.length - 1; i++) {
    if (temp[nameList[i]]) {
      temp = temp[nameList[i]];
    } else {
      return;
    }
  }
  // 如果到最后一个则判断是否有相应的属性
  if (temp[nameList[nameList.length - 1]]) {
    temp[nameList[nameList.length - 1]] = value;
  }
}
