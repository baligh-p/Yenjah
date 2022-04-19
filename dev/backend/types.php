<?php
include_once "./infoServer.php";
try {
    $base = new PDO("mysql:host=" . $host . ";dbname=" . $dbName, $userName, $passWord);
    if (isset($_GET["specType"])) {
        $req = $base->query("SELECT type from typespecifique where idTypeGeneral='$_GET[specType]'");
        $result = array();
        while ($data = $req->fetchColumn()) {
            $result[] = $data;
        }
        print_r(json_encode($result));
    } else if (isset($_GET["allTypes"])) {
        $req = $base->query("SELECT type,idTypeGeneral from typegeneral where idTypeGeneral<>'0'");
        $result = array();
        while ($data = $req->fetch()) {
            $req2 = $base->query("SELECT type from typespecifique where idTypegeneral='$data[idTypeGeneral]'");
            $result[$data["type"]] = $req2->fetchAll(PDO::FETCH_COLUMN);
        }
        print_r(json_encode($result));
    } else {
        $req = $base->query("SELECT type , idTypeGeneral from typegeneral");
        $result = array();
        while ($data = $req->fetchObject()) {
            $result[] = $data;
        }
        print_r(json_encode($result));
    }
} catch (Exception $e) {
}