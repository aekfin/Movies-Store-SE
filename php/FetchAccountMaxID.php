<?php
// Create connection
include "ConnectDB.php";

$query="SELECT * FROM accounts ORDER BY id DESC LIMIT 0,1";
//$data = array();
$rs=$conn->query($query);
while ($row = $rs->fetch_array()) {
  $data[] = $row;
}

	print json_encode($data);

$conn->close();

?>