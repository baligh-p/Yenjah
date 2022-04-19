<?php
include "./infoServer.php";
$id=$_POST["idPost"];
try {
    $conn = new PDO("mysql:host=" . $host . ";dbname=" . $dbName, $userName, $passWord);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $conn->prepare("DELETE FROM `post` WHERE idPost=?");
    $stmt->execute(array(
        $id
    ));
    $count = $stmt->rowCount();
    if ($count !=0 ){
        print_r("supression succées");
    }else{
        print_r("supression échoué"); 
    }
} catch (Exception $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>