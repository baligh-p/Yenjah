<?php
include "./infoServer.php";
if (isset($_GET["clid"])) {
    try {
        $conn = new PDO("mysql:host=" . $host . ";dbname=" . $dbName, $userName, $passWord);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt0 = $conn->query("SELECT idTypeGeneral from typegeneral ");
        $idTypeGeneral = $stmt0->fetchColumn();
        $stmt1 = $conn->prepare("SELECT profile.username as ann_username,profile.photo as ann_photo ,p.titre ,p.text ,p.dateCreate as dateCreate_post ,p.idPost, p.objectif, p.imagePost ,g.type as generalType,s.type as specificType
        from post p , typegeneral g , typespecifique s , profile WHERE profile.idProfile=p.idProfile AND p.idTypeGeneral=g.idTypeGeneral AND p.idTypeSpecifique=s.idTypeSpecifique AND p.idTypeGeneral=? order by p.dateCreate desc");
        $stmt1->execute(array($idTypeGeneral));
        $data = $stmt1->fetchAll(PDO::FETCH_ASSOC);
        //print_r($data);
        //print_r($value["idPost"]."\n");
        foreach ($data as $index => $value) {
            $tab = array();
            //print_r($value["idPost"]."\n");
            $stmt2 = $conn->prepare("SELECT commentaire.text, commentaire.dateCreate as dateCreate_commentaire, profile.username as comm_username, profile.photo as comm_photo FROM commentaire, profile WHERE commentaire.idProfile=profile.idProfile AND commentaire.idPost=?");
            $stmt2->execute(array(
                $value["idPost"]
            ));
            $result = $stmt2->fetchAll(PDO::FETCH_ASSOC);
            array_push($data[$index], $result);
            $data[$index]["commentaires"] = $data[$index][0];
            unset($data[$index][0]);
            //print_r($result);
            $stmt3 = $conn->prepare("SELECT count(decision.idPost) AS nb_take FROM decision, post WHERE post.idPost=decision.idPost AND decision=1 AND decision.idPost=?");
            $stmt3->execute(array(
                $value["idPost"]
            ));
            $stmt4 = $conn->prepare("SELECT count(decision.idPost) AS nb_leave FROM decision, post WHERE post.idPost=decision.idPost AND decision=0 AND decision.idPost=?");
            $stmt4->execute(array(
                $value["idPost"]
            ));
            $stmt5 = $conn->prepare("SELECT decision.decision FROM decision WHERE idProfile=? AND idPost=?");
            $stmt5->execute(array(
                $_GET["clid"],
                $value["idPost"]
            ));
            $stmt6 = $conn->prepare("SELECT profile.username as dec_username, profile.photo as dec_photo FROM profile, decision WHERE decision.idProfile=profile.idProfile AND decision.idPost=? AND decision=1 ");
            $stmt6->execute(array(
                $value["idPost"]
            ));
            $stmt7 = $conn->prepare("SELECT profile.username as dec_username, profile.photo as dec_photo FROM profile, decision WHERE decision.idProfile=profile.idProfile AND decision.idPost=? AND decision=0 ");
            $stmt7->execute(array(
                $value["idPost"]
            ));
            $nb_take = $stmt3->fetchColumn();
            $nb_leave = $stmt4->fetchColumn();
            $user_decision = $stmt5->fetchColumn();
            $list_take = $stmt6->fetchAll();
            $list_leave = $stmt7->fetchAll();
            $tab = array("nb_take" => $nb_take, "nb_leave" => $nb_leave, "user_decision" => $user_decision, "list_take" => $list_take, "list_leave" => $list_leave,);
            array_push($data[$index], $tab);
            $data[$index]["decisions"] = $data[$index][1];
            unset($data[$index][1]);
        }
        print_r(json_encode($data));
    } catch (Exception $e) {
        echo "Connection failed: " . $e->getMessage();
    }
} else {
    try {
        $conn = new PDO("mysql:host=" . $host . ";dbname=" . $dbName, $userName, $passWord);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt0 = $conn->query("SELECT idTypeGeneral from typegeneral ");
        $idTypeGeneral = $stmt0->fetchColumn();
        $stmt1 = $conn->prepare("SELECT profile.username as ann_username,profile.photo as ann_photo ,p.titre ,p.text ,p.dateCreate as dateCreate_post ,p.idPost, p.objectif, p.imagePost ,g.type as generalType,s.type as specificType
        from post p , typegeneral g , typespecifique s , profile WHERE profile.idProfile=p.idProfile AND p.idTypeGeneral=g.idTypeGeneral AND p.idTypeSpecifique=s.idTypeSpecifique AND p.idTypeGeneral=? order by p.dateCreate desc");
        $stmt1->execute(array($idTypeGeneral));
        $data = $stmt1->fetchAll(PDO::FETCH_ASSOC);
        //print_r($data);
        //print_r($value["idPost"]."\n");
        foreach ($data as $index => $value) {
            $tab = array();
            //print_r($value["idPost"]."\n");
            $stmt2 = $conn->prepare("SELECT commentaire.text, commentaire.dateCreate as dateCreate_commentaire, profile.username as comm_username, profile.photo as comm_photo FROM commentaire, profile WHERE commentaire.idProfile=profile.idProfile AND commentaire.idPost=?");
            $stmt2->execute(array(
                $value["idPost"]
            ));
            $result = $stmt2->fetchAll(PDO::FETCH_ASSOC);
            array_push($data[$index], $result);
            $data[$index]["commentaires"] = $data[$index][0];
            unset($data[$index][0]);
            //print_r($result);
            $stmt3 = $conn->prepare("SELECT count(decision.idPost) AS nb_take FROM decision, post WHERE post.idPost=decision.idPost AND decision=1 AND decision.idPost=?");
            $stmt3->execute(array(
                $value["idPost"]
            ));
            $stmt4 = $conn->prepare("SELECT count(decision.idPost) AS nb_leave FROM decision, post WHERE post.idPost=decision.idPost AND decision=0 AND decision.idPost=?");
            $stmt4->execute(array(
                $value["idPost"]
            ));
            $stmt6 = $conn->prepare("SELECT profile.username as dec_username, profile.photo as dec_photo FROM profile, decision WHERE decision.idProfile=profile.idProfile AND decision.idPost=? AND decision=1 ");
            $stmt6->execute(array(
                $value["idPost"]
            ));
            $stmt7 = $conn->prepare("SELECT profile.username as dec_username, profile.photo as dec_photo FROM profile, decision WHERE decision.idProfile=profile.idProfile AND decision.idPost=? AND decision=0 ");
            $stmt7->execute(array(
                $value["idPost"]
            ));
            $nb_take = $stmt3->fetchColumn();
            $nb_leave = $stmt4->fetchColumn();
            $list_take = $stmt6->fetchAll();
            $list_leave = $stmt7->fetchAll();
            $tab = array("nb_take" => $nb_take, "nb_leave" => $nb_leave, "list_take" => $list_take, "list_leave" => $list_leave,);
            array_push($data[$index], $tab);
            $data[$index]["decisions"] = $data[$index][1];
            unset($data[$index][1]);
        }
        print_r(json_encode($data));
    } catch (Exception $e) {
        echo "Connection failed: " . $e->getMessage();
    }
};