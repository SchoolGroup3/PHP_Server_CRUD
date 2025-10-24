<?php
require_once 'User.php';

class UserModel {
    private $conn;

    public function __construct($db){
        $this->conn = $db;
    }

    /*public function create_user($username, $pswd1, $pswd2){
        $query = "CALL create_user(?,?)";
        $query2 = "SELECT * FROM PROFILE_ WHERE USER_NAME = ?";
        $stmt = $this->conn->prepare($query);
        $smt = $this->conn->prepare($query2);
        $smt->bindParam(1, $username);
        $smt->execute();
        if($smt->rowCount() > 0){
            echo "El usuario ya existe";
        }else{
        $stmt-> bindparam(1, $username);
        $stmt-> bindparam(2, $pswd1);
        $stmt-> execute();
        }
    }*/

    public function get_all_users() {
        $query = "SELECT * FROM PROFILE_ AS P, USER_ AS U WHERE P.PROFILE_CODE = U.PROFILE_CODE;SELECT * FROM USER_";

        $stmt = $this->conn->prepare($query);

        $stmt-> execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $result;
    }
}
?>

