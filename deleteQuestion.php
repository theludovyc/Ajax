<?php
header("Content-Type: text/plain");

include 'checkParam.php';

$qId = checkParam('qId');

$mysqli = new mysqli('127.0.0.1', 'root', '', 'test');

if ($mysqli->connect_error) {
    die('Connect Error (' . $mysqli->connect_errno . ') '
            . $mysqli->connect_error);
}

if( !$mysqli->query("DELETE FROM A WHERE qId = ".$qId)){
	die('Query Error ('. $mysqli->errno .') '. $mysqli->error);
}

echo "La question a été supprimer!";

$mysqli->close();
?>