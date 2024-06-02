import base64 from 'base-64'
export function arrayBufferToBase64(buffer){
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return base64.encode(binary);
}