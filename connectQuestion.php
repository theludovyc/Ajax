<?php
header("Content-Type: text/plain");

include 'checkParam.php';

$qId = checkParam('qId');

$mysqli = new mysqli('127.0.0.1', 'root', '', 'test');

if ($mysqli->connect_error) {
    die('Connect Error (' . $mysqli->connect_errno . ') '
            . $mysqli->connect_error);
}

if(!$res = $mysqli->query("select qOpen from a where qId = ".$qId)){
	$data['qOpen'] = 2;

	echo json_encode($data);
}

//echo "Request Ok\n";

if($res->num_rows > 0){
	$row = $res->fetch_assoc();

	$data['qOpen'] = $row['qOpen'];
}else{
	$data['qOpen'] = 2;
}

echo json_encode($data);

$mysqli->close();
?>