<?php
// Create connection
include "ConnectDB.php";
$request = json_decode(file_get_contents('php://input'));
$id = $conn->real_escape_string($request->id);
$table = $conn->real_escape_string($request->table);
$variable = $conn->real_escape_string($request->variable);
$value = $conn->real_escape_string($request->value);

$update_row = $conn->query("UPDATE $table SET $variable='$value' WHERE id ='$id'");

$conn->close();

?>