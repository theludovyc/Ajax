<?php
header("Content-Type: text/plain");

function checkParam($paramName){
	if(isset($_POST[$paramName]) == NULL){
		die('Parameter Error');
	}

	return $_POST[$paramName];
}

?>