/*
 * @Description:
 * @Author: PhilRandWu
 * @Github: https://github/PhilRandWu
 * @Date: 2022-02-14 20:17:53
 * @LastEditTime: 2022-05-09 17:17:12
 * @LastEditors: PhilRandWu
 */
import Due from "../Due/index";

const test = new Due({
  el: "app",
  data: {
    content: "key",
    description: "this is description",
    obj: {
      a: "a1",
    },
    list: [
      { name: "kevin", age: 12 },
      { name: "set", age: 54 },
    ],
  },
});

console.log(test);
window["test"] = test;
