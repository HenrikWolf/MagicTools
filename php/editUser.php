<?php

// Connect to database
require_once 'dbConnect.php';

// Define variables and initialize with empty values
$token_err = $username_err = "";

// Processing form data when form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {

  // Validate username
  if (empty(trim($_POST["username"]))) {
    $username_err = "username is null";
  }

  // Validate auth_token_set
  if (empty(trim($_POST["app_token"]))) {
    $token_err = "Please enter an app token";
  } elseif (empty(trim($_POST["app_token_secret"]))) {
    $token_err = "Please enter an app token secret";
  } elseif (empty(trim($_POST["access_token"]))) {
    $token_err = "Please enter an access token";
  } elseif (empty(trim($_POST["access_token_secret"]))) {
    $token_err = "Please enter an access token secret";
  }

  // Check input errors before updating in database
  if (empty($token_err) && empty($password_err)) {

    // Prepare an insert statement
    $sql = "UPDATE users SET app_token = ?, app_token_secret = ?, access_token = ?,
            access_token_secret = ? WHERE username = ?";

    // Attempt to prepare a sql query
    if ($stmt = mysqli_prepare($link, $sql)) {

      // Bind variables to the prepared statement as parameters
      mysqli_stmt_bind_param($stmt, "sssss", $param_app_token, $param_app_token_secret,
              $param_access_token, $param_access_token_secret, $param_username);

      // Set parameters
      $param_app_token = trim($_POST['app_token']);
      $param_app_token_secret = trim($_POST['app_token_secret']);
      $param_access_token = trim($_POST['access_token']);
      $param_access_token_secret = trim($_POST['access_token_secret']);
      $param_username = trim($_POST['username']);

      // Attempt to execute the prepared statement
      if (mysqli_stmt_execute($stmt)) {
        echo json_encode(array('succ' => "Prima! Der Benutzer wurde geändert!", 'username' => trim($_POST['username'])));
      } else {
        echo json_encode(array('err' => "Something went wrong. Please try again later."));
      }

    } else {
      echo json_encode(array('err' => "Something went wrong. Please try again later."));
    }

    // Close statement
    mysqli_stmt_close($stmt);

  } elseif ($token_err) {
    echo json_encode(array('err' => $token_err));
  } elseif ($username_err) {
    echo json_encode(array('err' => $username_err));
  }

  // Close connection
  mysqli_close($link);
}

?>
