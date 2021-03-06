
<!-- Begin Export -->
<div class="tab-pane fade show active" id="export" role="tabpanel" aria-labelledby="export-tab">
  <h3>Export Wantlist</h3>

  <form class="mt-md-4">

    <!-- Beginn Selection for List and Button -->
    <div class="form-group row">
      <div class="col-md-6">
        <select id="export-dropdown" class="form-control" disabled>
          <option value="null" selected>Choose Wantlist</option>
        </select>
      </div>
      <div class="col-md-3">
        <button type="button" class="btn btn-secondary btn-block" id="btn-get-wants" data-loading-text="Loading">Get Wants</button>
      </div>
    </div>

    <!-- Beginn Output Wants -->
    <div class="form-group">
      <textarea class="form-control" id="export-output" rows="12" readonly></textarea>
    </div>

    <!-- Beginn Button and Alert -->
    <div class="form-group row">
      <div class="col-md-auto mr-auto">
        <div class="alert alert-danger" role="alert" style="display:none;" id="alert-export"></div>
      </div>
      <div class="col-md-2">
        <button type="button" class="btn btn-secondary btn-block" id="btn-copy-clipboard">Copy</button>
      </div>
    </div>

  </form>

</div>
