
/***FUNCTIONS***
 * 
 * //String $x; colomn names
 * //String $table; table name
 * //Array $array; Selector array of key/val arrays
 * selectXFromTableWhereArray($x,$table,$array){}
 * 
 * //String $table; table name
 * //Array $array; Selector array of key/val arrays
 * insertIntoTableValuesOfArray($table,$array){}
 * 
 * //String $table; table name
 * //Array $array; Update Set array of key/val arrays
 * //Array $selectarray; Selector array of key/val arrays
 * updateTableSetArrayWhereKeyVal($table,$setarray,$selectarray){}
 *
 * //String $table; table name
 * //Array $array; Update Set array of key/val arrays
 * //Array $selectarray; Selector array of key/val arrays
 * updateTableSetArrayWhereKeyVal($table,$array,$selectarray){}
 *
 *
 *alterTableTAuto_Increment($table,$num){}
 *selectMaxXAsNameFromTableWhereArray($x,$table,$array){}
 *deleteFromTableWhereArray($table,$array){}
 */

/**
 * array => [0] {[key]=value, [val]=value}
 * @param x 
 * @param table 
 * @param array 
 * @returns sql string
 */
export function selectXFromTableWhereArray(x: String, table: String, array: Array<String>): String{
	//build $sql string
	let sql: String =  "SELECT "+x+" FROM "+table;
	if(array.length>0){
		sql = sql+" where ";
		for(let y=0;y<array.length;y++){
			if(array[y]['val'].substring(0,1)!="^"){
				array[y]['val']='^'+array[y]['val']+'$';
			}
			sql = sql+array[y]['key']+" RLIKE '"+array[y]['val']+"' and ";
		}
		sql = sql.slice(0,-4);//remove trailing 'and '
	}
	return sql;
}
/**
 * array => [0] {[key]=value, [val]=value}
 * @param table 
 * @param array 
 * @returns sql string
 */
export function insertIntoTableValuesOfArray(table: String, array: Array<String>){
	let keyarray = [];
	let $valarray = [];
	let sql: String = "INSERT INTO "+table+" (";
	for(let y=0;y<array.length;y++){
		sql = sql+keyarray[y]+", ";
	}
	sql = sql.slice(0,-2);+") VALUES (";//remove trailing ', '
	for(let y=0;y<array.length;y++){
		sql = sql+"'"+$valarray[y]+"', ";
	}
	sql = sql.slice(0,-2);+")";//remove trailing ', '
	return sql;
}
/**
 * array => [0] {[key]=value, [val]=value}
 * @param table 
 * @param setarray 
 * @param selectarray 
 * @returns sql String
 */
export function updateTableSetArrayWhereKeyVal(table: String, setarray: Array<String>, selectarray: Array<String>){
	//build $sql string
	let sql = "UPDATE "+table+" SET ";
	for(let $y=0;$y<setarray.length;$y++){
		sql = sql+setarray[$y]['key']+"='"+setarray[$y]['val']+"', ";
	}
	sql = sql.slice(0,-2)+" WHERE ";//remove trailing ', '
	for(let $y=0;$y<selectarray.length;$y++){
		if(selectarray[$y]['val'].substring(0,1)!="^"){
			selectarray[$y]['val']='^'+selectarray[$y]['val']+'$';
		}
		sql = sql+selectarray[$y]['key']+" RLIKE '"+selectarray[$y]['val']+"' and ";
	}
	sql = sql.slice(0,-4);//remove trailing 'and '
	return sql;
}
export function alterTableTAuto_Increment($table,$num){
	let $sql = "ALTER TABLE "+$table+" AUTO_INCREMENT="+$num;
	//query $sql string
	return $sql;
}
export function selectMaxXAsNameFromTableWhereArray($x,$table,$array){
	let $sql =  "SELECT MAX("+$x+") AS "+$x+" FROM "+$table;
	if($array.length>0){
		$sql= $sql+" WHERE ";
		for(let $y=0;$y<$array.length;$y++){
			if($array[$y]['val'].substring(0,1)!="^"){
				$array[$y]['val']='^'+$array[$y]['val']+'$';
			}
			$sql = $sql+$array[$y]['key']+" RLIKE '"+$array[$y]['val']+"' and ";
		}
		$sql = $sql.slice(0,-4);//remove trailing 'and '
	}
	return $sql;
}
export function deleteFromTableWhereArray($table,$array){
	let $sql =  "DELETE FROM "+$table;
	if($array.length>0){
		$sql= $sql+" WHERE ";
		for(let $y=0;$y<$array.length;$y++){
			if($array[$y]['val'].substring(0,1)!="^"){
				$array[$y]['val']='^'+$array[$y]['val']+'$';
			}
			$sql = $sql+$array[$y]['key']+" RLIKE '"+$array[$y]['val']+"' and ";
		}
		$sql = $sql.slice(0,-4);//remove trailing 'and '
	}
	return $sql;
}