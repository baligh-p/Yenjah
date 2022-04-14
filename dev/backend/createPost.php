<?php
include './infoServer.php';
include "./generateID.php";
if (isset($_POST["objective"])) {
    $idProfil = $_POST["idProfile"];
    $title = $_POST["title"];
    $description = $_POST["description"];
    $objective = $_POST["objective"];
    try {
        $conn = new PDO("mysql:host=" . $host . ";dbname=" . $dbName, $userName, $passWord);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        if (isset($_FILES["photo"])) {
            $photoName = "photoPost/" . time() . basename($_FILES["photo"]["name"]);
            $target_file = "./../src/assets/" . $photoName;
            $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
            move_uploaded_file($_FILES["photo"]["tmp_name"], $target_file);
        } else {
            $photoName = "";
        }
        $id = generateID(30);
        $req1 = $conn->query("SELECT idTypeGeneral from typegeneral where type='$_POST[generalType]'");
        $req2 = $conn->query("SELECT idTypeSpecifique from typespecifique where type='$_POST[specificType]'");
        $idTypeGeneral = $req1->fetchColumn();
        $idTypeSpecifique = $req2->fetchColumn();
        $stmt = $conn->prepare("INSERT INTO post(text,titre,idPost,idProfile,objectif,idTypeGeneral,idTypeSpecifique,imagePost,dateCreate) VALUES (?,?,?,?,?,?,?,?,NOW())");
        $stmt->execute(array(
            $description,
            $title,
            $id,
            $idProfil,
            $objective,
            $idTypeGeneral[0],
            $idTypeSpecifique[0],
            $photoName
        ));
    } catch (PDOException $e) {
        echo 'connexion failed';
    }
}
