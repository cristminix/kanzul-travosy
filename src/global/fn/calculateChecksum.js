import CryptoJS from "crypto-js"

export function calculateChecksum(str){
	return CryptoJS.SHA256(str).toString()
}