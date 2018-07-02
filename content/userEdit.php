
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
