<?php
// Create connection
include "ConnectDB.php";
$request = json_decode(file_get_contents('php://input'));
$id = $conn->real_escape_string($request->id);
$address = $conn->real_escape_string($request->address);
$city = $conn->real_escape_string($request->city);
$province = $conn->real_escape_string($request->province);
$country = $conn->real_escape_string($request->country);
$zip = $conn->real_escape_string($request->zip);

$update_row = $conn->query("UPDATE accounts SET address = '$address',city = '$city',province = '$province',country = '$country',zip = '$zip' WHERE id ='$id'");

$conn->close();

?>