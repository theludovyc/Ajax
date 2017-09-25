<?php
header("Content-Type: text/plain");

include 'checkParam.php';

$qId = checkParam('qId');
$qOpen = checkParam('qOpen');

$mysqli = new mysqli('127.0.0.1', 'root', '', 'test');

if ($mysqli->connect_error) {
    die('Connect Error (' . $mysqli->connect_errno . ') '
            . $mysqli->connect_error);
}

if( !$mysqli->query("update a set qOpen = ".$qOpen." where qId = ".$qId) ){
	die('Query Error ('. $mysqli->errno .') '. $mysqli->error);
}

echo $qOpen;

$mysqli->close();
?>