<?php
// Create connection
include "ConnectDB.php";
$request = json_decode(file_get_contents('php://input'));
$id = $conn->real_escape_string($request->id);
$customerId = $conn->real_escape_string($request->customerId);
$movieId = $conn->real_escape_string($request->movieId);
$format = $conn->real_escape_string($request->format);
$amount = $conn->real_escape_string($request->amount);
$totalPrice = $conn->real_escape_string($request->totalPrice);
$date = $conn->real_escape_string($request->date);
$status = $conn->real_escape_string($request->status);

$insert_row = $conn->query("INSERT INTO baskets(id,customerId,movieId,format,amount,totalPrice,date,status)VALUES('$id','$customerId','$movieId','$format','$amount','$totalPrice','$date','$status')");
	
$conn->close();

?>