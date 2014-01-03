<?php

$db = new mysqli('127.0.0.1', 'sean', 'mymysql', 'card-stack');

if($db->connect_errno > 0){
	die('Unable to connect to database [' . $db->connect_error . ']');
}

if(!$result = $db->query("SELECT * FROM module")){
	die('There was an error running the query [' . $db->error . ']');
}

$json = array();

while($row = $result->fetch_assoc()) {
	$json[]['code'] = $row['code'];
}

$json_result = json_encode($json);

print_r($json_result);

mysqli_close($db);
?>