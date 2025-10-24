<?php
require_once '../Config/Database.php';
require_once '../model/UserModel.php';


class controller {
    private $UserModel;

    public function __construct() {
        $database = new Database();
        $db = $database->getConnection();
        $this->UserModel = new UserModel($db);
    }

    public function create_user($username, $pswd1, $pswd2) {
        return $this->UserModel->create_user($username, $pswd1, $pswd2);
    }

    public function get_all_users() {
        return $this->UserModel->get_all_users();
    }

    public function modifyProfile($email, $username, $phone, $firstName, $lastName, $profile_code) {
        return $this->UserModel->buscarPorIsbn($email, $username, $phone, $firstName, $lastName, $profile_code);
    }

    public function modifyUser($gender, $card_no, $profile_code){
        return $this->UserModel->modifyUser($gender, $card_no, $profile_code);
    }
}
?>