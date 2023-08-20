let _preloaded = [];

function pathMatch(pattern: string) {
    if (pattern === "*") return true;

    const segments = pattern.split('/');
    const pathSegments = location.pathname.split('/');

    return segments.length === pathSegments.length && segments.every((segment, index) => segment === '*' || segment === pathSegments[index]);
}

function cacheImages(array) {
    if (!_preloaded) {
        _preloaded = [];
    }
    let list = _preloaded;
    for (let i = 0; i < array.length; i++) {
        let img = new Image();
        img.onload = function() {
            const index = list.indexOf(this);
            if (index !== -1) list.splice(index, 1);
        }
        list.push(img);
        img.src = array[i];
    }
}

const insertAfter = (arr, index, newItem) => [
    ...arr.slice(0, index),
    newItem,
    ...arr.slice(index)
]

export { pathMatch, cacheImages, insertAfter };