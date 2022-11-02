<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $name = test_input($_POST["name"]);
  $email = test_input($_POST["email"]);
  $message = test_input($_POST["message"]);
  $subject = 'General Submission';
  $sendto = 'AnthymnGalaris@gmail.com';
}

function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}
$headers = 'From: '. $email . "\r\n" .
    //'Reply-To: webmaster@example.com' . "\r\n" .
    //'X-Mailer: PHP/' . phpversion();
    'Cc: admin@terraforge.net,admin@sentinel-hosting.com';

// the message
$msg = $name."\n".$email."\n\n".$message;

// use wordwrap() if lines are longer than 70 characters
$msg = wordwrap($msg,70);

// send email
echo mail($sendto,$subject,$msg,$headers);
?>