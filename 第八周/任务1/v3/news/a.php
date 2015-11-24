<?php 
	header('Content-type: application/json; charset=utf-8');
	$con = mysql_connect('localhost','root','');
	if(!$con){
		die('连接错误:'.mysql_error());
	}
	mysql_select_db('bd',$con);

	if(isset($_GET['headlines'],$_GET['startNum'])){		
		$sql = "SELECT `newsid`, `newstitle`, `newsimg`, `addtime`  FROM `news` WHERE `headlines`= '".$_GET['headlines']."' limit ".$_GET['startNum'].",10";
	}else if(isset($_GET['dataId'])){
		$sql = "SELECT  * FROM `news` WHERE `newsid`= '".$_GET['dataId']."'";
	}
	mysql_query("set names 'utf8'");
	$result = mysql_query($sql);
	mysql_close($con);
	$resultArr = array();
	while($row = mysql_fetch_array($result)){
		$resultArr[] = $row;
	}
	echo json_encode($resultArr);
 ?>