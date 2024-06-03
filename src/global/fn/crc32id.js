import { crc32 } from "crc"

export function crc32id(){
	return crc32(new Date().getTime().toString()).toString(16)	
}