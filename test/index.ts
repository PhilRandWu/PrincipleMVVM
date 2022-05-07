/*
 * @Description: 
 * @Author: PhilRandWu
 * @Github: https://github/PhilRandWu
 * @Date: 2022-02-14 20:17:53
 * @LastEditTime: 2022-05-07 15:26:11
 * @LastEditors: PhilRandWu
 */
import Due from '../Due/index';

const test = new Due({
    el: 'app',
    data: {
        content: 'key',
        description: 'this is description',
        obj: {
            a: 1,
            b: 2022
        },
        list: [
            { a: 1, b: 2 },
            { c: 3, d: 4 }
        ]
    }
});

console.log(test);
window['test'] = test;
