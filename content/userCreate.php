
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
