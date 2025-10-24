<?php
require_once 'User.php';
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);
$username = $data['username'];
$pswd1 = $data['pswd1'];
$pswd2 = $data['pswd2'];

$response = ["exito" => false];

private $conn; 
 public function__constructor($db){
        $this->conn = $db;
    }

if ($pswd1 === $pswd2) {
    try {
        $stmt = $this->conn->prepare($query);
        $smt = $this->conn->prepare($query2)
            $smt->bindParam(1, $username);
            $smt-> bindparam(2, $pswd1);
            $smt->execute();
            if($smt->rowCount() > 0){
                echo "El usuario ya existe";
            }else{
            $stmt->bindParam(1, $username);
            $stmt->bindParam(2, $pswd1);
            $stmt->bindParam(3, $pswd2);
            $stmt->execute();
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            $response["exito"] = (bool)$result['exito'];
            }

    } catch (Exception $e) {
        error_log($e->getMessage());
    }
}

echo json_encode($response);
?>
