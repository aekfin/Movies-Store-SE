<?php
// Create connection
include "ConnectDB.php";
$request = json_decode(file_get_contents('php://input'));
$username = $conn->real_escape_string($request->username);
$email = $conn->real_escape_string($request->email);

$query="SELECT * FROM accounts WHERE username = '$username' or email = '$email'";
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