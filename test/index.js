/*
 * @Description: 
 * @Author: PhilRandWu
 * @Github: https://github/PhilRandWu
 * @Date: 2022-02-14 20:17:53
 * @LastEditTime: 2022-02-15 11:28:12
 * @LastEditors: PhilRandWu
 */
import Due from '../Due/index.js';

const test = new Due({
    el: 'app',
    data: {
        content: 'key',
        description: 'this is description'
    }
});

console.log(test);
window.test = test;
