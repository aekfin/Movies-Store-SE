<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "moviestore";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
$request = json_decode(file_get_contents('php://input'));
$id = $conn->real_escape_string($request->id);

$query="SELECT * FROM movies WHERE id = '$id'";
//$data = array();
$rs=$conn->query($query);

while ($row = $rs->fetch_array()) {
  $data[] = $row;
}
    print json_encode($data);

$conn->close();

?>