<?php

session_start();

// Connect to database
require_once 'dbConnect.php';

// Define variables and initialize with empty values
$row = null;
$username = $password = "";
$username_err = $password_err = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

  // Validate username and password
  if (empty(trim($_POST["username"]))) {
    $username_err = "Please enter a username";
  } elseif (empty(trim($_POST["password"]))) {
    $password_err = "Please enter a password";
  }

  // Check input errors before inserting in database
  if (empty($username_err) && empty($password_err)) {

    // Prepare a select statement
    $sql = "SELECT * FROM users WHERE username='".$_POST['username']."'";

    // Execute statement
    $result = mysqli_query($link, $sql);

    // If result is empty, return an error. Otherwise return entries
    if (!$result) {
      echo json_encode(array('err' => mysqli_error($link)));
    } else if (mysqli_num_rows($result) == 1) {
      $row = mysqli_fetch_array($result, MYSQLI_ASSOC);

      // check password
      if ($row !== false && password_verify($_POST["password"], $row['password'])) {
          $_SESSION['username'] = $row['username'];
          echo json_encode(array('succ' => "password is correct"));
      } else {
          echo json_encode(array('err' => "password is wrong"));
      }
    } else {
      echo json_encode(array('err' => "no user ".$_POST['username']." found"));
    }

    // Close statement
    mysqli_stmt_close($stmt);

  } elseif ($username_err) {
    echo json_encode(array('err' => $username_err));
  } elseif ($password_err) {
    echo json_encode(array('err' => $password_err));
  }

  // Close connection
  mysqli_close($link);
}

?>
