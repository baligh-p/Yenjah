<?php
include './infoServer.php';
if (isset($_GET["clid"])) {
    try{
        $conn = new PDO("mysql:host=".$host.";dbname=".$dbName, $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt=$conn->prepare("SELECT post.text, post.titre, post.dateCreate, post.objectif, post.imagePost, typegeneral.type AS typeG, typespecifique.type AS typeS 
                                FROM post, typegeneral, typespecifique 
                                WHERE post.idTypeGeneral=typegeneral.idTypeGeneral AND post.idTypeSpecifique=typespecifique.idTypeSpecifique AND typegeneral.idTypeSpecifique=typespecifique.idTypeSpecifique AND idProfile=?");
        $stmt->execute(array(
            $_GET["clid"]
        )); 
        $data=$stmt->fetchAll();
        print_r(json_encode($data));
    }catch(PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
    }
}
?>