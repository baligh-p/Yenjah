<?php
include './infoService.php';
$idProfil=$_POST["idProfil"];
$title=$_POST["title"];
$description=$_POST["description"];
$idTypeGenerale=$_POST["generalType"];
$idTypeSpecifique=$_POST["specificType"];
$objective=$_POST["objectif"];
//image input and control
//$fullURL = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
try {
    $conn = new PDO("mysql:host=".$host.";dbname=".$dbName, $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connected successfully";
    if (isset($_FILES["photo"])){
        $target_file = "assets/photoPost/" . time() . basename($_FILES["image"]["name"]);
        $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
        $check = getimagesize($_FILES["photo"]["tmp_name"]);
        if($check !== false) {
            echo "File is an image - " . $check["mime"] . ".";
            $uploadOk = 1;
        } else {
            echo "File is not an image.";
            $uploadOk = 0;
        }
        if (file_exists($target_file)) {
            echo "Sorry, file already exists.";
            $uploadOk = 0;
        }   
        if ($_FILES['photo']["size"] > 500000) {
            echo "Sorry, your file is too large.";
            $uploadOk = 0;
        }
        if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif" ) {
            echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
            $uploadOk = 0;
        }
        if ($uploadOk == 0) {
            echo "Sorry, your file was not uploaded.";
        // if everything is ok, try to upload file
        } else {
            if (move_uploaded_file($_FILES["photo"]["tmp_name"],$target_file)) {
                echo "image uploaded";
            }else{
                echo "error due uploading file";
            }
        }
    }else {
        $_FILES["photo"]="";
    }
    $stmt=$conn->prepare("INSERT INTO `post` (`text`, `titre`,`idProfile`,`objectif`, `idTypeGeneral`, `idTypeSpecifique`, `imagePost`) VALUES (?,?,?,?,?,?,?");
    $stmt->execute(array(
        $description,
        $title,
        $idProfil,
        $objectif,
        $idTypeGeneral,
        $idTypeSpecifique,
        $target_file
    ));
} catch(PDOException $e) {
    echo "error of connection  " ;
  }


?>