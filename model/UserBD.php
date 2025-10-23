<?php
require_once 'User.php';

class LibroModel {
    private $conn;

    public function__constructor($db){
        $this->conn = $db;
    }

    public function create_user($username, $pswd1, $pswd2){
        $query = "CALL create_user(?,?)";
        $stmt = $this->conn->prepare($query)

        if($pswd1 === $pswd2){
            $stmt-> bindparam(1, $username);
            $stmt-> bindparam(2, $pswd1);
            $stmt-> execute();
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            $exito = (bool)$result['exito'];
            if($exito){
                echo "Usuario creado con éxito";
                header("Location: login.html");
                exit();
            }else{
                echo "Error al crear el usuario";
            }
        }else{
            echo "Las contraseñas no coinciden";
        }
    }

}

?>

