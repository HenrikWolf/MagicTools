
<?php
  session_start();
?>

<!DOCTYPE html>
<html>

<head>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <!-- import stylesheets -->
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">
  <link rel="stylesheet" type="text/css" href="custom.css">

  <!-- import icon lib -->
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossorigin="anonymous">

  <!-- import bootstrap and jquery -->
  <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T" crossorigin="anonymous"></script>

  <!-- import cryptJS -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.min.js"></script>

  <!-- in order to use modules/es6 you have to set type="module" -->
  <!-- Firefox: dom.moduleScripts.enabled false to true -->
  <script type="module" src="./js/javascript.js"></script>

</head>

<body>

  <!-- Beginn Navbar -->
  <?php include_once("content/navbar.php");?>

  <!-- Begin Content -->
  <div class="d-flex justify-content-md-center">

    <!-- Begin Apps -->
    <div class="col-lg-6 px-5 py-3">
      <div class="tab-content">

        <?php
          include_once("content/export.php");
          include_once("content/import.php");
          include_once("content/wasAnderes.php");
          include_once("content/userCreate.php");
          include_once("content/userEdit.php");
          include_once("content/faq.php");
        ?>

      </div>
    </div>

  </div>

</body>

</html>
