import Rand from "rand-seed";

/**
 *
 * @param {Array<Object>} arr array to copy
 * @returns {Array<Object>} copy of array u give
 */
export function deepCopyArrayOfObjects(arr) {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    newArr.push({ ...arr[i] });
  }

  return newArr;
}

/**
 *
 * @param {JSON} item item to copy must be a json object
 * @returns {JSON} copy of array u give
 */
export function deepCopyObject(item) {
  return JSON.parse(JSON.stringify(item));
}

/**
 * Bubble Sort uhhh
 * @param {Array<Object>} arr
 * @returns {Array<Object>} deep copy of the array you give sorted from least to greatest by priority
 */
export function orderArrayOfObjectsByPriority(arr) {
  const newArr = deepCopyArrayOfObjects(arr);
  for (let i = 0; i < newArr.length; i++) {
    for (let j = 0; j < newArr.length - 1 - i; j++) {
      if (newArr[j].priority > newArr[j + 1].priority) {
        const tmp = newArr[j];
        newArr[j] = newArr[j + 1];
        newArr[j + 1] = tmp;
      }
    }
  }
  return newArr;
}

/**
 * Date 1 will be subtracted by date 2
 * @param {String} date1
 * @param {String} date2
 * @returns {Number} difference in days between date1 and 2
 */
export function getDateDiffInDays(date1, date2) {
  return (new Date(date1) - new Date(date2)) / 1000 / 60 / 60 / 24;
}

/**
 *
 * @param {Object} object
 * @param {String} path ex. app.class.classes
 */
export function sendObjToPath(object, path) {
  const arr = path.split(".");
  for (let i = 0; i < arr.length; i++) {
    object = object[arr[i]];
  }
  return object;
}

export function turnUnderscoreIntoSpace(input) {
  let tmp = "";
  for (let i = 0; i < input.length; i++) {
    if (input[i] === "_") {
      tmp = tmp + " ";
    } else tmp = tmp + input[i];
  }
  return tmp;
}
/**
 *
 * @param {String} path ex app.home.userCount
 * @param {String} idName ex class_id
 * @param {int} id
 * @returns array at that position only with the matching id objects
 */
export function selectArrayOfStateById(path, idName, id) {
  // make a function that takes in the state and the path and finds the state at that path or returns null.
  return function (state) {
    const stateArr = sendObjToPath(state, path);
    if (!stateArr) {
      //console.count('no state found');
      return null;
    }
    if (!path || !idName || !id) {
      return null;
    }
    if (isNaN(id)) {
      parseInt(id);
    }
    let tmp = [];
    for (let i = 0; i < stateArr.length; i++) {
      if (stateArr[i][idName] === id) {
        tmp.push(stateArr[i]);
      }
    }
    return tmp;
  };
}

/**
 *
 * @param {String} path ex app.home.userCount
 * @param {String} idName ex class_id
 * @param {*} id
 * @returns array at that position only with the matching id objects
 */
export function selectBINARYArrayOfStateById(path, idName, id) {
  // make a function that takes in the state and the path and finds the state at that path or returns null.
  return function (state) {
    const stateArr = sendObjToPath(state, path);
    if (!Array.isArray(stateArr)) {
      //console.count('no state found');
      return null;
    }
    if (!path || !idName || !id) {
      return null;
    }

    return selectMultipleBinarySearch(stateArr, idName, id);
  };
}

// pls pass in two objs with same keys TODO TEST
export function checkEquivalenceOfObjects(obj1, obj2) {
  if (!obj1 || !obj2) return false;
  let o1keys = Object.keys(obj1);
  for (let i = 0; i < o1keys.length; i++) {
    if (obj1[o1keys[i]] == obj2[o1keys[i]]) {
      continue;
    } else {
      //console.log(obj1, 'and ', obj2, ' are not equal');
      return false;
    }
  }
  return true;
}

/**
 * if what you are trying to add (a arr of obj) id is the same as it was before then dont add it.
 *
 * only checks id not equivalence
 * @param {Array} old
 * @param {Array} newA
 * @returns {Array}
 */
export function updateArrObjectsWithNewVals(old, newA) {
  const map = {};
  if (old) {
    for (let i = 0; i < old.length; i++) {
      map[old[i].id] = old[i];
    }
  } else {
    old = [];
  }
  let ret = [...old];
  for (let i = 0; i < newA.length; i++) {
    if (map && newA[i].id in map) {
      continue;
    } else {
      ret.push(newA[i]);
    }
  }
  return ret;
}
/**
 * Finds first occurence of needle in arr does not care  1 == "1" true
 * LINEAR SEARCH
 * @param {Array} array
 * @param {Array} keyNames
 * @param {*} needle
 */
