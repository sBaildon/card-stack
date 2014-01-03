<?php

$db = new mysqli('127.0.0.1', 'sean', 'mymysql', 'card-stack');

if($db->connect_errno > 0){
	die('Unable to connect to database [' . $db->connect_error . ']');
}

echo "All okay";

?>