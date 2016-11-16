<?php
// Create connection
include "ConnectDB.php";
$request = json_decode(file_get_contents('php://input'));
$customerId = $conn->real_escape_string($request->customerId);
$name = $conn->real_escape_string($request->name);
$format = $conn->real_escape_string($request->format);
$amount = $conn->real_escape_string($request->amount);
$date = $conn->real_escape_string($request->date);
$status = $conn->real_escape_string($request->status);

$insert_row = $conn->query("INSERT INTO packages(id,customerId,name,format,amount,date,status) VALUES ('$id',
	'$customerId','$name','$format','$amount','$date','$status')");
	
$conn->close();

?>