export function findNeedleInArrayOfObjectsLINEAR(
  array,
  keyName,
  needle,
  keyWanted
) {
  if (!array || !needle) return null;
  for (let i = 0; i < array.length; i++) {
    if (array[i][keyName] == needle) {
      return array[i][keyWanted];
    }
  }
  return null;
}

/**
 * LINEAR SEARCH
 * @param {Array} array haystack
 * @param {Array} keyNamesToCheck ex ["name", "class_id"]
 * @param {Array} needles ex ["Test_Topic", "1"]
 * @param {Array} keyWanted key you want returned at location where it found the needle
 */
export function findNeedlesInArrayOfObjectsLINEAR(
  array,
  keyNamesToCheck,
  needles,
  returnKeyWanted
) {
  if (!array || !needles || !keyNamesToCheck || !returnKeyWanted) {
    return null;
  }
  let both_equal = false;
  for (let i = 0; i < array.length; i++) {
    both_equal = false;
    for (let j = 0; j < keyNamesToCheck.length; j++) {
      if (array[i][keyNamesToCheck[j]] != needles[j]) {
        both_equal = false;
        break;
      } else {
        both_equal = true;
      }
    }
    if (both_equal) return array[i][returnKeyWanted];
  }
  return null;
}

/**
 *
 * @param {Array} array
 * @param {*} objectKeyToCheck
 * @param {String} including
 */
export function selectArrayOfIncludingItem(array, objectKeyToCheck, including) {
  if (
    including === "" ||
    objectKeyToCheck === "" ||
    array?.length === 0 ||
    !array
  ) {
    return array;
  }
  let ret = [];
  for (let i = 0; i < array.length; i++) {
    if (
      String(array[i]?.[objectKeyToCheck])
        ?.toLowerCase()
        ?.includes(including?.toLowerCase())
    ) {
      ret.push(array[i]);
    }
  }
  return ret;
}

/**
 * casts everything to a string and calls includes
 * issue is it would match 2 and 22 if value to find was 222
 * @param {Array} array
 * @param {Array} keysToCheck
 * @param {Array} valuesIncluded
 */
export function selectArrayOfIncludingItems(
  array,
  keysToCheck,
  valuesIncluded
) {
  // todo if im trying to pull in question 430 it will pull in question 43, 30, and 430
  if (!Array.isArray(array) || keysToCheck == null) {
    return array;
  }

  let canRetEarly = true;
  for (let i = 0; i < keysToCheck?.length; i++) {
    if (valuesIncluded[i] == "" || valuesIncluded[i] == null) {
      continue;
    } else {
      canRetEarly = false;
    }
  }
  if (canRetEarly) {
    return array;
  }

  let ret = [];
  for (let i = 0; i < array.length; i++) {
    let canAdd = true;
    for (let j = 0; j < keysToCheck.length; j++) {
      // go through keys
      if (
        valuesIncluded[j] === "" ||
        String(array[i]?.[keysToCheck[j]])
          ?.toLowerCase()
          ?.includes(String(valuesIncluded[j])?.toLowerCase())
      ) {
        continue;
      } else {
        canAdd = false;
      }
    }
    if (canAdd) {
      ret.push(array[i]);
    }
  }
  return ret;
}

/**
 * checks equivalances using == againt the array and filter u are using. if valuesIncluded[i] == '' it is skipped
 * checks exact equivalence (the number u are using in the filter will be checked with == to the key)
 * @param {Array} array
 * @param {Array} keysToCheck
 * @param {Array} valuesIncluded
 */
export function selectArrayOfIncludingItemsByNumber(
  array,
  keysToCheck,
  valuesIncluded
) {
  if (!Array.isArray(array) || !Array.isArray(keysToCheck)) {
    return array;
  }

  let canRetEarly = true;
  for (let i = 0; i < keysToCheck?.length; i++) {
    if (valuesIncluded[i] == "" || valuesIncluded[i] == null) {
      continue;
    } else {
      canRetEarly = false;
    }
  }
  if (canRetEarly) {
    return array;
  }
  const ret = [];
  for (let i = 0; i < array.length; i++) {
    let canAdd = true;
    for (let j = 0; j < keysToCheck.length; j++) {
      if (valuesIncluded[j] !== "") {
        const curId = valuesIncluded[j];
        if (
          Array.isArray(array[i][keysToCheck[j]]) ||
          String(array[i][keysToCheck[j]]).includes(",")
        ) {
          let tmp = String(array[i][keysToCheck[j]]).split(",");
          for (let k = 0; k < tmp.length; k++) {
            if (tmp[k] == curId) {
              break;
            } else {
              canAdd = false;
            }
          }
        } else {
          if (array[i][keysToCheck[j]] == curId) {
            continue;
          } else {
            canAdd = false;
          }
        }
      }
    }
    if (canAdd) {
      ret.push(array[i]);
    }
  }
  return ret;
}

