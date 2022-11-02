<?php
/******
 * terraforge.net &#169;©2015 Terra Forge Network
 * Work In Progress Universal Login Script
 * 
 * Requires JQuery and Bootstrap
 * 
 * Usage
 * add the following tags to a clickable element
 * <data-toggle="modal" data-target="#login">
 * 
 * supports login,logout,register, and update
 * 
 ******/

session_start();
$_SESSION['curpage']="'".$_SERVER['PHP_SELF']."'";
require('mysqli.php');


if(isset($_POST['submit'])){
	if($_POST['submit']=='Login'){
		//confirm user login and set session user variables
		if (isset($_POST['username']) and isset($_POST['password']) and isset($_POST['email'])){
			$username = $_POST['username'];
			$password = $_POST['password'];
			$email = $_POST['email'];
			$loginarray = array(
				array('key'=>'username','val'=>$username),
				array('key'=>'password','val'=>sha1($password)),
				array('key'=>'email','val'=>$email)
			);
			//returns array
			$userselect=selectXFromTableWhereArray('*','users',$loginarray);
			if(count($userselect)>1){
				print('error in user login: Duplicate Entries;Selecting First Entry;');
			}
			for($users=0;$users<count($userselect);$users++){
				//echo '<br>'.$userselect[$users]['username'].','.$userselect[$users]['password'].','.$userselect[$users]['level'];
			}
			if (count($userselect) == 1){
				$_SESSION['username'] = $username;
				$_SESSION['level'] = $userselect[$users]['level'];
				$_SESSION['status'] = 'login';
				//$alert = 'Welcome '.$username;
			}else{
				$alert = 'Invalid Login Credentials.user='.$userselect;
			}
		}
	}
	if($_POST['submit']=='Logout'){
		unset($_SESSION['status']);
		unset($_SESSION['username']);
		unset($_SESSION['level']);
		//$alert = 'Goodby!';
	}
	if($_POST['submit']=='Register'){
	    if (isset($_POST['username'])&&isset($_POST['password'])&&isset($_POST['email'])){
	        $username = $_POST['username'];
	        $password = $_POST['password'];
			$email = $_POST['email'];
	        
			$registerarray = array(
				array('key'=>'username','val'=>$username),
				array('key'=>'password','val'=>sha1($password)),
				array('key'=>'email','val'=>$email)
			);
			$register = insertIntoTableValuesOfArray('users',$registerarray);
	 		if($register === true){
	 			$alert = 'Registration Successful '.$register;
	 		}else{
	 			$alert = 'Something Went Wrong. You may try to login anyway.<br> Othersise notify system admin: '.$register;
	 		}
	    }
	}
	//---------WIP----------
	if($_POST['submit']=='Update'){
		
		$selectarray = array(
			array('key'=>'username','val'=>$_SESSION['username'])
		);
		$updatearray = array();
		if(isset($_POST['password'])&&$_POST['password']!=''){
			array_push($updatearray,array('key'=>'password','val'=>$_POST['password']));
		}
		if(isset($_POST['email'])&&$_POST['email']!=''&&filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)){
			array_push($updatearray,array('key'=>'email','val'=>$_POST['email']));
		}
		updateTableSetArrayWhereKeyVal('users',$array,$selectarray);
	}
	$returnurl = isset($_POST['returnurl'])&&$_POST['returnurl']!=''?$_POST['returnurl']:'../';
	header("refresh:0;url=".$returnurl);
	if(isset($alert)&&$alert!='')echo '<script>alert("'.$alert.'");</script>';
	exit();
}
?>