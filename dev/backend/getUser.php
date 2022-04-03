<?php
include "./infoServer.php";
if (isset($_GET["clid"])) {
    $base = new PDO("mysql:host=" . $host . ";dbname=" . $dbName, $userName, $passWord);
    $result = $base->prepare("SELECT email,username,photo FROM profile where idProfile=?");
    $result->execute(array($_GET["clid"]));
    $send = $result->fetch();
    print_r(json_encode($send));
}