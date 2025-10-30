<?php
require_once 'User.php';

class UserModel {
    private $conn;

    public function __construct($db){
        $this->conn = $db;
    }

     public function loginUser($username, $password) {
        $query = "SELECT * FROM PROFILE_ P JOIN USER_ U ON P.PROFILE_CODE = U.PROFILE_CODE
        WHERE USER_NAME = :username AND PSWD = :pass";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":username", $username);
        $stmt->bindParam(":pass", $password);
        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($result) {
            return new User($result["PROFILE_CODE"], $result["EMAIL"], $result["USER_NAME"], $result["PSWD"],
            $result["TELEPHONE"], $result["NAME_"], $result["SURNAME"], $result["GENDER"], $result["CARD_NO"]);
        } else {
            return null;
        }
     }

    public function loginAdmin($username, $password) {
        $query = " SELECT * FROM PROFILE_ P JOIN ADMIN_ A ON P.PROFILE_CODE=A.PROFILE_CODE
        WHERE USER_NAME = :username AND PSWD = :pass";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":username", $username);
        $stmt->bindParam(":pass", $password);
        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($result) {
            return new Admin($result["PROFILE_CODE"], $result["EMAIL"], $result["USER_NAME"],
            $result["PSWD"], $result["TELEPHONE"], $result["NAME_"], $result["SURNAME"], $result["CURRENT_ACCOUNT"]);
        } else {
            return null;
        }
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

    public function modifyUser($email, $username, $telephone, $name, $surname, $gender, $card_no, $profile_code){
        $query = "UPDATE USER_ U JOIN PROFILE_ P ON U.PROFILE_CODE = P.PROFILE_CODE 
        SET P.EMAIL = :email, P.USER_NAME = :username, P.TELEPHONE = :telephone, P.NAME_ = :name_, P.SURNAME = :surname, U.GENDER = :gender, U.CARD_NO = :card_no
        WHERE P.PROFILE_CODE = :profile_code";
        
        $stmt = $this->conn->prepare($query);
        $stmt-> bindparam(':email', $email);
        $stmt-> bindparam(':username', $username);
        $stmt-> bindparam(':telephone', $telephone);
        $stmt-> bindparam(':name_', $name);
        $stmt-> bindparam(':surname', $surname);
        $stmt-> bindparam(':gender', $gender);
        $stmt-> bindparam(':card_no', $card_no);
        $stmt-> bindparam(':profile_code', $profile_code);

        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    } 

    public function modifyPassword($profile_code, $password){
        $query = "UPDATE PROFILE_ SET PSWD = :password_ WHERE PROFILE_CODE = :profile_code";
        $stmt = $this->conn->prepare($query);
        $stmt-> bindparam(':profile_code', $profile_code);
        $stmt-> bindparam(':password_', $password);

        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }
}
?>

