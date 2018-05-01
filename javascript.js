import {RequestService} from "./requestService.js"

$(function() {
  $("#btn-search").click(function(e) {
     userAction();
  });
});

function userAction() {

  let rs = new RequestService();

  rs.getAccountData()
  .then(function (result) {
    // TODO: write result in textarea
    console.log(result);
  })
  .catch(function (err) {
    // TODO: write error
    console.error('Augh, there was an error!', err.status, err.statusText);
  });
}
