<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "moviestore";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
$request = json_decode(file_get_contents('php://input'));
$min = $conn->real_escape_string($request->min);
$max = $conn->real_escape_string($request->max);

$query="SELECT * FROM movies ORDER BY releaseDate DESC LIMIT $min,$max";
//$data = array();
$rs=$conn->query($query);

while ($row = $rs->fetch_array()) {
  $data[] = $row;
}
    print json_encode($data);

$conn->close();

?>