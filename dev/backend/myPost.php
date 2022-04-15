<?php
    include './infoServer.php';
    try{
        $conn = new PDO("mysql:host=".$host.";dbname=".$dbName, $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt=$conn->prepare("SELECT post.text, post.titre, post.dateCreate, post.objectif, post.imagePost, profile.username, typegeneral.type AS typeG, typespecifique.type as typeS 
                                FROM post, profile, typegeneral, typespecifique 
                                WHERE post.idProfile=profile.idProfile AND post.idTypeGeneral=typegeneral.idTypeGeneral AND post.idTypeSpecifique=typespecifique.idTypeSpecifique AND typegeneral.idTypeSpecifique=typespecifique.idTypeSpecifique");
        $stmt->execute(); 
        $res=$stmt->fetchAll();
        print_r(json_encode($res));
    } catch(PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
      }
?>