<?php
include "./infoServer.php";
try {
    $base = new PDO("mysql:host=" . $host . ";dbname=" . $dbName, $userName, $passWord);
    if (!isset($_GET["specType"])) {
        $req = $base->query("SELECT type , idTypeGeneral from typegeneral");
        $result = array();
        while ($data = $req->fetchObject()) {
            $result[] = $data;
        }
        print_r(json_encode($result));
    } else {
        $req = $base->query("SELECT type from typespecifique where idTypeGeneral='$_GET[specType]'");
        $result = array();
        while ($data = $req->fetchColumn()) {
            $result[] = $data;
        }
        print_r(json_encode($result));
    }
} catch (Exception $e) {
}