<?php

session_start();

// Connect to database
require_once 'dbConnect.php';

// Define variables and initialize with empty values
$row = null;
$login_err = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

  // Validate logged in user
  if (!isset($_SESSION['id'])) {
    $login_err = "Kein Benutzer eingeloggt";
  }

  // Check input errors before updating in database
  if (empty($login_err)) {

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

    // Close statement
    mysqli_stmt_close($stmt);

  } elseif ($login_err) {
    echo json_encode(array('err' => $login_err));
  }

  // Close connection
  mysqli_close($link);
}

?>
