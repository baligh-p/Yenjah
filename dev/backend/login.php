<?php
include_once "./infoServer.php";
if (isset($_GET["un"])) {
    try {
        $base = new PDO("mysql:host=" . $host . ";dbname=" . $dbName, $userName, $passWord);
        $prep = $base->prepare("SELECT idProfile from profile where username=? AND pwd=?");
        $prep->execute(array($_GET["un"], $_GET["pwd"]));
        $send = $prep->fetch();
        print_r(json_encode($send));
    } catch (Exception $e) {
    }
}