import {RequestService} from "./requestService.js"
import {AuthTokenSet} from "./properties.js";

$(function() {
  // TODO: rename id of the button
  $("#btn-search").click(function(e) {
    // TODO: show loading spinner
     console.log("loading...");
     checkTokens();
  });
});

// set Finns tokens as default to input fields (temporary)
$("#input-app-token").val(AuthTokenSet.app_token);
$("#input-app-token-secret").val(AuthTokenSet.app_secret);
$("#input-access-token").val(AuthTokenSet.access_token);
$("#input-access-token-secret").val(AuthTokenSet.access_token_secret);

function checkTokens() {

  // read tokens from input fields
  var auth_token_set = {
    app_token : $("#input-app-token").val(),
    app_secret : $("#input-app-token-secret").val(),
    access_token : $("#input-access-token").val(),
    access_token_secret : $("#input-access-token-secret").val(),
  };

  let rs = new RequestService();

  rs.getAccountData(auth_token_set)
  .then(function (result) {
    let username = result.account.username;
    // TODO: use id instead of class
    $(".alert").text("Success: Connected to Account "+username);
    console.log(result.account);
  })
  .catch(function (err) {
    // TODO: write error as alert
    console.error('Augh, there was an error!', err.status, err.statusText);
  });
}
