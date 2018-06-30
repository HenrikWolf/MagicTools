<?php

require_once 'dbConnect.php';

// Define variables and initialize with empty values
$token_err = "";

// Processing form data when form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {

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

  // TODO: validate username

  // Check input errors before inserting in database
  if (empty($token_err)) {
    // Prepare an insert statement
    $sql = "UPDATE users SET app_token = ?, app_token_secret = ?, access_token = ?,
            access_token_secret = ? WHERE username = ?";

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
  } else {
    echo json_encode(array('err' => $token_err));
  }
  // Close connection
  mysqli_close($link);
}

?>
