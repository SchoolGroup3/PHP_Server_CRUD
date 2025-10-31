<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");

require_once '../controller/controller.php';

$data = json_decode(file_get_contents("php://input"), true);
$username = $data['username'] ?? '';
$password = $data['password'] ?? '';

$controller = new controller();
$user = $controller->loginUser($username, $password);

if (is_null($user)) {
    $user = $controller->loginAdmin($username, $password);
    if (is_null($user)) {
        echo json_encode(['error' => 'El nombre de usuario o contraseña son incorrectos.']);
    } else {
        echo json_encode(['resultado' => $user, 'type' => 'admin'], JSON_UNESCAPED_UNICODE);
    }
} else {
    echo json_encode(['resultado' => $user, 'type' => 'user'], JSON_UNESCAPED_UNICODE);
}
?>