<?php

require_once 'dbConnect.php';

// Define variables and initialize with empty values
$rows = array();

if ($_SERVER["REQUEST_METHOD"] == "POST") {

  // Prepare a select statement
  $sql = "SELECT * FROM users WHERE username='".$_POST['username']."'";

  // Execute statement
  $result = mysqli_query($link, $sql);

  // if result is wrong, return an error. Otherwise return entries
  if (!$result) {
    echo json_encode(array('err' => mysqli_error($link)));
  } else if (mysqli_num_rows($result) == 1) {
    while($r = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
      $rows[] = $r;
    }
    echo json_encode($rows);
  } else {
    echo json_encode(array('err' => "result contains not one entry"));
  }

  // Close statement and connection
  mysqli_stmt_close($stmt);
  mysqli_close($link);
}

?>
