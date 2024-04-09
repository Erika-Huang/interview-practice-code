/**
 * 深拷贝 与 浅拷贝
 */

const obj1 = {
    age: 20,
    name: 'xxx',
    address: {
        city: 'beijing'
    },
    arr: ['a', 'b', 'c']
}

// 浅拷贝
const obj2 = obj1

obj2.address.city = 'chengdu'
console.log(obj1.address.city) // chengdu（符合引用类型拷贝的规则，浅拷贝）

// ********************

const obj2 = deepClone(obj1)
obj2.address.city = 'chengdu'
console.log(obj1.address.city)

/**
 * 深拷贝
 * @param {object} obj 要拷贝的对象
 * @returns 
 */
function deepClone(obj = {}) {
    // obj是 null 或者 不是对象和数组，则不需要深拷贝，直接返回
    if (typeof obj !== 'object' || obj == null) {
        return obj
    }

    // 初始化返回结果
    let result
    if (obj instanceof Array) {
        result = []
    } else if (obj instanceof Object) {
        result = {}
    }

    // 通过上述条件筛选，最后一定是对象或数组。无论是对象还是数组，都可以用 for in 来遍历

    for (let key in obj) {
        // 判断 key 是不是 obj 自己所拥有的属性，保证 key 不是原型的属性
        if (obj.hasOwnProperty(key)) {
            // 递归 
            result[key] = deepClone(obj[key]);
            /**
             * 递归是为了挖掘比较深层次的值类型，例如：
             * address: {
             *     city:'chengdu'
             *     a: {
             *       b: {
             *          z:100
             *       }
             *     }
             * }
             * 只有一遍一遍的递归，才能找到深层次的值类型
             */
        }
    }
    // 返回结果
    return result
}