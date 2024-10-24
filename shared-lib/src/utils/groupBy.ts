export function groupBy(list: any[], keyGetter: (arg0: any) => any) {
    const map = new Map();
    for (var i = 0; i < list.length; ++i) {
        const item = list[i]
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    }
    return map;
}