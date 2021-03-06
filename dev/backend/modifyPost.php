<?php
include_once "./infoServer.php";
if (isset($_POST["objective"])) {
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
        };
        $id = $_POST["idPost"];
        $titre = $_POST["title"];
        $text = $_POST["description"];
        $objective = $_POST["objective"];
        $stmt = $conn->prepare("UPDATE post SET text=?,titre=?,objectif=?,imagePost=? WHERE idPost=? ");
        $stmt->execute(array(
            $text,
            $titre,
            $objective,
            $photoName,
            $id
        ));
        $count = $stmt->rowCount();
        if ($count != 0) {
            print_r("modification avec succées");
        } else {
            print_r("modification  échoué");
        }
    } catch (Exception $e) {
        echo "Connection failed: " . $e->getMessage();
    }
}