<?php

session_start();

// Connect to database
require_once 'dbConnect.php';

// Define variables and initialize with empty values
$login_err = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

  // Validate logged in user
  if (!isset($_SESSION['id'])) {
    $login_err = "Kein Benutzer eingeloggt";
  }

  // Check input errors before updating in database
  if (empty($login_err)) {

    // Prepare a select statement
    $sql = "DELETE FROM users WHERE id = ?";

    // Attempt to prepare a sql query
    if ($stmt = mysqli_prepare($link, $sql)) {

      // Bind variables to the prepared statement as parameters
      mysqli_stmt_bind_param($stmt, "s", $param_id);

      // Set parameters
      $param_id = trim($_SESSION['id']);
    }

    // Attempt to execute the prepared statement
    if (mysqli_stmt_execute($stmt)) {
      echo json_encode(array('succ' => "Prima! Der Benutzer wurde gelöscht!", 'username' => $_SESSION['username']));
    } else {
      echo json_encode(array('err' => "Something went wrong. Please try again later."));
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