/**
 * unoptimal because of how state works
 * You pass in the id of the object u want to remove from the array
 * @param {Array<Object>} arr
 * @param {Int} id must be in the array which is a array of objects
 * @returns
 */
export function filterArr(arr, id) {
  if (!Array.isArray(arr) || !id) {
    return [];
  }
  let ret = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]?.id !== id) {
      ret.push(deepCopyObject(arr[i]));
    }
  }

  return ret;
}

/**
 * Operates on .id
 * Handles Creation of new obj and editing of object BY ID
 *
 *  ADDS NEW ITEM TO THE END
 * @param {Array} arr
 * @param {*} obj
 * @returns {Array} updated arr
 */
export function upsertArray(arr, obj) {
  if (!Array.isArray(arr) || !obj) {
    return [];
  }
  let ret = [];
  if (arr.length === 0) {
    ret.push(obj);
    return ret;
  }
  let added = false;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]?.id !== obj.id) {
      ret.push(arr[i]);
    } else {
      ret.push(obj);
      added = true;
    }
  }
  if (added === false) {
    ret.push(obj);
  }

  return ret;
}

export function copyArray(arr) {
  if (!Array.isArray(arr)) {
    return [];
  }
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    newArr.push(arr[i]);
  }
  return newArr;
}

/**
 * Adds key, value is amt of times you have tried to update it
 * @param {Object} map
 * @param {*} key
 */
export function updateObjectWithKey(map, key) {
  map = deepCopyObject(map);
  if (map[key] === undefined) {
    map[key] = 1;
  } else {
    map[key]++;
  }
  return map;
}

export function isKeyInObject(object, key) {
  if (object[key] !== undefined) {
    return true;
  }
  return false;
}

/**
 * Values will be overwritten
 * @param {Object} objects
 * @param {Array} keys
 */
export function updateObjectWithFirstKeyNotInObject(object, keys) {
  if (!keys || !object) {
    return object;
  }
  object = deepCopyObject(object);
  for (let i = 0; i < keys.length; i++) {
    if (object[keys[i]] !== undefined) {
      object[keys[i]]++;
      continue;
    } else {
      object[keys[i]] = 1;
      break;
    }
  }
  return object;
}

/**
 *
 * @param {String} given will be used with new Date(given)
 */
export function curTimeUTCMinusGiven(given) {
  if (!given) {
    return null;
  }
  // testable
  const diff = Math.abs(new Date().getTime() - new Date(given)) / 86400000;
  if (diff < 0) {
    return 0;
  } else {
    return diff;
  }
}

export class Streak {
  timeSince = null;
  constructor(last_claim) {
    this.timeSince = curTimeUTCMinusGiven(last_claim);
  }

  hasStreak() {
    if (this.timeSince == null) {
      return false;
    }
    if (this.timeSince > 2) {
      return false;
    }
    return true;
  }
  canClaimStreak() {
    if (this.timeSince == null) {
      return true;
    }
    if (this.timeSince > 1) {
      return true;
    }
    return false;
  }
}

/**
 * ${exam.semester}_${exam.year}_${exam.exam_num}
 * @param {String} examNameString
 */
export function parseExamNameId(examNameString) {
  examNameString = examNameString.split("_");
  return {
    semester: examNameString?.[0],
    year: examNameString?.[1],
    exam_num: examNameString?.[2],
  };
}

/**
 *
 * @param {String} string
 */
export function replaceP20WithSpace(string) {
  if (!string) {
    return null;
  }
  if (string.includes("%20")) {
    // optimize
    return string.replace(/%20/g, " ");
  } else {
    return string;
  }
}

/**
 * randomizes a arrays values TODO TEST
 * @param {Array} array array to be randomized
 * @returns {Array} randomized array
 */
export function randomizeArray(array, seed) {
  if (!array) {
    return null;
  }
  const rand = new Rand(seed); // TODO TEST SHOULD GENERATE SAME RANDOM NUMBER EVERY TIME

  const length = array.length;
  let newArr = [];
  for (let i = 0; i < length; i++) {
    const curLength = array.length;
    const randomIndex = Math.floor(rand.next() * curLength);
    newArr.push(array[randomIndex]);
    array = [
      ...array.slice(0, randomIndex),
      ...array.slice(randomIndex + 1, length),
    ];
  }
  return newArr;
}

/**
 * Objects must have same keys. values in object must be arrays or primitives
 * @param {*} obj1
 * @param {*} obj2
 * @returns {Object} a new objects where differences are stored in an array
 */
