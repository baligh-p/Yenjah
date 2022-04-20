<?php
include_once "./infoServer.php";
$data = json_decode(file_get_contents("php://input"));
try {
    if (isset($data->{"idPost"})) {
        $conn = new PDO("mysql:host=" . $host . ";dbname=" . $dbName, $userName, $passWord);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $id = $data->{"idPost"};
        $stmt = $conn->prepare("DELETE FROM post WHERE idPost=? ");
        $stmt->execute(array($id));
        $stmt2 = $conn->query("SELECT imagePost from post where idPost='$id'");
        $oldImage = $stmt2->fetchColumn();
        echo $oldImage;
        $count = $stmt->rowCount();
        if ($count != 0) {
            print_r("supression succées");
        } else {
            print_r("supression échoué");
        }
    }
} catch (Exception $e) {
    echo "Connection failed: " . $e->getMessage();
}