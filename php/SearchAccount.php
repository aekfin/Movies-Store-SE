<?php
// Create connection
include "ConnectDB.php";
$request = json_decode(file_get_contents('php://input'));
$username = $conn->real_escape_string($request->username);
$password = $conn->real_escape_string($request->password);


$query="SELECT * FROM accounts WHERE username = '$username' and password = '$password'";
//$data = array();
$data['message'] = "Cannot Find";
$data['found'] = false;
$rs=$conn->query($query);

while ($row = $rs->fetch_array()) {
  $data[] = $row;
  $data['message'] = "Find it"; 
  $data['found'] = true; 
}
	print json_encode($data);

$conn->close();

?>