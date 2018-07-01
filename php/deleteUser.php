<?php

// Connect to database
require_once 'dbConnect.php';

// Define variables and initialize with empty values

if ($_SERVER["REQUEST_METHOD"] == "POST") {

  // Prepare a select statement
  $sql = "DELETE FROM users WHERE username = ?";

  // Attempt to prepare a sql query
  if ($stmt = mysqli_prepare($link, $sql)) {

    // Bind variables to the prepared statement as parameters
    mysqli_stmt_bind_param($stmt, "s", $param_username);

    // Set parameters
    $param_username = trim($_POST["username"]);
  }

  // Attempt to execute the prepared statement
  if (mysqli_stmt_execute($stmt)) {
    echo json_encode(array('succ' => "Prima! Der Benutzer wurde gelöscht!", 'username' => $username));
  } else {
    echo json_encode(array('err' => "Something went wrong. Please try again later."));
  }

  // Close statement and connection
  mysqli_stmt_close($stmt);
  mysqli_close($link);
}

?>
