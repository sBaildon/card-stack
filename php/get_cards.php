<?php

$db = new mysqli('127.0.0.1', 'sean', 'mymysql', 'card-stack');

if($db->connect_errno > 0){
	die('Unable to connect to database [' . $db->connect_error . ']');
}

$data = json_decode(file_get_contents('php://input'), true);

$codes = array();
foreach($data as $item) {
	$codes[] = $item['code'];

}
$string = "('". implode('\',\'', $codes) . "')";

if(!$result = $db->query("SELECT question, answer FROM card WHERE code IN" .$string)){
	die('There was an error running the query [' . $db->error . ']');
}

$json = array();
while($row = $result->fetch_assoc()) {
	$json[] = $row;
}
$json_return = json_encode($json);

print_r($json_return);

mysqli_close($db);
?>