<?php
include "./infoServer.php";
if (isset($_GET["generalType"])) {
    $connect = new PDO("mysql:host=" . $host . ";dbname=" . $dbName, $userName, $passWord);
    $connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $req0 = $connect->query("SELECT idTypeGeneral from typegeneral where type='$_GET[generalType]'");
    $idTypeGeneral = $req0->fetchColumn();
    $req = $connect->prepare("SELECT titre,text,dateCreate,idProfile,idPost,objectif,imagePost
     from post WHERE idTypeGeneral=?");
    $req->execute(array($idTypeGeneral));
    $result = $req->fetchAll(PDO::FETCH_ASSOC);
    print_r(json_encode($result));
}