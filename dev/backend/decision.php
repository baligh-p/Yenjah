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
}elseif (isset($_GET["idPost"])) {
    $idPost = $_GET["idPost"];
    try {
        $conn = new PDO("mysql:host=" . $host . ";dbname=" . $dbName, $userName, $passWord);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt1 = $conn->query("SELECT profile.username, profile.photo FROM profile, decision WHERE decision.idProfile=profile.idProfile AND decision.idPost=? AND decision=1 ");
        $stmt1->execute(array(
            $idPost
        ));
        $stmt2 = $conn->query("SELECT profile.username, profile.photo FROM profile, decision WHERE decision.idProfile=profile.idProfile  AND decision.idPost=? AND decision=0 ");
        $stmt2->execute(array(
            $idPost
        ));
        $take_list = $stmt1->fetchAll(PDO::FETCH_ASSOC);
        $leave_list = $stmt2->fetchAll(PDO::FETCH_ASSOC);
        $data = array();
        array_push($data,$take_list,$leave_list);
        print_r(json_encode($data));
    } catch (Exception $e) {
        echo "Connection failed: " . $e->getMessage();
    }
}