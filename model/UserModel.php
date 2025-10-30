<?php
require_once 'User.php';

class UserModel {
    private $conn;

    public function __construct($db){
        $this->conn = $db;
    }

    public function create_user($username, $pswd1) {
    $checkQuery = "SELECT * FROM PROFILE_ WHERE USER_NAME = ?";
    $checkStmt = $this->conn->prepare($checkQuery);
    $checkStmt->bindValue(1, $username);
    $checkStmt->execute();
    if ($checkStmt->rowCount() > 0) {
        return null;
    }
    $createQuery = "CALL RegistrarUsuario(?, ?)";
    $createStmt = $this->conn->prepare($createQuery);
    $createStmt->bindValue(1, $username);
    $createStmt->bindValue(2, $pswd1);
    $createStmt->execute();
    $result = $createStmt->fetch(PDO::FETCH_ASSOC);
    return $result;
}


    public function get_all_users() {
        $query = "SELECT * FROM PROFILE_ AS P, USER_ AS U WHERE P.PROFILE_CODE = U.PROFILE_CODE";

        $stmt = $this->conn->prepare($query);

        $stmt-> execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $result;
    }

    public function delete_user($id) {
        $query = "DELETE U, P FROM USER_ U JOIN PROFILE_ P ON P.PROFILE_CODE = U.PROFILE_CODE WHERE U.PROFILE_CODE = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            return TRUE;
        } else {
            return FALSE;
        }
    }
}
?>

