import {RequestService} from "./requestService.js"
import {prop} from "./properties.js";

// TODO: remove wrapper function
$(function() {
  // TODO: rename id of the button
  $("#btn-search").click(function(e) {
    // TODO: show loading spinner
     console.log("loading...");
     checkTokens();
     getWantlists();
  });
});

$("#btn-confirm").click(function(e) {
  // TODO: show loading spinner
   console.log("loading...");
   getWantlist();
});

// TODO: add own click event for getWantlists()

// set Finns tokens as default to input fields (temporary)
$("#input-app-token").val(prop.app_token);
$("#input-app-token-secret").val(prop.app_secret);
$("#input-access-token").val(prop.access_token);
$("#input-access-token-secret").val(prop.access_token_secret);

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

function getWantlists() {

  // read tokens from input fields
  var auth_token_set = {
    app_token : $("#input-app-token").val(),
    app_secret : $("#input-app-token-secret").val(),
    access_token : $("#input-access-token").val(),
    access_token_secret : $("#input-access-token-secret").val(),
  };

  let rs = new RequestService();

  rs.getWantlists(auth_token_set)
  .then(function (result) {
    $("#export-dropdown").empty();
    $("#export-dropdown").prop("disabled", false);
    let lists = result.wantslist;
    lists.forEach(function(list) {
      let option = $('<option />').val(list.idWantslist).html(list.name + " (" + list.itemCount + " Wants)");
      $("#export-dropdown").append(option);
    })
    console.log(lists);
  })
  .catch(function (err) {
    // TODO: write error as alert
    console.error('Augh, there was an error!', err.status, err.statusText);
  });
}

function getWantlist() {

  // read tokens from input fields
  var auth_token_set = {
    app_token : $("#input-app-token").val(),
    app_secret : $("#input-app-token-secret").val(),
    access_token : $("#input-access-token").val(),
    access_token_secret : $("#input-access-token-secret").val(),
  };

  var listId = $("#export-dropdown").val();

  let rs = new RequestService();

  rs.getWantlist(listId, auth_token_set)
  .then(function (result) {
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
  })
  .catch(function (err) {
    // TODO: write error as alert
    console.error('Augh, there was an error!', err.status, err.statusText);
  });
}
