<?php
include_once "./infoServer.php";
if (isset($_GET["generalType"])) {
    $connect = new PDO("mysql:host=" . $host . ";dbname=" . $dbName, $userName, $passWord);
    $connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $req0 = $connect->query("SELECT idTypeGeneral from typegeneral where type='$_GET[generalType]'");
    $idTypeGeneral = $req0->fetchColumn();
    $req = $connect->prepare("SELECT profile.username,profile.photo as profilePhoto,p.titre,p.text,p.dateCreate,p.idPost,p.objectif,p.imagePost,g.type as generalType,s.type as specificType
     from post p , typegeneral g , typespecifique s , profile WHERE profile.idProfile=p.idProfile AND p.idTypeGeneral=g.idTypeGeneral AND p.idTypeSpecifique=s.idTypeSpecifique AND p.idTypeGeneral=? order by p.dateCreate desc");
    $req->execute(array($idTypeGeneral));
    $result = $req->fetchAll(PDO::FETCH_ASSOC);
    print_r(json_encode($result));
}