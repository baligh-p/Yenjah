<?php
include "./infoServer.php";
if (isset($_POST["decision"])){
    $decision=$_POST["decision"];
    $idProfile=$_POST["idProfile"];
    $idPost=$_POST["idPost"];
    try{
        $conn = new PDO("mysql:host=".$host.";dbname=".$dbName, $userName, $passWord);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt1=$conn->prepare("SELECT decision FROM decision WHERE idProfile=? AND idPost=?");
        $stmt1->execute(array(
            $idProfile,
            $idPost
        ));
        $result = $stmt1->fetchAll(PDO::FETCH_ASSOC);
        //$result[0]["decision"]
        if (!empty($result)){
            if ($result[0]["decision"]==$decision){
                $stmt2=$conn->prepare("DELETE FROM decision WHERE idProfile=? AND idPost=?");
                $stmt2->execute(array(
                    $idProfile,
                    $idPost
                ));
                echo "decision Deleted";
            }else{
                $stmt3=$conn->prepare("UPDATE decision SET decision=? WHERE idProfile=? AND idPost=?");
                $stmt3->execute(array(
                    $decision,
                    $idProfile,
                    $idPost
                ));
                echo "decision Updated";
            }              
        }else{
            $stmt4=$conn->prepare("INSERT INTO decision(decision, dateCreation, idProfile, idPost) VALUES (?,NOW(),?,?)");
            $stmt4->execute(array(
                $decision,
                $idProfile,
                $idPost
            ));
            echo "decision Inserted";
        }
    } catch (Exception $e) {
        echo "Connection failed: " . $e->getMessage();
    }
}