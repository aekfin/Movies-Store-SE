<?php
// key
// kaiimook1111
// kong2222
// non3333
// CONST_MRNONZ = "UX239I4NB1"
// CONST_CESE   = "746H32ABMN"
// Non = 01iTqwqgh7
// Kong = 4R02vZ4c69

$request = json_decode(file_get_contents('php://input'));

$data = array(
  "shop_Account"=> "1327100007",
  "cus_Account"=> $request->cus_Account,
  "Amount"=> $request->amount,
  "otp"=> $request->otp
);

$url_send ="http://161.246.70.75:8080/cesebank/api/service.php";
// $str_data = http_build_query($data);
$str_data = json_encode($data);

function sendPostData($url, $post){
  $ch = curl_init($url);
  curl_setopt($ch, CURLOPT_POST, true);
  curl_setopt($ch, CURLOPT_POSTFIELDS,$post);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");  
  curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
  $result = curl_exec($ch);
  curl_close($ch);  // Seems like good practice
  return $result;
}

$result = sendPostData($url_send, $str_data);

$res = json_decode($result);
$success = $res->{'success'};
$error_message = $res->{'error_message'};

if($success == true){
  echo $success;
}
else
{
  echo $error_message;
}
?>