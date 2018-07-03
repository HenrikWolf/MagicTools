
<!-- Begin Navbar -->
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <span class="navbar-brand mb-0 h1">MKM Tools</span>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="nav nav-pills mr-auto">
      <li class="nav-item active">
        <a class="nav-link active" id="export-tab" data-toggle="pill" href="#export" role="tab" aria-controls="export" aria-selected="true">Export Wantlist</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="import-tab" data-toggle="pill" href="#import" role="tab" aria-controls="import" aria-selected="false">Import Wantlist</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="contact-tab" data-toggle="pill" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Noch irgendwas</a>
      </li>
    </ul>
    <?php if(!isset($_SESSION['id'])) { ?>
    <ul class="nav">
      <li class="nav-item" data-toggle="tooltip" data-placement="bottom" title="new user account">
        <a class="nav-link fas fa-user-plus fa-lg px-1 mr-sm-2" id="user-create-tab" data-toggle="pill" href="#user-create" role="tab" aria-controls="user-create" aria-selected="false"></a>
      </li>
    </ul>
    <form class="form-inline" id="login-form">
      <input class="form-control mr-sm-2" id="login-username-input" type="text" placeholder="Username" aria-label="Username">
      <input class="form-control mr-sm-2" id="login-password-input" type="password" placeholder="Password" aria-label="Password">
      <button class="btn btn-outline-light my-2 my-sm-0" id="login-button" type="button">Login</button>
    </form>
    <?php } else { ?>
    <span class="navbar-text text-light mr-sm-3"><?php echo $_SESSION['username']?></span>
    <ul class="nav">
      <li class="nav-item" data-toggle="tooltip" data-placement="bottom" title="edit user account">
        <a class="nav-link fas fa-user-edit fa-lg px-1 mr-sm-2" id="user-edit-tab" data-toggle="pill" href="#user-edit" role="tab" aria-controls="user-edit" aria-selected="false"></a>
      </li>
      <li class="nav-item" data-toggle="tooltip" data-placement="bottom" title="delete user account">
        <a class="nav-link fas fa-user-minus fa-lg px-1 mr-sm-2" id="user-delete-tab" data-toggle="pill" href="#user-delete" role="tab" aria-controls="user-add" aria-selected="false"></a>
      </li>
    </ul>
    <form class="form-inline">
      <button class="btn btn-outline-light" id="logout-button" type="button">Logout</button>
    </form>
    <?php } ?>
  </div>
</nav>
