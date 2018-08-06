
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
      <li class="nav-item" data-toggle="tooltip" data-placement="bottom" title="FAQ">
        <a class="nav-link" id="faq-tab" data-toggle="pill" href="#faq" role="tab" aria-controls="faq" aria-selected="false"><i class="fas fa-question fa-lg"></i></a>
        <!--<a class="nav-link far fa-question-circle fa-lg px-1" id="faq-tab" data-toggle="pill" href="#faq" role="tab" aria-controls="faq" aria-selected="false"></a>-->
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
        <a class="nav-link fas fa-user-minus fa-lg px-1 mr-sm-2" id="user-delete-tab" data-toggle="modal" data-target="#user-delete-modal" href="#user-delete" role="tab" aria-controls="user-add" aria-selected="false"></a>
      </li>
    </ul>
    <form class="form-inline">
      <button class="btn btn-outline-light" id="logout-button" type="button">Logout</button>
    </form>
    <?php } ?>
  </div>
</nav>

<!-- Collapsable alert for login  -->
<div class="collapse" id="alert-collapse-login">
  <div id="alert-login" class="alert alert-danger alert-dismissible fade show" role="alert">
  </div>
</div>

<!-- Modal for user-delete -->
<div class="modal fade" id="user-delete-modal" tabindex="-1" role="dialog" aria-labelledby="user-delete-modal-label" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="user-delete-modal-label">Delete Account</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        Are you sure you want to delete your account?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
        <button id="user-delete-submit" type="button" class="btn btn-dark">Delete</button>
      </div>
    </div>
  </div>
</div>
