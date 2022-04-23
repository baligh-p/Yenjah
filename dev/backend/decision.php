<?php
include "./infoServer.php";
if (isset($_POST["decision"])) {
    $decision = $_POST["decision"];
    $idProfile = $_POST["idProfile"];
    $idPost = $_POST["idPost"];
    try {
        $conn = new PDO("mysql:host=" . $host . ";dbname=" . $dbName, $userName, $passWord);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt1 = $conn->prepare("SELECT decision FROM decision WHERE idProfile=? AND idPost=?");
        $stmt1->execute(array(
            $idProfile,
            $idPost
        ));
        $result = $stmt1->fetchAll(PDO::FETCH_ASSOC);
        if (!empty($result)) {
            /*delete decision*/
            if ($result[0]["decision"] == $decision) {
                $stmt2 = $conn->prepare("DELETE FROM decision WHERE idProfile=? AND idPost=?");
                $stmt2->execute(array(
                    $idProfile,
                    $idPost
                ));
            } else {
                /*update decision*/
                $stmt3 = $conn->prepare("UPDATE decision SET decision=? WHERE idProfile=? AND idPost=?");
                $stmt3->execute(array(
                    $decision,
                    $idProfile,
                    $idPost
                ));
            }
        } else {
            /*insert decision*/
            $stmt4 = $conn->prepare("INSERT INTO decision(decision, dateCreation, idProfile, idPost) VALUES (?,NOW(),?,?)");
            $stmt4->execute(array(
                $decision,
                $idProfile,
                $idPost
            ));
        }
    } catch (Exception $e) {
        echo "Connection failed: " . $e->getMessage();
    }
} elseif (isset($_GET["idPost"])) {
    $idPost = $_GET["idPost"];
    try {
        $conn = new PDO("mysql:host=" . $host . ";dbname=" . $dbName, $userName, $passWord);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt1 = $conn->prepare("SELECT profile.username, decision.decision , profile.photo FROM profile, decision WHERE decision.idProfile=profile.idProfile AND decision.idPost=?");
        $stmt1->execute(array(
            $idPost
        ));
        $data = $stmt1->fetchAll(PDO::FETCH_ASSOC);
        print_r(json_encode($data));
    } catch (Exception $e) {
        echo "Connection failed: " . $e->getMessage();
    }
}