import {RequestService} from "./requestService.js"
import prop from "./properties.js";

$("#btn-check-tokens").click(function(e) {
  // TODO: show loading spinner
  console.log("loading...");
  checkTokens();
});

$("#btn-get-lists").click(function(e) {
  // TODO: show loading spinner
  console.log("loading...");
  getWantlists();
});

$("#btn-get-wants").click(function(e) {
  // TODO: show loading spinner
  console.log("loading...");
  getWantlist();
});

// set Finns tokens as default to input fields (temporary)
$("#input-app-token").val(prop.app_token);
$("#input-app-token-secret").val(prop.app_secret);
$("#input-access-token").val(prop.access_token);
$("#input-access-token-secret").val(prop.access_token_secret);

function checkTokens() {

  let auth_token_set = readAuthTokenSet();

  RequestService.getAccountData(auth_token_set)
  .then(function (result) {
    let username = result.account.username;
    $("#alert-check-tokens").removeClass("alert-danger").addClass("alert-success");
    $("#alert-check-tokens").html("Connected to Account <strong>"+username+"</strong>").show();
    console.log(result.account);
    // TODO: hide loading spinner
  })
  .catch(function (err) {
    $("#alert-check-tokens").removeClass("alert-success").addClass("alert-danger");
    $("#alert-check-tokens").html("Fehler: <strong>"+err.statusText+"</strong>").show();
    console.error('Augh, there was an error!', err.status, err.statusText);
    // TODO: hide loading spinner
  });
}

function getWantlists() {

  let auth_token_set = readAuthTokenSet();

  RequestService.getWantlists(auth_token_set)
  .then(function (result) {
    $("#alert-export").hide();
    $("#export-dropdown").empty();
    $("#export-dropdown").prop("disabled", false);
    let lists = result.wantslist;
    lists.forEach(function(list) {
      let option = $('<option />').val(list.idWantslist).html(list.name + " (" + list.itemCount + " Wants)");
      $("#export-dropdown").append(option);
    })
    console.log(lists);
    // TODO: hide loading spinner
  })
  .catch(function (err) {
    $("#alert-export").html("Fehler: <strong>"+err.statusText+"</strong>").show();
    console.error('Augh, there was an error!', err.status, err.statusText);
    // TODO: hide loading spinner
  });
}

function getWantlist() {

  let auth_token_set = readAuthTokenSet();
  let listId = $("#export-dropdown").val();

  RequestService.getWantlist(listId, auth_token_set)
  .then(function (result) {
    $("#alert-export").hide();
    let list = result.wantslist.item;
    let txt = "";
    list.forEach(function(item) {
      if (item.metaproduct) {
        txt += item.metaproduct.enName + "\n";
      } else {
        txt += item.product.enName + "\n";
      }
    })
    $("#export-output").val(txt);
    console.log(list);
    // TODO: hide loading spinner
  })
  .catch(function (err) {
    $("#alert-export").html("Fehler: <strong>"+err.statusText+"</strong>").show();
    console.error('Augh, there was an error!', err.status, err.statusText);
    // TODO: hide loading spinner
  });
}

// read tokens from input fields
function readAuthTokenSet() {
  return {
    app_token : $("#input-app-token").val(),
    app_secret : $("#input-app-token-secret").val(),
    access_token : $("#input-access-token").val(),
    access_token_secret : $("#input-access-token-secret").val(),
  };
}
