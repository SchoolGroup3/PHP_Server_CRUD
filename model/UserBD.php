<?php
require_once 'User.php';

class LibroModel {
    private $conn;

    public function__constructor($db){
        $this->conn = $db;
    }

    public function create_user($username, $pswd1, $pswd2){
        $query = "CALL create_user(?,?)";
        $query2 = "SELECT * FROM PROFILE_ WHERE USER_NAME = ?";
        $stmt = $this->conn->prepare($query)
        $smt-> $this->conn->prepare($query2)

            $smt->bindParam(1, $username);
            $smt->execute();
            if($smt->rowCount() > 0){
                echo "El usuario ya existe";
            }else{
            $stmt-> bindparam(1, $username);
            $stmt-> bindparam(2, $pswd1);
            $stmt-> execute();
            }

    public function modifyProfile($email, $username, $phone, $firstName, $lastName, $profile_code){
        $query = "UPDATE PROFILE_ SET EMAIL  = ?, USER_NAME = ?, TELEPHONE  = ?, NAME_  = ?, SURNAME = ? WHERE PROFILE_CODE = ?";
        $stmt = $this->conn->prepare($query);
        $stmt-> bindparam(1, $email);
        $stmt-> bindparam(2, $username);
        $stmt-> bindparam(3, $phone);
        $stmt-> bindparam(4, $firstName);
        $stmt-> bindparam(5, $lastName);
        $stmt-> bindparam(5, $profile_code);
        $stmt-> execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        $exito = (bool)$result['exito'];
        if($exito){
            echo "Usuario modificado con éxito";
            exit();
        }else{
            echo "Error al modificar el usuario";
        }
    }

    public function modifyUser($gender, $card_no, $profile_code){
        $query = "UPDATE USER_ SET GENDER   = ?, CARD_NO  = ? WHERE PROFILE_CODE = ?";
        $stmt = $this->conn->prepare($query);
        $stmt-> bindparam(1, $gender);
        $stmt-> bindparam(2, $card_no);
        $stmt-> bindparam(3, $profile_code);
        $stmt-> execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        $exito = (bool)$result['exito'];
        if($exito){
            echo "Usuario modificado con éxito";
            exit();
        }else{
            echo "Error al modificar el usuario";
        }
    }


}
}
?>

