<?php 
error_reporting(0);
$mysql = new mysql("localhost","root","","bd");
session_start();
if(!isset($_SESSION['user'])){
	echo $_SESSION['user'];
	die("没有登录，无法获取数据");
}
class mysql{
	private $db_host;	//数据库主机
	private $db_user;	//数据库用户名
	private $db_pwd;	//数据库密码
	private $db_database;	  //数据库名
	private $conn;	//数据库链接标示
	private $sql;   //sql执行语句
	private $row;   //返回的条目
	private $coding = "UTF8";	//数据库编码
	private $result;		//执行query命令的结果
	private $error = "";		//错误
	private $resultArr = [];

	//构造函数
	public function __construct($db_host,$db_user,$db_pwd,$db_database){
		$this->db_host = $db_host;
		$this->db_user = $db_user;
		$this->db_pwd = $db_pwd;
		$this->db_database = $db_database;
		$this->connect();
	}

	//数据库连接
	public function connect(){
		@$this->conn = mysql_connect($this->db_host,$this->db_user,$this->db_pwd);
		if(!mysql_select_db($this->db_database,$this->conn)){
			$this->error = "数据库不可用";
		}
		mysql_query("SET NAMES $this->coding");
	}

	//数据库执行语句，可执行查询添加修改删除等任何sql语句
	public function query($sql){
		if ($sql == "") {
			$this->error="SQL查询语句为空";
		}
		$this->sql = $sql;
		$result = mysql_query($this->sql,$this->conn);
		if(!$result){
			if($this->error==""){
				$this->error="错误SQL语句：".$this->sql;
			}
		}else{
			$this->result = $result;
		}
		if($this->error==""){
			$this->resultArr = array(1,$this->result);
			return $this->resultArr;
		}else{
			$this->resultArr = array(0,$this->error);
			return $this->resultArr;
		}
	}

	//把数据转换成array
	public function fetch_array(){
		$arr = array();
		while($row = mysql_fetch_array($this->result)){
			$arr[] = $row;
		}
		$this->resultArr = array(0=>1,1=>$arr);
		return $this->resultArr;
	}

	//释放结果集
	public function free(){
		@mysql_free_result($this->result);
		@mysql_free_result($this->result);
	}

	//析构函数，自动关闭数据库，垃圾回收机制
	public function __destruct(){
		if(!empty($this->result)){
			$this->free();
		}
		mysql_close($this->conn);
	}
}


 ?>