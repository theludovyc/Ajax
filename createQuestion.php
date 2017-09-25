<?php
header("Content-Type: text/plain");

include 'checkParam.php';

$question = checkParam('question');
$nbAnswer = checkParam('nbAnswer');

//echo ''.$question.' '.$nbAnswer;

$mysqli = new mysqli('127.0.0.1', 'root', '', 'test');

if ($mysqli->connect_error) {
    die('Connect Error (' . $mysqli->connect_errno . ') '
            . $mysqli->connect_error);
}

//echo "Connection Ok\n";

//it's magic! http://www.phpdebutant.org/article150.php
$question = $mysqli->real_escape_string($question);

switch ($nbAnswer) {
	case 2:
		if( !$mysqli->query("INSERT INTO A (question, nbAnswer) VALUES ('".$question."', ".$nbAnswer.")") ){
			die('Query Error ('. $mysqli->errno .') '. $mysqli->error);
		}
		break;
	
	case 3:
		if( !$mysqli->query("INSERT INTO A (question, nbAnswer, answerC) VALUES ('".$question."', ".$nbAnswer.", 0)") ){
			die('Query Error ('. $mysqli->errno .') '. $mysqli->error);
		}
		break;

	case 4:
		if( !$mysqli->query("INSERT INTO A (question, nbAnswer, answerC, answerD) VALUES ('".$question."', ".$nbAnswer.", 0, 0)") ){
			die('Query Error ('. $mysqli->errno .') '. $mysqli->error);
		}
		break;
}

//echo "Request Ok\n";

$last_id = $mysqli->insert_id;

//echo "".$last_id."\n";

srand($last_id);

$val = rand(1,9)*10000+rand(1,9)*1000+rand(1,9)*100+rand(1,9)*10+rand(1,9);

echo "".$val."\n";

if(!$res = $mysqli->query("UPDATE A SET qID = ".$val." WHERE id = ".$last_id)){
	die('Query Error ('. $mysqli->errno .') '. $mysqli->error);
}

//echo "Request Ok\n";

$mysqli->close();
?>