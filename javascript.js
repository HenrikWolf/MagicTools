import {RequestService} from "./requestService.js"
import prop from "./properties.js";

$(document).ready(function() {
  fillSelectUserDropdown();
});

$(".nav a").on("click", function(){
  $(".nav").find(".active").removeClass("active");
  $(this).parent().addClass("active");
});

$("#btn-check-tokens").click(function(e) {
  $("#icon-check-tokens").addClass("fa-spinner fa-spin");
  console.log("loading...");
  checkTokens();
});

$("#btn-get-lists").click(function(e) {
  $("#icon-export-get-lists").addClass("fa-spinner fa-spin");
  console.log("loading...");
  getWantlists();
});

$("#btn-get-wants").click(function(e) {
  $("#icon-export-get-wants").addClass("fa-spinner fa-spin");
  console.log("loading...");
  getWantlist();
});

$("#btn-copy-clipboard").click(function(e) {
  var copyText = document.getElementById("export-output");
  copyText.select();
  document.execCommand("copy");
});

function fillSelectUserDropdown() {
  let ats = prop.auth_token_sets;
  if(ats) {
    for (var set in ats) {
      let option = $('<option />').val(set).html(set);
      $("#selectUser").append(option);
    }
    $("#selectUser").append("<option value='test'>test</option>");
  }
}

// set Finns tokens as default to input fields (temporary)
// var ats = prop.auth_token_sets.henrik;
// $("#input-app-token").val(ats.app_token);
// $("#input-app-token-secret").val(ats.app_secret);
// $("#input-access-token").val(ats.access_token);
// $("#input-access-token-secret").val(ats.access_token_secret);

function checkTokens() {

  let auth_token_set = readAuthTokenSet();

  RequestService.getAccountData(auth_token_set)
  .then(function (result) {
    let username = result.account.username;
    $("#alert-check-tokens").removeClass("alert-danger").addClass("alert-success");
    $("#alert-check-tokens").html("Connected to Account <strong>"+username+"</strong>").show();
    console.log(result.account);
    $("#icon-check-tokens").removeClass("fa-spinner fa-spin");
  })
  .catch(function (err) {
    $("#alert-check-tokens").removeClass("alert-success").addClass("alert-danger");
    $("#alert-check-tokens").html("Fehler: <strong>"+err.statusText+"</strong>").show();
    console.error('Augh, there was an error!', err.status, err.statusText);
    $("#icon-check-tokens").removeClass("fa-spinner fa-spin");
  });
}

function getWantlists() {

  let auth_token_set = readAuthTokenSet();

  // check if a valid auth_token_set is found
  if (auth_token_set==null) {
    $("#alert-export").html("Fehler: <strong>No valid auth_token_set found</strong>").show();
    console.log("No valid auth_token_set found");
    $("#icon-export-get-lists").removeClass("fa-spinner fa-spin");
    $("#export-dropdown").empty();
    $("#export-dropdown").prop("disabled", true);
    $("#export-dropdown").append("<option value='null' selected>Choose Wantlist</option>");
  } else {

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
      $("#icon-export-get-lists").removeClass("fa-spinner fa-spin");
    })
    .catch(function (err) {
      $("#alert-export").html("Fehler: <strong>"+err.statusText+"</strong>").show();
      console.error('Augh, there was an error!', err.status, err.statusText);
      $("#icon-export-get-lists").removeClass("fa-spinner fa-spin");
    });
  }
}

function getWantlist() {

  let auth_token_set = readAuthTokenSet();
  let listId = $("#export-dropdown").val();

  // check if a valid wantlist is selected
  if (listId=="null" || listId==null) {
    $("#alert-export").html("Please select a valid Wantlist").show();
    console.log("No valid wantlist selected.");
    $("#icon-export-get-wants").removeClass("fa-spinner fa-spin");
  }
  // check if a valid auth_token_set is found
  else if (auth_token_set==null) {
    $("#alert-export").html("Fehler: <strong>No valid auth_token_set found</strong>").show();
    console.log("No valid auth_token_set found");
    $("#icon-export-get-wants").removeClass("fa-spinner fa-spin");
    $("#export-dropdown").empty();
    $("#export-dropdown").prop("disabled", true);
    $("#export-dropdown").append("<option value='null' selected>Choose Wantlist</option>");
  } else {

    RequestService.getWantlist(listId, auth_token_set)
    .then(function (result) {
      $("#alert-export").hide();
      let list = result.wantslist.item;
      let txt = "";
      list.forEach(function(item) {
        //storing additional information in array
        var additionalInfo = [];

        txt += item.count + "x ";
        if (item.metaproduct) {
          txt += item.metaproduct.enName;
        } else {
          txt += item.product.enName;
          additionalInfo.push(item.product.expansionName);
        }
        if (item.isFoil == true){additionalInfo.push("Foil")}

        //appending the addional info to txt
        if (additionalInfo.length>0){
          txt += " (";
          for (var i = 0; i < additionalInfo.length-1; i++){txt += additionalInfo[i] + ", ";}
          txt += additionalInfo[additionalInfo.length-1] + ")";
        }
        txt += "\n";
      })
      $("#export-output").val(txt);
      console.log(list);
      $("#icon-export-get-wants").removeClass("fa-spinner fa-spin");
    })
    .catch(function (err) {
      $("#alert-export").html("Fehler: <strong>"+err.statusText+"</strong>").show();
      console.error('Augh, there was an error!', err.status, err.statusText);
      $("#icon-export-get-wants").removeClass("fa-spinner fa-spin");
    });

  }
}

// read tokens from properties
function readAuthTokenSet() {
  let user = $("#selectUser").find(":selected").text();
  console.log(user + " selected");
  let ats = null;
  if (user=="henrik") {
    ats = prop.auth_token_sets.henrik;
  };
  if (user=="finn") {
    ats = prop.auth_token_sets.finn;
  };
  return ats;
}
