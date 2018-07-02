
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
