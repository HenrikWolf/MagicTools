
<!-- Begin User-Edit -->
<div class="tab-pane fade" id="user-edit" role="tabpanel" aria-labelledby="user-edit-tab">
  <h3>Edit your account</h3>
  <p class="lead" id="p-user-edit"></p>

  <form class="mt-md-4" id="user-edit-form">

    <!-- Beginn Input auth token set -->
    <div class="form-group">
      <label for="user-edit-app-token">App Token</label>
      <input id="user-edit-app-token" typ="text" class="form-control" placeholder="App Token">
    </div>
    <div class="form-group">
      <label for="user-edit-app-token-secret">App Token Secret</label>
      <input id="user-edit-app-token-secret" typ="text" class="form-control" placeholder="App Token Secret">
    </div>
    <div class="form-group">
      <label for="user-edit-access-token">Access Token</label>
      <input id="user-edit-access-token" typ="text" class="form-control" placeholder="Access Token">
    </div>
    <div class="form-group">
      <label for="user-edit-access-token-secret">Access Token Secret</label>
      <input id="user-edit-access-token-secret" typ="text" class="form-control" placeholder="Access Token Secret">
    </div>

    <!-- Beginn buttons and alert -->
    <div class="form-group row">
      <div class="col-md-3">
        <button type="button" class="btn btn-secondary btn-block" id="btn-user-edit-check">Check Tokens</button>
      </div>
      <div class="col-md-2">
        <button type="button" class="btn btn-secondary btn-block" id="btn-user-edit-save">Save</button>
      </div>
      <div class="col-md-auto ml-auto">
        <div class="alert alert-success" role="alert" style="display:none;" id="alert-user-edit"></div>
      </div>
    </div>

  </form>

</div>
