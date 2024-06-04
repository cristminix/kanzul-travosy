import {getFileInfo} from "./getFileInfo"
export function dataURLtoFile(dataurl, filename=null) {
    const {name} = getFileInfo(dataurl)
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename? filename :name, {type:mime});
}