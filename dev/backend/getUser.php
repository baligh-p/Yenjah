<?php
include "./infoServer.php";
header("Access-Control-Allow-Origin:" . $access);
header("Access-Control-Allow-Methods:GET,POST,OPTIONS,PUT,DELETE");
header("Access-Control-Allow-Headers:Content-Disposition,Content-Type,content-Length,Accept-Encoding");
header("Content-type:application/json");
if (isset($_GET["clid"])) {
    $base = mysqli_connect($host, $userName, $passWord, $dbName);
    $request = "SELECT email,username,photo FROM profile where idProfile='$_GET[clid]'";
    $result = mysqli_query($base, $request);
    $send = mysqli_fetch_assoc($result);
    print_r(json_encode($send));
}