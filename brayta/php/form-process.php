<?php

$errorMSG = "";

// NAME

if (empty($_POST["name"])) {

    $errorMSG = "Name is required ";

} else {

    $name = $_POST["name"];

}



// EMAIL

if (empty($_POST["email"])) {

    $errorMSG .= "Email is required ";

} else {

    $email = $_POST["email"];

}



// MESSAGE

if (empty($_POST["message"])) {

    $errorMSG .= "Message is required ";

} else {

    $message = $_POST["message"];

}



/* Contact Form Setup Begin */

    $send_name      = "Braytaapp";      // Replace your name
    $send_title     = "Braytaapp - Send Mail";        // Replace email sent title
    $send_address   = "braytaapp@gmail.com"; // Replace your email address

    $smtp_address   = "mail@gmail.com";     // Replace your email GMail address
    $smtp_password  = "12345";               // Replace your email password
    $smtp_server    = "smtp.gmail.com"; // Replace your email server address


    /* Contact Form Setup End */

    date_default_timezone_set('Etc/UTC');
    require '../inc/phpmailer/PHPMailerAutoload.php';

    $mail = new phpmailer(true);

    try{

        // $mail->SMTPDebug = 2;

        $mail->isSMTP();

        $mail->Host = $smtp_server;

        $mail->SMTPAuth = true;

        $mail->Username = $smtp_address;

        $mail->Password = $smtp_password;

        $mail->SMTPSecure = 'tls';

        $mail->Port = 587;



        // Recipients

        $mail->setFrom($smtp_address, $send_title);

        $mail->addAddress($send_address);

        $mail->addReplyTo($send_address);



        // Content

        $mail->isHTML(true);

        $mail->Subject = $send_title;



        $Body = "";

        $Body .= "Name: ";

        $Body .= $name;

        $Body .= "<br>";

        $Body .= "Email: ";

        $Body .= $email;

        $Body .= "<br>";

        $Body .= "Message: ";

        $Body .= $message;

        $Body .= "<br>";



        $mail->Body = $Body;



        $mail->send();

        echo 'Message has been send!';



    } catch (Exception $e){

        // echo 'Message could not be send. Error: ', $mail->ErrorInfo;

        echo 'Message could not be send. Error: ';

    }



?>