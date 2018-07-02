<?php

session_start();

// Connect to database
require_once 'dbConnect.php';

// Define variables and initialize with empty values
$row = null;
$err = "";

if (!isset($_SESSION['id'])) {
  echo json_encode(array('err' => "Kein Benutzer eingeloggt"));
} else {

  if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Prepare a select statement
    $sql = "SELECT * FROM users WHERE id='".$_SESSION['id']."'";

    // Execute statement
    $result = mysqli_query($link, $sql);

    // If result is empty, return an error. Otherwise return entries
    if (!$result) {
      echo json_encode(array('err' => mysqli_error($link)));
    } else if (mysqli_num_rows($result) == 1) {
      $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
      echo json_encode($row);
    } else {
      echo json_encode(array('err' => "no user found"));
    }

    // Close statement and connection
    mysqli_stmt_close($stmt);
    mysqli_close($link);
  }
}

?>
