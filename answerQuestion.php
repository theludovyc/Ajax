<?php
header("Content-Type: text/plain");

include 'checkParam.php';

$qId = checkParam('qId');
$answer = checkParam('answer');

$answer = "answer".$answer;

$mysqli = new mysqli('127.0.0.1', 'root', '', 'test');

if ($mysqli->connect_error) {
    die('Connect Error (' . $mysqli->connect_errno . ') '
            . $mysqli->connect_error);
}

if(!$res = $mysqli->query("select ".$answer." from a where qId = ".$qId)){
	die('Query Error ('. $mysqli->errno .') '. $mysqli->error);
}

$answerQ = 0;

if($res->num_rows > 0){
	$row = $res->fetch_assoc();

	$answerQ = $row[$answer];

	$answerQ++;

	//echo $answerA;

	if(!$res = $mysqli->query("update A set ".$answer." = ".$answerQ." where qId = ".$qId)){
		die('Query Error ('. $mysqli->errno .') '. $mysqli->error);
	}

	//echo "Request Ok!\n";

	echo "1";
	
}else{
	echo "0";
}

$mysqli->close();
?>