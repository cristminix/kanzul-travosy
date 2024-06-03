import base64 from "base-64"
export function base64ToArrayBuffer(base64_string){
	return Uint8Array.from(base64.decode(base64_string), c => c.charCodeAt(0))
}