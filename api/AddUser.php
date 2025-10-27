<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require_once '../controller/controller.php';
header('Content-Type: application/json; charset=utf-8');

$data = json_decode(file_get_contents("php://input"), true);
$username = $data['username'];
$pswd1 = $data['pswd1'];
$pswd2 = $data['pswd2'];

$response = ["exito" => false];

$controller = new controller();
$user= $controller->create_user($username, $pswd1, $pswd2);

if ($pswd1 === $pswd2) {
    try {
      if($user != null){
        echo json_encode([
            'resultado' => $user
        ], JSON_UNESCAPED_UNICODE);
      } else {
        echo json_encode(['error' => 'No se ha creado correctamente el usuario']);
      }

    } catch (Exception $e) {
        error_log($e->getMessage());
    }
}

?>
