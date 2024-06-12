export function isBlockData(blocks){
	if(!Array.isArray(blocks))
		return false
	const [row] = blocks
	const props = ["id","type","data"]
	const rowKeys = Object.keys(row)
	const found = rowKeys.some(r=> props.includes(r))
	return found
}