<?php
//
// A very simple PHP example that sends a HTTP POST to a remote site
//
$request = json_decode(file_get_contents('php://input'));
	print json_encode($request);
	
?>