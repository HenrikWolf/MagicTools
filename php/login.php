<?php

// Connect to database
require_once 'dbConnect.php';

// Define variables and initialize with empty values
$row = null;

if ($_SERVER["REQUEST_METHOD"] == "POST") {

  $password = $_POST["password"];

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
    if ($row !== false && password_verify($password, $row['password'])) {
        //$_SESSION['userid'] = $user['id'];
        echo json_encode(array('succ' => "password is correct"));
    } else {
        echo json_encode(array('err' => "password is wrong"));
    }
  } else {
    echo json_encode(array('err' => "no user ".$_POST['username']." found"));
  }

  // Close statement and connection
  mysqli_stmt_close($stmt);
  mysqli_close($link);
}

?>
