<?php
include "./infoServer.php";
header("Access-Control-Allow-Origin:" . $access);
header("Access-Control-Allow-Methods:GET,POST,OPTIONS,PUT,DELETE");
header("Access-Control-Allow-Headers:Content-Disposition,Content-Type,content-Length,Accept-Encoding");
header("Content-type:application/json");
if (isset($_GET["un"])) {
    try {
        $base = mysqli_connect($host, $userName, $passWord, $dbName);
        $req = "SELECT idProfile from profile where username='$_GET[un]' AND pwd='$_GET[pwd]'";
        $result = mysqli_query($base, $req);
        $send = mysqli_fetch_assoc($result);
        print_r(json_encode($send));
    } catch (Exception $e) {
    }
}