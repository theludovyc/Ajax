<?php
header("Content-Type: text/plain");

include 'checkParam.php';

$qId = checkParam('qId');

$mysqli = new mysqli('127.0.0.1', 'root', '', 'test');

if ($mysqli->connect_error) {
    die('Connect Error (' . $mysqli->connect_errno . ') '
            . $mysqli->connect_error);
}

if(!$res = $mysqli->query("select question, nbAnswer from a where qId = ".$qId)){
	die('Query Error ('. $mysqli->errno .') '. $mysqli->error);
}

//echo "Request Ok\n";

if($res->num_rows > 0){
	$row = $res->fetch_assoc();

	$data['question'] = $row['question'];
	$data['nbAnswer'] = $row['nbAnswer'];

	echo json_encode($data);
}else{
	echo "0 results\n";
}

$mysqli->close();
?>