export function checkObjectDifferenceAndMerge(obj1, obj2) {
  const keys = Object.keys(obj1);
  const ret_obj = {};
  for (let i = 0; i < keys.length; i++) {
    // if 2 things are the same I dont want to merge them, however i need type_name to be merged no matter what lol.
    if (keys[i] !== "type_name" && obj1[keys[i]] === obj2[keys[i]]) {
      ret_obj[keys[i]] = obj1[keys[i]];
    } else {
      let tmpArr = [];
      if (Array.isArray(obj1[keys[i]])) {
        tmpArr = [...obj1[keys[i]]];
      } else {
        tmpArr.push(obj1[keys[i]]);
      }
      if (Array.isArray(obj2[keys[i]])) {
        tmpArr = [...obj2[keys[i]]];
      } else {
        tmpArr.push(obj2[keys[i]]);
      }
      ret_obj[keys[i]] = tmpArr;
    }
  }
  return ret_obj;
}

/**
 * Find item, then accumulate. Item MUST be sorted by the needleName key.
 *
 * @param {Array<Object>} haystack your haystack must an arr of objects where the needleName holds a value which is compareable.
 * @param {String} needleName
 * @param {*} needle must be compareable
 */
export function selectMultipleBinarySearch(haystack, needleName, needle) {
  if (
    !Array.isArray(haystack) ||
    !needleName ||
    !needle ||
    !haystack.length >= 1
  ) {
    console.log("passed in bad values");
    return [];
  }
  let left = 0;
  let right = haystack.length - 1;
  let middle;
  let found_index = -1;
  // trying to find a item that has the correct needle and the item before it does NOT have the correct needle.
  while (left <= right) {
    middle = Math.floor((right + left) / 2);
    if (haystack[middle][needleName] === needle) {
      found_index = middle;
      break; //watta we wanna
    } else if (needle > haystack[middle][needleName]) {
      left = middle + 1; // go right
    } else if (needle < haystack[middle][needleName]) {
      right = middle - 1; // go left
    }
  }
  if (found_index === -1 && (right < left || left > right)) {
    return [];
  }

  // we found a index we want, now backtrack to first item (backtracks to 0 or first item)
  let start = 0;
  for (let i = found_index; i > 0; i--) {
    if (
      haystack[i][needleName] === needle &&
      haystack[i - 1][needleName] !== needle
    ) {
      start = i;
      break;
    }
  }
  // now accumulate correct items
  let ret = [];
  for (let i = start; i < haystack.length; i++) {
    if (haystack[i][needleName] !== needle) {
      break;
    }
    ret.push(haystack[i]);
  }
  return ret;
}

export function findMaxValue(arr, keyToCheck) {
  let max = Number.MIN_SAFE_INTEGER;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]?.[keyToCheck] > max) max = arr[i]?.[keyToCheck];
  }
  return max;
}

// i made on in python that is intuitive and is also stable and I think its faster.
export function countingSort(arr, sortBy) {
  if (!Array.isArray(arr) || !sortBy || arr.length <= 0) {
    return [];
  }
  const count = new Array(findMaxValue(arr, sortBy) + 1).fill(0);
  for (let i = 0; i < arr.length; i++) {
    count[arr[i][sortBy]]++;
  }

  for (let i = 1; i < count.length; i++) {
    count[i] = count[i] + count[i - 1]; //  transforms the count array into an array of positions
  }
  const ret = new Array(arr.length);
  for (let i = arr.length - 1; i >= 0; i--) {
    ret[count[arr[i][sortBy]] - 1] = arr[i];
    count[arr[i][sortBy]]--;
  }
  return ret;
}

export function getSiteTitle(withTLD) {
  const title =
    window.location.hostname[0].toUpperCase() +
    window.location.hostname.slice(1);
  if (withTLD) return title;
  else return title.split(".")[0];
}

/**
 * Uses ===
 * @param {Array} array
 * @param {String} idName
 * @param {Any} id
 * @returns {*} returns the object found or null
 */
export function selectItemById(array, idName, id) {
  if (!Array.isArray(array)) {
    return null;
  }
  for (let i = 0; i < array.length; i++) {
    if (array[i]?.[idName] === id) {
      return array[i];
    }
  }
  return null;
}

/**
 * Pass in an array of objects pls
 * Uses ===
 * @param {Array} array
 * @param {String} idName
 * @param {Any} id must be same type as type in object ur looking for
 * @param {Object} options
 * @param {Boolean} options.toLowerCase sets the [idName] in the array to lower case for equivalences
 * @returns {Object} returns the object found or null
 */
export function selectBinaryItemById(array, idName, id, options = null) {
  if (!Array.isArray(array)) {
    return null;
  }
  let left = 0;
  let right = array.length - 1;
  let middle = 0;
  while (left <= right) {
    middle = Math.floor((right + left) / 2);
    const middleItem = options?.toLowerCase
      ? array[middle][idName].toLowerCase()
      : array[middle][idName];

    if (middleItem === id) {
      return array[middle];
    }

    if (id > middleItem) {
      left = middle + 1;
    } else if (id < middleItem) {
      right = middle - 1;
    } else {
      console.log("how?");
    }
  }
  return null;
}
