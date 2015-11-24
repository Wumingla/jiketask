<?php 
session_start();
header("Content-Type:text/event-stream;charset=utf-8");
header('Access-Control-Allow-Orgin:http://127.0.0.1/');
$con = mysql_connect('localhost','root','');
if(!$con){
	die('数据库链接失败');
}
mysql_select_db("bd",$con);

if(isset($_POST['user'],$_POST['password'])){
	//登陆
	$sql = "SELECT `user` FROM `users` WHERE `user`='".$_POST['user']."' AND `password`='".$_POST['password']."'";
	mysql_query("set names 'utf8'");
	$result = mysql_query($sql);
	$num = mysql_num_rows($result);
	$row = mysql_fetch_array($result);
	if($num>0){
		$_SESSION['user'] = $row['user'];
		echo true;
	}else{
		echo false;
	}
}else if(isset($_GET['login'])){
	//退出登陆
	if($_GET['login']=="out"){
		$_SESSION['user'] = NULL;
		echo true;
	}else{
		echo false;
	}
}



 ?>