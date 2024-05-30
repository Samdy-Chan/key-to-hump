# @samdy-chan/key-to-hump 
### The efficacy of the "@samdy-chan/key-to-hump" library is to convert all key names (property names) of single objects or objects in arrays from underline format to camel hump format(key-to-hump), or from camel hump format to underline format(key-to-line).

### @samdy-chan/key-to-hump 这个库的功能是将单个对象或数组中对象的所有键名(属性名)从下划线格式转换为驼峰格式(key-to-hump)，或者从驼峰格式转换为下划线格式(key-to-line)。
<br/>

# Install（安装）
### npm install @samdy-chan/key-to-hump
<br/>

# Usage（使用）
```javascript
// the first way: default import
// 方式一：默认导入
// import keyFormatter from '@samdy-chan/key-to-hump';  // es6 module
// const keyFormatter = require('@samdy-chan/key-to-hump');  // commonjs

// the second way: import separately
// 方式二：分别导入
import { keyToHump, keyToLine } from '@samdy-chan/key-to-hump';  // es6 module
// const { keyToHump, keyToLine } = require('@samdy-chan/key-to-hump');  // commonjs

// Source data with the key name of the object in underline format
// 对象的键名为下划线格式的源数据
const source_data = [
    {
        my_first_name: 'Samdy',
        my_last_name: 'Chan',
        my_age: 18
    }
];

// Convert key names of object from underline format to camel hump format
// 将对象的键名从下划线格式转换为驼峰格式
const target_hump_data = keyToHump(source_data);

// Output results
// 输出结果
console.log(target_hump_data);  // [ { myFirstName: 'Samdy', myLastName: 'Chan', myAge: 18 } ]

// Convert key names of object from camel hump format to underline format
// 将对象的键名从驼峰格式转换为下划线格式
const target_underline_data = keyToLine(target_hump_data);

// Output results
// 输出结果
console.log(target_underline_data);  // [ { my_first_name: 'Samdy', my_last_name: 'Chan', my_age: 18 } ]
```