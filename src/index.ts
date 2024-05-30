/**
 * @name keyToHump
 * @description - Chinese: 把对象或数组里的对象的所有键名从下划线格式转换为驼峰格式|English: Convert all key names of object or all key names of all the objects in the array from underline format to camel hump format.
 * @param {object} obj - object to be processed
 * @returns {object} - Return processed object
 */
export function keyToHump<T extends object = object>(obj: T): T {
    let objStr: string = JSON.stringify(obj)
    objStr = objStr.replace(/((({")|(,"))(\w*)":)/g, (all, item) => {
        return all.replace(/\_(\w)/g, (all2, item2) => {
            // console.log(all, item, all2, item2.toUpperCase())
            return item2.toUpperCase()
        })
    })

    return JSON.parse(objStr)
}



/**
 * @name keyToLine
 * @description - Chinese: 把对象或数组里的对象的所有键名从驼峰格式转换为下划线格式|English: Convert all key names of object or all key names of all the objects in the array from camel hump format to underline format.
 * @param {object} obj - object to be processed
 * @returns {object} - Return processed object
 */
export function keyToLine<T extends object = object>(obj: T): T {
    let objStr: string = JSON.stringify(obj)
    objStr = objStr.replace(/((({")|(,"))(\w*)":)/g, (all, item) => {
        return all.replace(/([A-Z])/g, (all2, item2) => {
            // console.log(all, item, all2, '_' + item2.toLowerCase())
            return '_' + item2.toLowerCase()
        })
    })

    return JSON.parse(objStr)
}

// 可使用以上分别导出的导入，也可使用以下默认导出的导入
export default {
    keyToHump,
    keyToLine
}