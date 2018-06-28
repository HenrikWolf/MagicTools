<?php

require_once 'dbConnect.php';

// Define variables and initialize with empty values

// Processing form data when form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {

  // Prepare a select statement
  $sql = "SELECT username FROM users";

  $result = mysqli_query($link, $sql);

  $rows = array();
  while($r = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
    $rows[] = $r;
  }

  echo json_encode($rows);

  // Close statement and connection
  mysqli_stmt_close($stmt);
  mysqli_close($link);
}

?>
