<?php
header("Content-Type: text/plain");

include 'checkParam.php';

$qId = checkParam('qId');

//echo "".$qId;

$mysqli = new mysqli('127.0.0.1', 'root', '', 'test');

if ($mysqli->connect_error) {
    die('Connect Error (' . $mysqli->connect_errno . ') '
            . $mysqli->connect_error);
}

if(!$res = $mysqli->query("select answerA, answerB, answerC, answerD from A where qId = ".$qId)){
	die('Query Error ('. $mysqli->errno .') '. $mysqli->error);
}

//echo "Request Ok\n";

if($res->num_rows > 0){
	$row = $res->fetch_assoc();

	$data['a'] = $row['answerA'];
	$data['b'] = $row['answerB'];
	$data['c'] = $row['answerC'];
	$data['d'] = $row['answerD'];

	echo json_encode($data);
}else{
	echo "0 results\n";
}

$mysqli->close();
?>