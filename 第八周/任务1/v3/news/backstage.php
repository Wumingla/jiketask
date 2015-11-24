<?php 
header('Content-type: application/json; charset=utf-8');
require_once('./mysqlClass.php');

if(isset($_GET['newsData'])){
	//读取全部数据
	$sql = "SELECT `newsid`,`newstitle`, `newsimg`,`newscontent`,`headlines`,`addtime` FROM `news` order by newsid desc";
	$result = $mysql->query($sql);
	if($result[0]!=0){
		$result = $mysql->fetch_array();
	}
	echo json_encode($result);
}else if(isset($_GET['dataId'])){
	//根据id查询单条数据
	$sql = "SELECT  * FROM `news` WHERE `newsid`= '".$_GET['dataId']."'";
	$result = $mysql->query($sql);
	if($result[0]!=0){
		$result = $mysql->fetch_array();
	}
	echo json_encode($result);
}



 ?>