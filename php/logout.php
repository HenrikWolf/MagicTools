<?php

session_start();

// Attempt to log out a user
if (session_destroy()) {
  echo json_encode(array('succ' => "Prima! Der Benutzer wurde ausgeloggt!"));
} else {
  echo json_encode(array('err' => "Something went wrong. Please try again later."));
}

?>
