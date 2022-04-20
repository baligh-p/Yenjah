<?php
include_once './infoServer.php';
if (isset($_GET["clid"])) {
    try {
        $conn = new PDO("mysql:host=" . $host . ";dbname=" . $dbName, $userName, $passWord);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->prepare("SELECT post.idPost , post.text, post.titre, post.dateCreate, post.objectif, post.imagePost, typegeneral.type AS typeGeneral, typespecifique.type AS typeSpecifique 
                                FROM post, typegeneral, typespecifique 
                                WHERE post.idTypeGeneral=typegeneral.idTypeGeneral AND post.idTypeSpecifique=typespecifique.idTypeSpecifique AND post.idProfile=? ORDER BY post.dateCreate DESC");
        $stmt->execute(array(
            $_GET["clid"]
        ));
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        print_r(json_encode($data));
    } catch (PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
    }
}