<?php
require_once 'Profile.php';

class Admin extends Profile {
    private $currentAccount;
    public function __construct($currentAccount) {
        parent::__construct( $profile_code, $email, $username, $name, $password, $phonenumber, $gender, $cardnumber);
        this ->currentAccount = $currentAccount;

    }
    
    public function getCurrentAccount() {
        return $this->currentAccount;
    }
    public function setCurrentAccount($currentAccount) {
        $this->currentAccount = $currentAccount;
    }
    
    public function __toString() {
        return "Admin: " . parent::mostrar() . " - Current Account: " . $this->currentAccount;
    }
}
?>