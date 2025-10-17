<?php

require_once 'Profile.php';

class User extends Profile {
    private $gender;
    private $cardNumber;

    public function __construct($gender, $cardnumber) {
        parent::__construct($profile_code, $email, $username, $name, $password, $phonenumber);
        $this->gender = $gender;
        $this->cardNumber = $cardnumber;
}
    public function getGender() {
        return $this->gender; 
    }
    public function setGender($gender) {
        $this->gender = $gender;
    }
    public function getCardNumber() {
        return $this->cardNumber;
    }
    public function setCardNumber($cardNumber) {
        $this->cardNumber = $cardNumber;
    }
    public function __toString() {
        return "User: " . parent::mostrar() . " - Gender: " . $this->gender . " - Card Number: " . $this->cardNumber;
    }    
}

?>