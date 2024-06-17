import moment from "moment"
export function dateToSqlDateTime(date=new Date){
	return moment(date).format('YYYY-DD-MM HH:mm:ss');
}