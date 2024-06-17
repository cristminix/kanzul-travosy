export function createDateFromSqlDateTime(sqlDateTime){
	try{
		return new Date(Date.parse(sqlDateTime.replace(/-/g, '/')));
	}catch(e){}
	return new Date()
}