<?php
include "./infoServer.php";
include "./generateID.php";
if (isset($_POST["username"])) {
    $id = generateID(30);
    $cnx = new PDO("mysql:host=" . $host . ";dbname=" . $dbName, $userName, $passWord);
    $checkExist = $cnx->query("SELECT count(*) as nbrUser FROM profile where email='$_POST[email]'");
    $resultCheck = $checkExist->fetch();
    if ($resultCheck["nbrUser"] == 0) {
        if (isset($_FILES["photo"])) {
            $h = pathinfo($_FILES["photo"]["name"]);
            $o = $h['extension'];
            $image = generateID(20);
            move_uploaded_file($_FILES['photo']['tmp_name'], './../src/assets/photoProfile/' . basename($image) . '.' . $o);
            $image = 'photoProfile/' . $image . '.' . $o;
            $req1 = $cnx->prepare("INSERT INTO profile VALUES (?,?,?,?,Now(),?)");
            $req1->execute(array($_POST["username"], $_POST["password"], $_POST["email"], $id, $image));
        } else {
            $req1 = $cnx->prepare("INSERT INTO profile(username,pwd,email,dateCreate,idProfile)VALUES (?,?,?,Now(),?)");
            $req1->execute(array($_POST["username"], $_POST["password"], $_POST["email"], $id));
        }
    }
    $resultCheck["id"] = $id;
    print_r(json_encode($resultCheck));
} else if (isset($_GET["user"])) {/*FOR CHECK EXIST OF USERNAME*/
    $base = mysqli_connect($host, $userName, $passWord, $dbName);
    $request = "SELECT count(*) as nbrUser FROM profile WHERE username='$_GET[user]'";
    $result = mysqli_query($base, $request);
    $send = mysqli_fetch_assoc($result);
    print_r(json_encode($send));
}