
<!-- Begin User-Create -->
<div class="tab-pane fade" id="user-create" role="tabpanel" aria-labelledby="user-create-tab">
  <h3>Create an account</h3>
  <p class="lead">Please fill this form to create an account.</p>

  <form class="mt-md-4">

    <!-- Beginn Input username and password -->
    <div class="form-group">
      <label for="user-create-username">Username</label>
      <input id="user-create-username" type="text" class="form-control" placeholder="Username">
    </div>
    <div class="form-group">
      <label for="user-create-password">Password</label>
      <input id="user-create-password" type="password" class="form-control" placeholder="Password">
    </div>
    <div class="form-group">
      <label for="user-create-confirm-password">Confirm Password</label>
      <input id="user-create-confirm-password" type="password" class="form-control" placeholder="Confirm Password">
    </div>

    <!-- Beginn Input auth token set -->
    <div class="form-group">
      <label for="user-create-app-token">App Token</label>
      <input id="user-create-app-token" typ="text" class="form-control" placeholder="App Token">
    </div>
    <div class="form-group">
      <label for="user-create-app-token-secret">App Token Secret</label>
      <input id="user-create-app-token-secret" typ="text" class="form-control" placeholder="App Token Secret">
    </div>
    <div class="form-group">
      <label for="user-create-access-token">Access Token</label>
      <input id="user-create-access-token" typ="text" class="form-control" placeholder="Access Token">
    </div>
    <div class="form-group">
      <label for="user-create-access-token-secret">Access Token Secret</label>
      <input id="user-create-access-token-secret" typ="text" class="form-control" placeholder="Access Token Secret">
    </div>

    <!-- Beginn buttons and alert -->
    <div class="form-group row">
      <div class="col-md-3">
        <button type="button" class="btn btn-secondary btn-block" id="btn-user-create-check">Check Tokens</button>
      </div>
      <div class="col-md-2">
        <button type="button" class="btn btn-secondary btn-block" id="btn-user-create-save">Save</button>
      </div>
      <div class="col-md-auto ml-auto">
        <div class="alert alert-success" role="alert" style="display:none;" id="alert-user-create"></div>
      </div>
    </div>

  </form>

</div>
