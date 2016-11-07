<?php
// Create connection
include "ConnectDB.php";
$request = json_decode(file_get_contents('php://input'));
$id = $conn->real_escape_string($request->id);
$firstName = $conn->real_escape_string($request->firstName);
$lastName = $conn->real_escape_string($request->lastName);
$userName = $conn->real_escape_string($request->userName);
$password = $conn->real_escape_string($request->password);
$email = $conn->real_escape_string($request->email);
$address = $conn->real_escape_string($request->address);
$city = $conn->real_escape_string($request->city);
$province = $conn->real_escape_string($request->province);
$country = $conn->real_escape_string($request->country);
$zip = $conn->real_escape_string($request->zip);

$insert_row = $conn->query("INSERT INTO accounts(id,userName,password,email,firstName,lastName,address,city,province,country,zip)VALUES('$id','$userName','$password','$email','$firstName','$lastName','$address','$city','$province','$country','$zip')");

$conn->close();

?>