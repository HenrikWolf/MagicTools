
<!-- Begin Import -->
<div class="tab-pane fade" id="import" role="tabpanel" aria-labelledby="import-tab">
  <h3>Import Wantlist</h3>

  <form class="mt-md-4">

    <!-- Beginn Input Listname -->
    <div class="form-group row">
      <label for="import-listname" class="col-md-2 col-form-label">Listname</label>
      <div class="col-md-10">
        <input id="import-listname" typ="text" class="form-control" placeholder="Listname">
      </div>
    </div>

    <!-- Beginn Input Wants -->
    <div class="form-group">
      <label for="import-input">Wants</label>
      <textarea id="import-input" class="form-control" rows="12"></textarea>
    </div>

    <!-- Beginn Button and Alert -->
    <div class="form-group row">
      <div class="col-md-3">
        <button type="button" class="btn btn-secondary btn-block" id="btn-import">Create List</button>
      </div>
      <div class="col-md-8" align="right">
        <div class="alert alert-success alert-trim" role="alert" style="display:none;" id="alert-import"></div>
      </div>
    </div>

  </form>

</div>
