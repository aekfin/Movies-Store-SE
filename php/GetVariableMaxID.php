<?php
// Create connection
include "ConnectDB.php";

$request = json_decode(file_get_contents('php://input'));
$table = $conn->real_escape_string($request->table);
$variable = $conn->real_escape_string($request->variable);

$query="SELECT * FROM $table ORDER BY $variable DESC LIMIT 0,1";
//$data = array();
$rs=$conn->query($query);
while ($row = $rs->fetch_array()) {
  $data[] = $row;
}

	print json_encode($data);

$conn->close();

?>