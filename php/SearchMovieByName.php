<?php
// Create connection
include "ConnectDB.php";
$request = json_decode(file_get_contents('php://input'));
$name = $conn->real_escape_string($request->name);

$query="SELECT * FROM movies WHERE nameEN LIKE '%$name%'";

//$data = array();
$rs=$conn->query($query);

$data[0] = "not found";

while ($row = $rs->fetch_array()) {
  $data[] = $row;
  $data[0] = "found";
}
    print json_encode($data);

$conn->close();

?>