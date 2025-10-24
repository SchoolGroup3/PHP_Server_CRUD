<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json; charset=utf-8');

require_once '../controller/controller.php';

$profile_code = $_GET['profile_code'] ?? '';
$email = $_GET['email'] ?? '';
$username = $_GET['username'] ?? '';
$phone = $_GET['phone'] ?? '';
$firstName = $_GET['firstName'] ?? '';
$lastName = $_GET['lastName'] ?? '';
$gender = $_GET['gender'] ?? '';
$cardNumber = $_GET['cardNumber'] ?? '';

$controller = new controller();
$profile = $controller->modifyProfile($email, $username, $phone, $firstName, $lastName, $profile_code);

if ($profile) {
    echo json_encode([
        'isbn' => $libro->getIsbn(),
        'nombre' => $libro->getNombre(),
        'autor' => $libro->getAutor()
    ], JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode(['error' => 'Libro no encontrado']);
}
?>