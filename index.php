<!DOCTYPE html>
<html>

<head>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <!-- import stylesheets -->
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.12/css/all.css" integrity="sha384-G0fIWCsCzJIMAVNQPfjH08cyYaUtMwjJwqiRKxxE/rx96Uroj1BtIQ6MLJuheaO9" crossorigin="anonymous">
  <link rel="stylesheet" type="text/css" href="custom.css">

  <!-- import icon lib -->
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossorigin="anonymous">

  <!-- import bootstrap and jquery -->
  <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>

  <!-- import cryptJS -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.min.js"></script>

  <!-- in order to use modules/es6 you have to set type="module" -->
  <!-- Firefox: dom.moduleScripts.enabled false to true -->
  <script type="module" src="javascript.js"></script>

</head>

<body>

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
      <form class="form-inline my-2 my-lg-0 mx-1">
        <select class="form-control" id="select-user"></select>
      </form>
      <ul class="nav">
        <li class="nav-item">
          <a class="nav-link fas fa-user-edit fa-lg px-1" style="color:white" id="user-edit-tab" data-toggle="pill" href="#user-edit" role="tab" aria-controls="user-edit" aria-selected="false"></a>
        </li>
        <li class="nav-item">
          <a class="nav-link fas fa-user-plus fa-lg px-1" style="color:white" id="user-create-tab" data-toggle="pill" href="#user-create" role="tab" aria-controls="user-create" aria-selected="false"></a>
        </li>
        <li class="nav-item">
          <a class="nav-link fas fa-user-minus fa-lg px-1" style="color:white" id="user-delete-tab" data-toggle="pill" href="#user-delete" role="tab" aria-controls="user-add" aria-selected="false"></a>
        </li>
      </ul>
    </div>
  </nav>

  <!-- Begin Content -->
  <div class="container.fluid">
  <div class="row justify-content-md-center">

    <!-- Begin Apps -->
    <div class="col-lg-6 px-5 py-3">
      <div class="tab-content">

        <!-- Begin Export -->
        <div class="tab-pane fade show active" id="export" role="tabpanel" aria-labelledby="export-tab">
          <h3>Export Wantlist</h3>
          <div class="row">
            <div class="col-md-6"></div>
            <div class="col-md-3">
              <button type="button" class="btn btn-secondary btn-block" id="btn-get-lists">Get Lists</button>
            </div>
            <div class="col-md-3 center-parent-regular">
              <i id="icon-export-get-lists" class="fas fa-lg center-child-regular"></i>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <label for="export-dropdown"></label>
              <select id="export-dropdown" class="form-control" disabled>
                <option value="null" selected>Choose Wantlist</option>
              </select>
            </div>
            <div class="col-md-3 pt-4">
              <button type="button" class="btn btn-secondary btn-block" id="btn-get-wants">Get Wants</button>
            </div>
            <div class="col-md-3 center-parent-dropdown">
              <i id="icon-export-get-wants" class="fas fa-lg center-child-dropdown"></i>
            </div>
          </div>
          <div class="row">
            <div class="col-md">
              <form>
                <div class="form-group">
                  <label for="export-output"></label>
                  <textarea class="form-control" id="export-output" rows="10" readonly></textarea>
                </div>
              </form>
            </div>
          </div>
          <div class="row">
            <div class="col-md" align="left">
              <div class="alert alert-danger alert-trim" role="alert" style="display:none;" id="alert-export"></div>
            </div>
            <div class="col-md-2" align="right">
              <button type="button" class="btn btn-secondary btn-block" id="btn-copy-clipboard">Copy</button>
            </div>
          </div>
        </div>

        <!-- Begin Import -->
        <div class="tab-pane fade" id="import" role="tabpanel" aria-labelledby="import-tab">
          <h3>Import Wantlist</h3>
          coming soon...
        </div>

        <!-- Begin "Was anderes" -->
        <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
          <h3>Irgendwas anderes</h3>
          coming not so soon...
        </div>

        <!-- Begin User-Edit -->
        <div class="tab-pane fade" id="user-edit" role="tabpanel" aria-labelledby="user-edit-tab">
          <h3>Authentifizierung</h3>
          <p class="lead" id="p-user-edit"><p>
          <div class="row">
            <div class="col-md">
              <form>
                <div class="form-group">
                  <label for="user-edit-app-token">App Token</label>
                  <input id="user-edit-app-token" typ="text" class="form-control" aria-describedby="help-access-token" placeholder="App Token">
                </div>
                <div class="form-group">
                  <label for="user-edit-app-token-secret">App Token Secret</label>
                  <input id="user-edit-app-token-secret" typ="text" class="form-control" aria-describedby="help-access-token" placeholder="App Token Secret">
                </div>
                <div class="form-group">
                  <label for="user-edit-access-token">Access Token</label>
                  <input id="user-edit-access-token" typ="text" class="form-control" aria-describedby="help-access-token" placeholder="Access Token">
                </div>
                <div class="form-group">
                  <label for="user-edit-access-token-secret">Access Token Secret</label>
                  <input id="user-edit-access-token-secret" typ="text" class="form-control" aria-describedby="help-access-token" placeholder="Access Token Secret">
                </div>
              </form>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-md-3">
              <button type="button" class="btn btn-secondary btn-block" id="btn-user-edit-check">Check Tokens</button>
            </div>
            <div class="col-md-2">
              <button type="button" class="btn btn-secondary btn-block" id="btn-user-edit-save">Save</button>
            </div>
            <div class="col-md-1 center-parent-regular">
              <i id="icon-user-edit" class="fas fa-lg center-child-regular"></i>
            </div>
            <div class="col-md-6" align="right">
              <div class="alert alert-success alert-trim" role="alert" style="display:none;" id="alert-user-edit"></div>
            </div>
          </div>
        </div>

        <!-- Begin User-Create -->
        <div class="tab-pane fade" id="user-create" role="tabpanel" aria-labelledby="user-edit-tab">
          <h3>Authentifizierung</h3>
          <p class="lead">Please fill this form to create an account.</p>
          <div class="row">
            <div class="col-md">
              <form>
                <div class="form-group">
                  <label for="user-create-username">Username</label>
                  <input id="user-create-username" type="text" class="form-control" aria-describedby="help-username" placeholder="Username">
                </div>
                <div class="form-group">
                  <label for="user-create-password">Password</label>
                  <input id="user-create-password" type="password" class="form-control" aria-describedby="help-password" placeholder="Password">
                </div>
                <div class="form-group">
                  <label for="user-create-confirm-password">Confirm Password</label>
                  <input id="user-create-confirm-password" type="password" class="form-control" aria-describedby="help-confirm-password" placeholder="Confirm Password">
                </div>
                <div class="form-group">
                  <label for="user-create-app-token">App Token</label>
                  <input id="user-create-app-token" typ="text" class="form-control" aria-describedby="help-access-token" placeholder="App Token">
                </div>
                <div class="form-group">
                  <label for="user-create-app-token-secret">App Token Secret</label>
                  <input id="user-create-app-token-secret" typ="text" class="form-control" aria-describedby="help-access-token" placeholder="App Token Secret">
                </div>
                <div class="form-group">
                  <label for="user-create-access-token">Access Token</label>
                  <input id="user-create-access-token" typ="text" class="form-control" aria-describedby="help-access-token" placeholder="Access Token">
                </div>
                <div class="form-group">
                  <label for="user-create-access-token-secret">Access Token Secret</label>
                  <input id="user-create-access-token-secret" typ="text" class="form-control" aria-describedby="help-access-token" placeholder="Access Token Secret">
                </div>
              </form>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-md-3">
              <button type="button" class="btn btn-secondary btn-block" id="btn-user-create-check">Check Tokens</button>
            </div>
            <div class="col-md-2">
              <button type="button" class="btn btn-secondary btn-block" id="btn-user-create-save">Save</button>
            </div>
            <div class="col-md-1 center-parent-regular">
              <i id="icon-user-create" class="fas fa-lg center-child-regular"></i>
            </div>
            <div class="col-md-6" align="right">
              <div class="alert alert-success alert-trim" role="alert" style="display:none;" id="alert-user-create"></div>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
  </div>

</body>

</html>