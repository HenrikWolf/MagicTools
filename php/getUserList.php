<?php

// Connect to database
require_once 'dbConnect.php';

// Define variables and initialize with empty values
$rows = array();

if ($_SERVER["REQUEST_METHOD"] == "POST") {

  // Prepare a select statement
  $sql = "SELECT username FROM users";

  // Execute statement
  $result = mysqli_query($link, $sql);

  // if result is empty, return an error. Otherwise return entries
  if (!$result) {
    echo json_encode(array('err' => mysqli_error($link)));
  } else {
    while($r = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
      $rows[] = $r;
    }
    echo json_encode($rows);
  }

  // Close statement and connection
  mysqli_stmt_close($stmt);
  mysqli_close($link);
}

?>
