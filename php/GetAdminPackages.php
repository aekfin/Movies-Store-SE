<?php
// Create connection
include "ConnectDB.php";
$request = json_decode(file_get_contents('php://input'));

$query="SELECT * FROM packages";
//$data = array();
$rs=$conn->query($query);

while ($row = $rs->fetch_array()) {
  $data[] = $row;
}
    print json_encode($data);

$conn->close();

?>