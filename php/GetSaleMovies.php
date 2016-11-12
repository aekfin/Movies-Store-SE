<?php
// Create connection
include "ConnectDB.php";
$request = json_decode(file_get_contents('php://input'));
$min = $conn->real_escape_string($request->min);
$max = $conn->real_escape_string($request->max);

$query="SELECT * FROM movies WHERE onSale = '1' LIMIT $min,$max";
//$data = array();
$rs=$conn->query($query);

while ($row = $rs->fetch_array()) {
  $data[] = $row;
}
    print json_encode($data);

$conn->close();

?>