import {
  dataURItoBlob
} from '@rjsf/utils';
// import {base64ToArrayBuffer} from "./base64ToArrayBuffer"
import { dataUriToBuffer } from 'data-uri-to-buffer';

// type FileInfoType = {
//   dataURL?: string | null;
//   name: string;
//   size: number;
//   type: string;
// };

export function getFileInfo(dataURL,includeBuffer=false){
  const { blob, name } = dataURItoBlob(dataURL);
  // console.log(blob)
  let buffer=null
  if(includeBuffer){
    // const dataURLSplit = dataURL.split('base64,')
    try{
      const parsed = dataUriToBuffer(dataURL)
      buffer = parsed.buffer
    }catch(e){
      console.log(`extractFileInfo could not convrt base64 data to ArrayBuffer`,e)
    }
  }
  return {
          dataURL,
          name: name,
          size: blob.size,
          type: blob.type,
          buffer
        }
}
