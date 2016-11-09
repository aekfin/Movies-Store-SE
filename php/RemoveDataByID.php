<?php
// Create connection
include "ConnectDB.php";
$request = json_decode(file_get_contents('php://input'));
$id = $conn->real_escape_string($request->id);
$table = $conn->real_escape_string($request->table);

$delete_row = $conn->query("DELETE FROM $table WHERE id=$id");

$conn->close();

?>