
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

//$array => [0] {[key]=value, [val]=value}
//returns array;
export function selectXFromTableWhereArray($x,$table,$array){
	//build $sql string
	$sql =  "SELECT "+$x+" FROM "+$table;
	if(isset($array)){
		$sql =  $sql+" where ";
		for($y=0;$y<count($array);$y++){
			if(substr_compare('^',$array[$y]['val'],0,1,true)!=0){
				$array[$y]['val']='^'+$array[$y]['val']+'$';
			}
			$sql = $sql. $array[$y]['key']+" RLIKE '"+$array[$y]['val']+"' and ";
		}
		$sql = rtrim($sql,"and ");
	}
	return $sql;
}
//$array => [0] {[key]=value, [val]=value}
//returns boolean;
export function insertIntoTableValuesOfArray($table,$array){
	$sql = "INSERT INTO "+$table+" (";
	for($y=0;$y<count($array);$y++){
		$sql = $sql+$keyarray[$y]+", ";
	}
	$sql = rtrim($sql,", ")+") VALUES (";
	for($y=0;$y<count($array);$y++){
		$sql = $sql+"'"+$valarray[$y]+"', ";
	}
	$sql = rtrim($sql,", ")+")";
	return $sql;
}
//$array => [0] {[key]=value, [val]=value}
//returns boolean;
export function updateTableSetArrayWhereKeyVal($table,$setarray,$selectarray){
	$sql = rtrim($sql,", ")+" WHERE ";
	for($y=0;$y<count($selectarray);$y++){
		if(substr_compare('^',$selectarray[$y]['val'],0,1,true)!=0){
			$selectarray[$y]['val']='^'+$selectarray[$y]['val']+'$';
		}
		$sql = $sql+$selectarray[$y]['key']+" RLIKE '"+$selectarray[$y]['val']+"' and ";
	}
	$sql = rtrim($sql,"and ");
	return $sql;
}
export function alterTableTAuto_Increment($table,$num){
	$sql = "ALTER TABLE "+$table+" AUTO_INCREMENT="+$num;
	//query $sql string
	return $sql;
}
export function selectMaxXAsNameFromTableWhereArray($x,$table,$array){
	$sql =  "SELECT MAX("+$x+") AS "+$x+" FROM "+$table;
	if(count($array)>0){
		$sql= $sql+" WHERE ";
		for($y=0;$y<count($array);$y++){
			if(substr_compare('^',$array[$y]['val'],0,1,true)!=0){
				$array[$y]['val']='^'+$array[$y]['val']+'$';
			}
			$sql = $sql. $array[$y]['key']+" RLIKE '"+$array[$y]['val']+"' and ";
		}
		$sql = rtrim($sql,"and ");
	}
	return $sql;
}
export function deleteFromTableWhereArray($table,$array){
	$sql =  "DELETE FROM "+$table;
	if(count($array)>0){
		$sql= $sql+" WHERE ";
		for($y=0;$y<count($array);$y++){
			if(substr_compare('^',$array[$y]['val'],0,1,true)!=0){
				$array[$y]['val']='^'+$array[$y]['val']+'$';
			}
			$sql = $sql+$array[$y]['key']+" RLIKE '"+$array[$y]['val']+"' and ";
		}
		$sql = rtrim($sql,"and ");
	}
	return $sql;
}