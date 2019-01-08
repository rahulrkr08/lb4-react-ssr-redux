const _ = require('lodash')

/**
 * Utility function to pick up keys from the data
 * @param data
 * @param keys
 * @returns Array
 */
export const pickItems = (data: any, keys: any) => {

  if (typeof data === "object") {

    let pickedItems: any = {}
    _.forEach(keys, (key: any) => {
      pickedItems[key[0]] = _.get(data, key, "")
    })

    return pickedItems

  } else {
    return _.map(data, (item: any) => {

      let pickedItems: any = {}
      _.forEach(keys, (key: any) => {
        pickedItems[key[0]] = _.get(item, key, "")
      })

      return pickedItems
    })
  }


}

export const removeEmptyObjects = (obj: any) => {
  Object.entries(obj).forEach(([key, val]) =>
    (val && typeof val === 'object') && removeEmptyObjects(val) ||
    (val === null || val === "") && delete obj[key]
  );
  return obj;
};


/**
 * Remove duplicates from an array of objects in javascript
 * @param arr - Array of objects
 * @param prop - Property of each object to compare
 * @returns {Array}
 */
export function removeDuplicates(arr: any, prop: any) {
  let obj: any = {};
  for (let i = 0, len = arr.length; i < len; i++) {
    if (!obj[arr[i][prop]]) obj[arr[i][prop]] = arr[i];
  }
  let newArr = [];
  for (let key in obj) newArr.push(obj[key]);
  return newArr;
}
