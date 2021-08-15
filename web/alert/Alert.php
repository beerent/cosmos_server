<?php
  class Alert {

    function __construct($id, $key, $title, $alert){
      $this->id = $id;
      $this->key = $key;
      $this->title = $title;
      $this->alert = $alert;
    }

    function GetId() {
      return $this->id;
    }

    function GetKey() {
      return $this->key;
    }

    function GetTitle() {
      return $this->title;
    }

    function GetAlert() {
      return $this->alert;
    }
  }
?>