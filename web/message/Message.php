<?php
  class Message {

    function __construct($id, $message, $start, $expire){
      $this->id = $id;
      $this->message = $message;
      $this->start = $start;
      $this->expire = $expire;
    }

    function GetId() {
      return $this->id;
    }

    function GetMessage() {
      return $this->message;
    }

    function GetStart() {
      return $this->start;
    }

    function GetExpire() {
      return $this->expire;
    }
  }
?>