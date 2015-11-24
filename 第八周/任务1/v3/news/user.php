<?php 
session_start();
	header("Content-Type:text/event-stream;charset=utf-8");
	header('Access-Control-Allow-Orgin:http://127.0.0.1/');
if(isset($_SESSION['user'])){
	echo "data:".$_SESSION['user']."\n\n";
}else{
	echo "data:\n\n";
}


 ?>