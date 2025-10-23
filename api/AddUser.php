<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json; charset=utf-8');

require_once '../controller/Controller.php';

$username = $_GET['username'] ?? '';
$pswd1 = $_GET['pswd1'] ?? '';
$pswd2 = $_GET['pswd2'] ?? '';

$controller = new Controller();
$adduser = $controller->create_user($username, $pswd1, $pswd2);

/*if ($adduser) {
    echo json_encode([
        'isbn' => $libro->getIsbn(),
        'nombre' => $libro->getNombre(),
        'autor' => $libro->getAutor()
    ], JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode(['error' => 'Libro no encontrado']);
}*/
?>
