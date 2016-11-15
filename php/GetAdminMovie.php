<?php
// Create connection
include "ConnectDB.php";
$request = json_decode(file_get_contents('php://input'));

$query="SELECT * FROM movies LIMIT 0,40";
//$data = array();
$rs=$conn->query($query);

while ($row = $rs->fetch_array()) {
  $data[] = $row;
}

$query="SELECT * FROM movies LIMIT 80,108";
//$data = array();
$rs=$conn->query($query);

while ($row = $rs->fetch_array()) {
  $data[] = $row;
}

    print json_encode($data);

$conn->close();

?>