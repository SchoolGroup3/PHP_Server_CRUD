<?php
require_once '../Config/Database.php';
require_once '../model/UserBD.php';


class controller {
    private $UserBd;

    public function __construct() {
        $database = new Database();
        $db = $database->getConnection();
        $this->UserBd = new UserBd($db);
    }

    public function create_user($username, $pswd1, $pswd2) {
        return $this->UserBD->create_user($username, $pswd1, $pswd2);
    }
}
?>