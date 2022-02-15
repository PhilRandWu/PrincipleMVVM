/*
 * @Description: 代理
 * @Author: PhilRandWu
 * @Github: https://github/PhilRandWu
 * @Date: 2022-02-15 11:07:20
 * @LastEditTime: 2022-02-15 15:59:46
 * @LastEditors: PhilRandWu
 */
/**
 * @description: 代理函数
 * @param {*} vm Due 实例
 * @param {*} obj 代理对象
 * @param {*} namespace 命名空间
 * @return {*}
 */
export function constructorProxy(vm, obj, namespace) {
    let proxyObj = null;
    if (obj instanceof Array) { // 如果是数组
        proxyObj = new Array(obj.length);
        for(let i = 0; i < proxyObj.length; i ++) {
            proxyObj[i] = constructorProxy(vm, obj[i], namespace);
        }
        proxyObj = constructorArrayProxy(vm, obj, namespace);
    } else if (obj instanceof Object) { // 如果是对象 
        proxyObj = constructorObjectProxy(vm, obj, namespace);
    } else { // 其他类型数据
        throw new Error('no proxy this type data！！！');
    }
    return proxyObj;
}

/**
 * @description: 代理对象的构造函数
 * @param {*} vm
 * @param {*} obj
 * @param {*} namespace
 * @return {*}
 */
function constructorObjectProxy(vm, obj, namespace) {
    let proxyObj = {};
    for (let prop in obj) {
        Object.defineProperty(proxyObj, prop, {
            configurable: true,
            get() {
                return obj[prop];
            },
            set(value) {
                // console.log(getNamespace(namespace, prop));
                obj[prop] = value;
            }
        });
        Object.defineProperty(vm, prop, {
            configurable: true,
            get() {
                return obj[prop];
            },
            set(value) {
                console.log(getNamespace(namespace, prop));
                obj[prop] = value;
            }
        })
        if (obj[prop] instanceof Object) {
            proxyObj[prop] = constructorProxy(vm, obj[prop], getNamespace(namespace, prop));
        }
    }
    return proxyObj;
}

/**
 * @description: 得到修改的具体属性， namespace
 * @param {*} nowNameSpace
 * @param {*} nowProp
 * @return {*}
 */
function getNamespace(nowNameSpace, nowProp) {
    if (nowNameSpace === null || nowNameSpace === '') {
        return nowProp;
    } else if (nowProp === null || nowProp === '') {
        return nowNameSpace;
    } else {
        return nowNameSpace + '.' + nowProp;
    }
}


const ArrayProto = Array.prototype;
function defArrayFunc (vm, obj, funcName, namespace) {
    Object.defineProperty(obj, funcName, {
        configurable: true,
        enumerable: true,
        value: function (...args) {
            let original = ArrayProto[funcName];
            console.log(getNamespace(namespace, ''))
            return original.apply(this, args);
        }
    })
}

function constructorArrayProxy(vm, arr, namespace) {
    const obj = {
        eleType: 'Array',
        toString() {},
        push() {},
        pop() {},
        shift() {},
        unshift() {}
    }
    defArrayFunc.call(vm, vm, obj,'push', namespace);
    defArrayFunc.call(vm, vm, obj,'toString', namespace)
    defArrayFunc.call(vm, vm, obj,'pop', namespace)
    defArrayFunc.call(vm, vm, obj,'shift', namespace)
    defArrayFunc.call(vm, vm, obj,'unshift', namespace)
    arr.__proto__ = obj;
    return arr;
}
