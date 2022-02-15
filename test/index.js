/*
 * @Description: 
 * @Author: PhilRandWu
 * @Github: https://github/PhilRandWu
 * @Date: 2022-02-14 20:17:53
 * @LastEditTime: 2022-02-15 14:19:04
 * @LastEditors: PhilRandWu
 */
import Due from '../Due/index.js';

const test = new Due({
    el: 'app',
    data: {
        content: 'key',
        description: 'this is description',
        obj: {
            a: 1,
            b: 2022
        }
    }
});

console.log(test);
window.test = test;
