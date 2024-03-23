
export const joinArrays = (arr1, arr2, uniqueKey) => {
    const map = new Map();
    function addItemsToMap(array) {
        for (const item of array) {
            map.set(item[uniqueKey], item);
        }
    }
    addItemsToMap(arr2);
    addItemsToMap(arr1);
    const newArray = Array.from(map.values())
    return newArray
}
