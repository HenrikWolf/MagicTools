<?php

require_once 'dbConnect.php';

// Define variables and initialize with empty values
$row = null;

if ($_SERVER["REQUEST_METHOD"] == "POST") {

  // Prepare a select statement
  $sql = "SELECT * FROM users WHERE username='".$_POST['username']."'";

  // Execute statement
  $result = mysqli_query($link, $sql);

  // if result is wrong, return an error. Otherwise return entries
  if (!$result) {
    echo json_encode(array('err' => mysqli_error($link)));
  } else if (mysqli_num_rows($result) == 1) {
    $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
    echo json_encode($row);
  } else {
    echo json_encode(array('err' => "no user ".$_POST['username']." found"));
  }

  // Close statement and connection
  mysqli_stmt_close($stmt);
  mysqli_close($link);
}

?>
