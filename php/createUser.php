<?php

require_once 'dbConnect.php';

// Define variables and initialize with empty values
$username = $password = $confirm_password = "";
$username_err = $password_err = $confirm_password_err = $err = "";

// Processing form data when form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {

  // Validate username
  if (empty(trim($_POST["username"]))) {
    $username_err = "Please enter a username.";
  } else {
    // Prepare a select statement
    $sql = "SELECT id FROM users WHERE username = ?";
    if ($stmt = mysqli_prepare($link, $sql)) {
      // Bind variables to the prepared statement as parameters
      mysqli_stmt_bind_param($stmt, "s", $param_username);
      // Set parameters
      $param_username = trim($_POST["username"]);

      // Attempt to execute the prepared statement
      if (mysqli_stmt_execute($stmt)) {
        // store result
        mysqli_stmt_store_result($stmt);

        if (mysqli_stmt_num_rows($stmt) == 1) {
          $username_err = "This username is already taken.";
        } else {
          $username = trim($_POST["username"]);
        }

      } else {
        echo json_encode(array('err' => "Something went wrong. Please try again later."));
      }
    }
    // Close statement
    mysqli_stmt_close($stmt);
  }

  // Validate password
  if (empty(trim($_POST['password']))) {
    $password_err = "Please enter a password.";
  } elseif (strlen(trim($_POST['password'])) < 6) {
    $password_err = "Password must have at least 6 characters.";
  } else {
    $password = trim($_POST['password']);
  }

  // Validate confirm password
  if (empty(trim($_POST["confirm_password"]))) {
    $confirm_password_err = 'Please confirm password.';
  } else {
    $confirm_password = trim($_POST['confirm_password']);
    if ($password != $confirm_password) {
      $confirm_password_err = 'Password did not match.';
    }
  }

  // Validate auth_token_set
  if (empty(trim($_POST["app_token"]))) {
    $err = "Please enter an app token";
  } elseif (empty(trim($_POST["app_token"]))) {
    $err = "Please enter an app token";
  } elseif (empty(trim($_POST["app_token_secret"]))) {
    $err = "Please enter an app token secret";
  } elseif (empty(trim($_POST["access_token"]))) {
    $err = "Please enter an access token";
  } elseif (empty(trim($_POST["access_token_secret"]))) {
    $err = "Please enter an access token secret";
  }

  // Check input errors before inserting in database
  if (empty($username_err) && empty($password_err) && empty($confirm_password_err) && empty($err)) {
    // Prepare an insert statement
    $sql = "INSERT INTO users (username, password) VALUES (?, ?)";
    if ($stmt = mysqli_prepare($link, $sql)) {
      // Bind variables to the prepared statement as parameters
      mysqli_stmt_bind_param($stmt, "ss", $param_username, $param_password);

      // Set parameters
      $param_username = $username;
      $param_password = password_hash($password, PASSWORD_DEFAULT); // Creates a password hash

      // Attempt to execute the prepared statement
      if (mysqli_stmt_execute($stmt)) {
        $succ = "Prima! Der Benutzer wurde angelegt!";
        echo json_encode(array('succ' => $succ));
      } else {
        echo json_encode(array('err' => "Something went wrong. Please try again later."));
      }
    }
    // Close statement
    mysqli_stmt_close($stmt);
  } elseif ($username_err) {
    echo json_encode(array('err' => $username_err));
  } elseif ($password_err) {
    echo json_encode(array('err' => $password_err));
  } elseif ($confirm_password_err) {
    echo json_encode(array('err' => $confirm_password_err));
  } elseif ($err) {
    echo json_encode(array('err' => $err));
  }
  // Close connection
  mysqli_close($link);
}

?>
