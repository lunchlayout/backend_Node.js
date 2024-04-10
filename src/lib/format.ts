
function doPublicURL(...paths: string[]) {
    return '/' + paths.join('/')
}
function doFileFormat(dir: string) {
    return dir.toLowerCase().split(' ').join('_')
}
export {doPublicURL, doFileFormat}