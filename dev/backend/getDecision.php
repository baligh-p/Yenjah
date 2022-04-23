<?php
include "./infoServer.php";
if (isset($_GET["clid"])) {
    try {
        $conn = new PDO("mysql:host=" . $host . ";dbname=" . $dbName, $userName, $passWord);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt1 = $conn->query("SELECT decision.idPost, count(decision.idPost) AS nb_decision FROM decision, post WHERE post.idPost=decision.idPost AND decision=1 GROUP BY decision.idPost");
        $stmt2 = $conn->query("SELECT decision.idPost, count(decision.idPost) AS nb_decision FROM decision, post WHERE post.idPost=decision.idPost AND decision=0 GROUP BY decision.idPost");
        $nb_take = $stmt1->fetchAll();
        $nb_leave = $stmt2->fetchAll();
        $resultat = array();
        array_push($resultat, $nb_take);
        print_r($resultat[0]);
        $stmt3 = $conn->query("SELECT profile.username, profile.photo FROM profile, decision WHERE decision.idProfile=profile.idProfile AND decision=1 ");
        $stmt4 = $conn->query("SELECT profile.username, profile.photo FROM profile, decision WHERE decision.idProfile=profile.idProfile  AND decision=0 ");
        $name_take_list = $stmt3->fetchAll(PDO::FETCH_ASSOC);
        $name_leave_list = $stmt4->fetchAll(PDO::FETCH_ASSOC);
    } catch (Exception $e) {
        echo "Connection failed: " . $e->getMessage();
    }
}