<?php
  /* Database credentials. Assuming you are running MySQL server with default setting (user 'root' with no password) */

  define('DB_SERVER', 'localhost');
  define('DB_USERNAME', '25051m13850_3');
  define('DB_PASSWORD', 'Frankring20c');
  define('DB_NAME', '25051m13850_3');

  /* Attempt to connect to MySQL database */
  $link = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

  // Check connection
  if ($link === false) {
    die("ERROR: Could not connect. " . mysqli_connect_error());
  } else {
    echo "Verbindung erfolgreich aufgebaut!";
  }
?>
