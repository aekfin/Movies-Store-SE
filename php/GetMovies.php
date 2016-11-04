<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "moviestore";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

$query="SELECT * FROM movies";
//$data = array();
$rs=$conn->query($query);

while ($row = $rs->fetch_array()) {
  $data[] = $row;
}
    print json_encode($data);

$conn->close();

?>