<?php
    include './infoServer.php';
    try{
        $conn = new PDO("mysql:host=".$host.";dbname=".$dbName, $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt1=$conn->prepare("SELECT type FROM typegeneral");
        $stmt1->execute();
        $res1=$stmt1->fetchAll();
        $stmt2=$conn->prepare("SELECT type FROM typespecifique");
        $stmt2->execute();
        $res2=$stmt2->fetchAll();
        $data = array();
        $data = [$res1,$res2];
        print_r(json_encode($data));
    } catch(PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
      }


?>