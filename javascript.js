import {RequestService} from "./requestService.js"
import prop from "./properties.js";

$(document).ready(function() {
  fillSelectUserDropdown();
});

$(".nav a").click(function(){
  $(".nav").find(".active").removeClass("active");
  $(this).parent().addClass("active");
});

$("#btn-user-edit-check").click(function(e) {
  $("#icon-user-edit").addClass("fa-spinner fa-spin");
  console.log("loading...");
  checkTokens("edit");
});

$("#btn-user-create-check").click(function(e) {
  $("#icon-user-create").addClass("fa-spinner fa-spin");
  console.log("loading...");
  checkTokens("create");
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

$("#user-edit-tab").click(function(e) {
  fillUserEditForm();
});

$("#user-create-tab").click(function(e) {
  $("#p-user-create").html("Create new User");
});

$("#select-user").change(function(e) {
  fillUserEditForm();
  $("#alert-user-edit").hide();
});

$("#btn-copy-clipboard").click(function(e) {
  var copyText = document.getElementById("export-output");
  copyText.select();
  document.execCommand("copy");
});

$("#btn-user-edit-save").click(function(e) {
  $("#alert-user-edit").removeClass("alert-success").addClass("alert-danger");
  $("#alert-user-edit").html("Fehler: <strong>Keine Funktionalität implementiert</strong>").show();
});

$("#btn-user-create-save").click(function(e) {
  $("#alert-user-create").removeClass("alert-success").addClass("alert-danger");
  $("#alert-user-create").html("Fehler: <strong>Keine Funktionalität implementiert</strong>").show();
});

function fillSelectUserDropdown() {
  let ats = prop.auth_token_sets;
  if(ats) {
    for (var set in ats) {
      let option = $('<option />').val(set).html(set);
      $("#select-user").append(option);
    }
    $("#select-user").append("<option value='test'>test</option>");
  }
}

function fillUserEditForm() {
  let user = $("#select-user").find(":selected").text();
  $("#p-user-edit").html("Edit user <i>"+user+"</i>");
  let ats = eval("prop.auth_token_sets."+user);
  if (ats) {
    $("#user-edit-app-token").val(ats.app_token);
    $("#user-edit-app-token-secret").val(ats.app_secret);
    $("#user-edit-access-token").val(ats.access_token);
    $("#user-edit-access-token-secret").val(ats.access_token_secret);
  } else {
    $("#user-edit-app-token").val("");
    $("#user-edit-app-token-secret").val("");
    $("#user-edit-access-token").val("");
    $("#user-edit-access-token-secret").val("");
  }
}

function checkTokens(mod) {

  let auth_token_set = {
    app_token : $("#user-"+mod+"-app-token").val(),
    app_secret : $("#user-"+mod+"-app-token-secret").val(),
    access_token : $("#user-"+mod+"-access-token").val(),
    access_token_secret : $("#user-"+mod+"-access-token-secret").val()
  }

  RequestService.getAccountData(auth_token_set)
  .then(function (result) {
    let username = result.account.username;
    $("#alert-user-"+mod+"").removeClass("alert-danger").addClass("alert-success");
    $("#alert-user-"+mod+"").html("Connected to Account <strong>"+username+"</strong>").show();
    console.log(result.account);
    $("#icon-user-"+mod+"").removeClass("fa-spinner fa-spin");
  })
  .catch(function (err) {
    $("#alert-user-"+mod+"").removeClass("alert-success").addClass("alert-danger");
    $("#alert-user-"+mod+"").html("Fehler: <strong>"+err.statusText+"</strong>").show();
    console.error('Augh, there was an error!', err.status, err.statusText);
    $("#icon-user-"+mod+"").removeClass("fa-spinner fa-spin");
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
  let user = $("#select-user").find(":selected").text();
  let ats = eval("prop.auth_token_sets."+user);
  return ats;
}
