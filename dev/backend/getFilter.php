<?php
include_once "./infoServer.php";
if (isset($_GET{"type"})){
    $tab = $_GET["type"];
    try {
        $conn = new PDO("mysql:host=" . $host . ";dbname=" . $dbName, $userName, $passWord);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $data=array();
        for ($i=0; $i<count($tab) ; $i++){
            $stmt1 = $conn->prepare("SELECT profile.username ,profile.photo ,p.titre ,p.text ,p.dateCreate ,p.idPost, p.objectif, p.imagePost ,g.type as generalType,s.type as specificType
            from post p , typegeneral g , typespecifique s , profile WHERE profile.idProfile=p.idProfile AND p.idTypeGeneral=g.idTypeGeneral AND p.idTypeSpecifique=s.idTypeSpecifique AND p.idTypeSpecifique=? order by p.dateCreate desc");
            $stmt1->execute(array($tab[$i]));
            $result=$stmt1->fetchAll();
            array_push($data,$result);
        }
        print_r(json_encode($data));
    } catch (Exception $e) {
        echo "Connection failed: " . $e->getMessage();
    }
}







?>