<?php
/*
Work In Progress Global Use DATABASE Query Script
*/
/***Global VARS***/
$GLOBALS['dbservername'] = "localhost";
$GLOBALS['dbusername'] = "terrafor_admin";
$GLOBALS['dbpassword'] = "sparrnet1";
$GLOBALS['dbname'] = "terrafor_net";
$GLOBALS['dbverbose'] = false;
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


function conn(){
	$dbservername = $GLOBALS['dbservername'];
	$dbusername = $GLOBALS['dbusername'];
	$dbpassword = $GLOBALS['dbpassword'];
	$dbname = $GLOBALS['dbname'];
	$conn = new mysqli($dbservername, $dbusername, $dbpassword, $dbname);
	return $conn;
}
//$array => [0] {[key]=value, [val]=value}
//returns array;
function selectXFromTableWhereArray($x,$table,$array){
	$conn = conn();
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}
	if($GLOBALS['dbverbose'])echo '<br>successfull connection ['.$conn->connect_error.']<br>';
	//build $sql string
	$sql =  "SELECT ".$x." FROM ".$table;
	if(isset($array)){
		$sql =  $sql." where ";
		for($y=0;$y<count($array);$y++){
			if(substr_compare('^',$array[$y]['val'],0,1,true)!=0){
				$array[$y]['val']='^'.$array[$y]['val'].'$';
			}
			$sql = $sql. $array[$y]['key']." RLIKE '".$array[$y]['val']."' and ";
		}
		$sql = rtrim($sql,"and ");
	}
	//query $sql string
	$result = $conn->query($sql);
	
	//build $ret array
	if ($result->num_rows > 0) {
		// output data of each row
		$ret = array();
		while($row = $result->fetch_assoc()) {
			array_push($ret,$row);
		}
	} else {
		if($GLOBALS['dbverbose'])echo "mysqli error checking selectXFromTableWhereArray: ".mysqli_connect_errno().'+error: '.$conn->error;
	}
	$conn->close();
	return $ret;
}
//$array => [0] {[key]=value, [val]=value}
//returns boolean;
function insertIntoTableValuesOfArray($table,$array){
	$conn = conn();
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}
	//seperate key pairs
	$keyarray = array();
	$valarray = array();
	for($y=0;$y<count($array);$y++){
		//echo $array[$y]['key'];
		array_push($keyarray,$array[$y]['key']);
		//echo $array[$y]['val'];
		array_push($valarray,$array[$y]['val']);
	}
	//build $sql string
	$sql = "INSERT INTO ".$table." (";
	for($y=0;$y<count($array);$y++){
		$sql = $sql.$keyarray[$y].", ";
	}
	$sql = rtrim($sql,", ").") VALUES (";
	for($y=0;$y<count($array);$y++){
		$sql = $sql."'".$valarray[$y]."', ";
	}
	$sql = rtrim($sql,", ").")";
	//query $sql string
	$result = $conn->query($sql);
	//set $ret val
	
	if ($result){
	 	$ret = true;
    }else{
		if($GLOBALS['dbverbose'])echo "mysqli error checking insertIntoTableValuesOfArray: ".mysqli_connect_errno().'+error: '.$conn->error;
		$ret = $conn->error;
	}
	$conn->close();
	return $ret;
}
//$array => [0] {[key]=value, [val]=value}
//returns boolean;
function updateTableSetArrayWhereKeyVal($table,$setarray,$selectarray){
	$conn = conn();
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}
	//build $sql string
	$sql = "UPDATE ".$table." SET ";
	for($y=0;$y<count($setarray);$y++){
		$sql = $sql.$setarray[$y]['key']."='".$setarray[$y]['val']."', ";
	}
	$sql = rtrim($sql,", ")." WHERE ";
	for($y=0;$y<count($selectarray);$y++){
		if(substr_compare('^',$selectarray[$y]['val'],0,1,true)!=0){
			$selectarray[$y]['val']='^'.$selectarray[$y]['val'].'$';
		}
		$sql = $sql. $selectarray[$y]['key']." RLIKE '".$selectarray[$y]['val']."' and ";
	}
	$sql = rtrim($sql,"and ");
	//query $sql string
	$result = $conn->query($sql);
	//set $ret val
	
	if ($result){
	 	$ret = true;
    }else{
		if($GLOBALS['dbverbose'])echo "mysqli error checking insertIntoTableValuesOfArray: ".mysqli_connect_errno().'+error: '.$conn->error;
		$ret = false;
	}
	$conn->close();
	return $ret;
}
function alterTableTAuto_Increment($table,$num){
	if($num<=0){
		//auto detect
		//$s = "SHOW KEYS FROM ".$table." WHERE Key_name = 'PRIMARY'";
		//selectMaxXAsNameFromTableWhereArray($x,$table,$array);
		return false;
	}
	$conn = conn();
	
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}
	//build $sql string
	$sql = "ALTER TABLE ".$table." AUTO_INCREMENT=".$num;
	//query $sql string
	$result = $conn->query($sql);
	//set $ret val
	
	if ($result){
	 	$ret = true;
    }else{
		if($GLOBALS['dbverbose'])echo "mysqli error checking alterTableTAuto_Increment: ".mysqli_connect_errno().'+error: '.$conn->error;
		$ret = false;
	}
	$conn->close();
	return $ret;
}
function selectMaxXAsNameFromTableWhereArray($x,$table,$array){
	$conn = conn();
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}
	if($GLOBALS['dbverbose'])echo '<br>successfull connection ['.$conn->connect_error.']<br>';
	//build $sql string
	$sql =  "SELECT MAX(".$x.") AS ".$x." FROM ".$table;
	if(count($array)>0){
		$sql= $sql." WHERE ";
		for($y=0;$y<count($array);$y++){
			if(substr_compare('^',$array[$y]['val'],0,1,true)!=0){
				$array[$y]['val']='^'.$array[$y]['val'].'$';
			}
			$sql = $sql. $array[$y]['key']." RLIKE '".$array[$y]['val']."' and ";
		}
		$sql = rtrim($sql,"and ");
	}
	//query $sql string
	$result = $conn->query($sql);
	
	//build $ret array
	if ($result->num_rows > 0) {
		// output data of each row
		$ret = array();
		while($row = $result->fetch_assoc()) {
			array_push($ret,$row);
		}
	} else {
		if($GLOBALS['dbverbose'])echo "mysqli error checking selectMaxXAsNameFromTableWhereArray: ".mysqli_connect_errno().'+error: '.$conn->error;
	}
	$conn->close();
	return $ret;
}
function deleteFromTableWhereArray($table,$array){
	$conn = conn();
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}
	if($GLOBALS['dbverbose'])echo '<br>successfull connection ['.$conn->connect_error.']<br>';
	//build $sql string
	$sql =  "DELETE FROM ".$table;
	if(count($array)>0){
		$sql= $sql." WHERE ";
		for($y=0;$y<count($array);$y++){
			if(substr_compare('^',$array[$y]['val'],0,1,true)!=0){
				$array[$y]['val']='^'.$array[$y]['val'].'$';
			}
			$sql = $sql. $array[$y]['key']." RLIKE '".$array[$y]['val']."' and ";
		}
		$sql = rtrim($sql,"and ");
	}
	//query $sql string
	$result = $conn->query($sql);
	
	if ($result){
	 	$ret = true;
    }else{
		if($GLOBALS['dbverbose'])echo "mysqli error checking deleteFromTableWhereArray: ".mysqli_connect_errno().'+error: '.$conn->error;
		$ret = false;
	}
	$conn->close();
	return $ret;
}
function createTableWithArray($table,$array){
	$conn = conn();
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}
	if($GLOBALS['dbverbose'])echo '<br>successfull connection ['.$conn->connect_error.']<br>';
	//build $sql string
	$sql =  "CREATE TABLE ".$table;
	if(count($array)>0){
		$sql= $sql." ( ";
		for($y=0;$y<count($array);$y++){
			$sql = $sql. $array[$y]['col']." ".$array[$y]['type']."(".$array[$y]['size']."),";
		}
		$sql = rtrim($sql,",").")";
	}
	//query $sql string
	$result = $conn->query($sql);
	
	if ($result){
	 	$ret = true;
    }else{
		if($GLOBALS['dbverbose'])echo "mysqli error checking deleteFromTableWhereArray: ".mysqli_connect_errno().'+error: '.$conn->error;
		$ret = false;
	}
	$conn->close();
	return $ret;
}
?>