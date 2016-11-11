<?php
// Create connection
include "ConnectDB.php";
$request = json_decode(file_get_contents('php://input'));
$customerId = $conn->real_escape_string($request->customerId);

$query="SELECT * FROM baskets WHERE customerId = '$customerId'";
//$data = array();
$rs=$conn->query($query);
$data[0] = 'null';

while ($row = $rs->fetch_array()) {
  $data[0] = 'not null';
  $data[] = $row;  
}
    print json_encode($data);

$conn->close();

?>