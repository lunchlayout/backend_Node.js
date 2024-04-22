
function joinPaths(...paths: string[]) {
    return '/' + paths.join('/')
}

function doPathToModel(modelName: string) {
    return joinPaths('assets', 'models', modelName, 'model.gltf')
}

function doPathToImage(img: string) {
    return joinPaths('assets', 'images', img)
}


export {doPathToModel, doPathToImage}