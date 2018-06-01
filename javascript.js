import {RequestService} from "./requestService.js"
import prop from "./properties.js";

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

function getWantlist() {

  let auth_token_set = readAuthTokenSet();
  let listId = $("#export-dropdown").val();

  // check if a valid wantlist is selected
  if (listId=="null" || listId==null) {
    $("#alert-export").html("Please select a valid Wantlist").show();
    console.log("No valid wantlist selected.");
    $("#icon-export-get-wants").removeClass("fa-spinner fa-spin");
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

// read tokens from input fields
function readAuthTokenSet() {
  return {
    app_token : $("#input-app-token").val(),
    app_secret : $("#input-app-token-secret").val(),
    access_token : $("#input-access-token").val(),
    access_token_secret : $("#input-access-token-secret").val(),
  };
}
