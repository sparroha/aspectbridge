<? 
$username = 'sparroha';
$password = sha1('password');
$arr = array(array('key'=>'username','val'=>$username),array('key'=>'password','val'=>$password));
var_dump($arr);
var_export($arr);
//echo '<br>echo'.var_export($arr);
echo '<br>';
$query = selectXFromTableWhereArray('*','users',$arr);
echo $query;
echo '<br>';
var_dump($query);
echo '<br>';

function selectXFromTableWhereArray($x,$table,$array){
$sql =  "SELECT ".$x." FROM ".$table." where ";
	for($y=0;$y<count($array);$y++){
		$sql = $sql. $array[$y]['key']. " = '".$array[$y]['val']."' and ";
	}
	$sql = rtrim($sql,"and ");
	return $sql;
}
$retval = array();
array_push($retval,array('username'=>'sparroha','password'=>sha1('password'),'rank'=>1));
array_push($retval,array('username'=>'noob','password'=>sha1('password'),'rank'=>2));
array_push($retval,array('username'=>'nubsausage','password'=>sha1('password'),'rank'=>3));

for($users=0;$users<count($retval);$users++){
	echo '<br>'.$retval[$users]['username'].','.$retval[$users]['password'].','.$retval[$users]['rank'];
}

echo $_POST['function'];

?>

	<h1>Terra Forge Login</h1>
	<form action="" method="POST">
		<input type="submit" name="function" value="Register" />
		<input type="submit" name="function" value="Login" />
	</form>
	</div>
	
	
	
<?
echo '<hr>';
$table = 'users';
$array = array(
				array('key'=>'username','val'=>'sparroha'),
				array('key'=>'password','val'=>sha1('password'))
			);

	$keyarray = array();
	$valarray = array();
	for($y=0;$y<count($array);$y++){
		array_push($keyarray,$array[$y]['key']);
		array_push($valarray,$array[$y]['val']);
	}
	$sql = "INSERT INTO ".$table." (";
	for($y=0;$y<count($array);$y++){
		$sql = $sql.$keyarray[$y].", ";
	}
	$sql = rtrim($sql,", ").") VALUES (";
	for($y=0;$y<count($array);$y++){
		$sql = $sql."'".$valarray[$y]."', ";
	}
	$sql = rtrim($sql,", ").")";
	echo $sql;
?>	