<?php 
header('Content-type: application/json; charset=utf-8');
date_default_timezone_set('PRC');
require_once('./mysqlClass.php');

if(isset($_POST['newstitle'])&&isset($_POST['newscontent'])&&isset($_POST['headlines'])){
	$newstitle = checkStr($_POST['newstitle']);
	$newscontent = checkStr($_POST['newscontent']);
	$headlines = checkStr($_POST['headlines']);
	$dataId = isset($_POST['dataId'])? $_POST['dataId']:"";
	$newsimg = isset($_POST['newsimg'])? $_POST['newsimg']:"";
	if(isset($_FILES['file'])){
		foreach($_FILES['file']['tmp_name'] as $key=>$data){
			move_uploaded_file($data,"upload/" . $_FILES["file"]["name"][$key]);
			$newsimg = $newsimg. "upload/" . $_FILES["file"]["name"][$key].",";
		}
	}
	if($dataId==""){
		$addtime = date("Y-m-d H:i:s");
		$sql = "INSERT INTO `news` ( `newstitle`, `newsimg`, `newscontent`, `headlines`, `addtime`) VALUES ('".$newstitle."', '".$newsimg."', '".$newscontent."', '".$headlines."', '".$addtime."')";
	}else{
		$sql = "UPDATE `news` SET `newstitle`='".$newstitle."',`newsimg`='".$newsimg."',`newscontent`='".$newscontent."',`headlines`='".$headlines."' WHERE `newsid` = ".$dataId."";
	}
	$result = $mysql->query($sql);
	echo json_encode($result);

}else if(isset($_POST['delete'])){
	$sql = "DELETE FROM `news` WHERE `news`.`newsid` = ".$_POST['delete'];
	$result = $mysql->query($sql);
	echo json_encode($result);
}else{
	$result = array(0,"传入参数错误");
	echo json_encode($result);
}

function checkStr($data){
        $data = trim ($data);
        $data = strip_tags ($data);
        $data = htmlspecialchars ($data);
        $data = addslashes ($data);
        return $data;
}

 ?>