<?php

$request = json_decode(file_get_contents('php://input'));

$data = array('CustomAccount' =>$request->CustomAccount,'amount'=>$request->amount,'key' =>'Aekkodhod');
            $data_json = json_encode($data);

            $url = "http://bank.route.in.th:9999/api/transferbusiness";
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json','Content-Length: ' . strlen($data_json)));
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
            curl_setopt($ch, CURLOPT_POSTFIELDS,$data_json);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            $response  = curl_exec($ch);
            curl_close($ch);
            echo $response
?>