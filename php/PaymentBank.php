<?php
//
// A very simple PHP example that sends a HTTP POST to a remote site
//
$request = json_decode(file_get_contents('php://input'));

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL,"http://bank.route.in.th:9999/api/transferbussiness");
curl_setopt($ch, CURLOPT_POST, 1);
/*curl_setopt($ch, CURLOPT_POSTFIELDS,
            "Customaccount=$request->Customaccount&amount=$request->amount&key=$request->key");
*/
curl_setopt($ch, CURLOPT_POSTFIELDS,$request );

// in real life you should use something like:
// curl_setopt($ch, CURLOPT_POSTFIELDS, 
//          http_build_query(array('postvar1' => 'value1')));

// receive server response ...
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$server_output = curl_exec ($ch);
curl_close ($ch);

	print json_encode($sever->message);

// further processing ....
if ($server_output == "OK") { } else {  }

?>