const v8 = require('v8');

// Since using NodeJS was allowed, I prefer this:

const deepCloneSerialize = obj =>  v8.deserialize(v8.serialize(obj));

/* Since I assume the spirit of the assignment is to write your own implementation, here's a recursive one. 
Doesn't work with arrays. Please assume that comments wouldn't be part of the production code.
*/

function deepCloneRecursive(obj) {
    const keys = Object.keys(obj);
    
    if (obj.constructor !== Object)  {
        throw "Paremeter not an Object"
    }

    let clone = keys.reduce((acc, key) =>  {
        const isObject = obj[key].constructor === Object;
        const copy = isObject ? deepCloneRecursive(obj[key]) : obj[key];
        return Object.assign(acc, { [key]: copy });
    }, {})

    return clone;
}

module.exports = { deepCloneSerialize, deepCloneRecursive } ;