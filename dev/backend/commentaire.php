<?php
include "./infoServer.php";
include_once "./generateID.php";
if (isset($_POST["text"])) {
    $idPost = $_POST["idPost"];
    $idProfile = $_POST["idProfile"];
    $text = $_POST["text"];
    try {
        $conn = new PDO("mysql:host=" . $host . ";dbname=" . $dbName, $userName, $passWord);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $idComment = generateID(30);
        $stmt = $conn->prepare("INSERT INTO commentaire(text,dateCreate,idPost,idProfile,idCommentaire) VALUES (?,NOW(),?,?,?)");
        $stmt->execute(array(
            $text,
            $idPost,
            $idProfile,
            $idComment
        ));
    } catch (Exception $e) {
        echo "Connection failed: " . $e->getMessage();
    }
} else if (isset($_GET["idPost"])) {
    $idPost = $_GET["idPost"];
    try {
        $conn = new PDO("mysql:host=" . $host . ";dbname=" . $dbName, $userName, $passWord);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->prepare("SELECT commentaire.text, commentaire.dateCreate, profile.username, profile.photo FROM commentaire, profile WHERE commentaire.idProfile=profile.idProfile AND commentaire.idPost=? order by commentaire.dateCreate desc");
        $stmt->execute(array(
            $idPost
        ));
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        print_r(json_encode($result));
    } catch (Exception $e) {
        echo "Connection failed: " . $e->getMessage();
    }
}