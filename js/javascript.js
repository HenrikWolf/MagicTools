import {MkmRequestService} from "./mkmRequestService.js";
import {UserService} from "./userService.js"
import {Util} from "./utilities.js";
// TODO: extract ajax calls to UserService

// if page is loaded
$(document).ready(function() {
  getUserData();
});

// Assures that only one element is active.
// Needed as long there are two navs.
$(".nav a").click(function(){
  $(".nav").find(".active").removeClass("active");
  $(this).parent().addClass("active");
});

// Login on click
$("#login-button").click(function(e) {
  let username = $("#login-username-input").val();
  let password = $("#login-password-input").val();
  login(username, password);
});

// Login on enter
$("#login-form").keypress(function(e) {
  if(e.which == 13) {
    let username = $("#login-username-input").val();
    let password = $("#login-password-input").val();
    login(username, password);
  }
});

// Logout
$("#logout-button").click(function(e) {
  logout();
});

// ------------------------------------------------------------------
// ------------------- start button event handler -------------------
// ------------------------------------------------------------------

$("#btn-import").click(function(e) {
  createWantlist();
});

$("#btn-user-create-check").click(function(e) {
  checkTokens("create");
});

$("#btn-user-create-save").click(function(e) {
  createUser();
});

$("#user-delete-tab").click(function(e) {
  deleteUser();
});

$("#btn-user-edit-check").click(function(e) {
  checkTokens("edit");
});

$("#btn-user-edit-save").click(function(e) {
  editUser();
});

$("#btn-get-wants").click(function(e) {
  getWants();
});


$("#btn-copy-clipboard").click(function(e) {
  let copyText = document.getElementById("export-output");
  copyText.select();
  document.execCommand("copy");
});

// -------------------------------------------------------------------
// ------------------------- start functions -------------------------
// -------------------------------------------------------------------

// create a new wantlist
function createWantlist() {

  // get listName and listItems from form
  let listName = $("#import-listname").val();
  let listItems = $("#import-input").val();

  // get all user information
  UserService.getUser()
  .then(function(result) {

    let ats = {
      app_token : jsonResult["app_token"],
      app_secret : jsonResult["app_token_secret"],
      access_token : jsonResult["access_token"],
      access_token_secret : jsonResult["access_token_secret"]
    }

    // request to mkm for creating a new wantlist
    MkmRequestService.createWantlist(ats, listName, listItems)
    .then(function (result) {
      // TODO: erfolgsmeldung in alert schreiben
      // TODO: erstelte list in dropdown aufnehmen
    })
    .catch(function (err) {
      // TODO: fehlermeldungen in alert schreiben
    });
  })
  .catch(function(err) {
    // TODO: fehlermeldungen in alert schreiben
  });
}

function editUser() {

  // get user information from form
  let ats = {
    app_token: $("#user-edit-app-token").val(),
    app_secret: $("#user-edit-app-token-secret").val(),
    access_token: $("#user-edit-access-token").val(),
    access_token_secret: $("#user-edit-access-token-secret").val()
  }

  // execute php script for updating a user
  $.ajax({
    url: "php/editUser.php",
    data: ats,
    datatype: "json",
    type: "POST",
    success: function(data) {
      console.log(data);
      let jsonResult = $.parseJSON(data);

      if(!jsonResult) {
        Util.setAlert(1, "#alert-user-edit", "No valid jsonReturn");
      }

      else if(jsonResult["err"]) {
        Util.setAlert(1, "#alert-user-edit", jsonResult["err"]);
      }

      else if(jsonResult["succ"]) {
        fillListDropdown(ats, "Fehler")
        Util.setAlert(0, "#alert-user-edit", jsonResult["succ"]);
      }
    }
  });
}

function deleteUser() {

  // execute php script for deleting a user
  $.ajax({
    url: "php/deleteUser.php",
    datatype: "json",
    type: "POST",
    success: function(data) {
      console.log(data);
      let jsonResult = $.parseJSON(data);

      if(!jsonResult) {
        console.log("No valid jsonReturn");
      }

      else if (jsonResult["err"]) {
        console.log(jsonResult["err"]);
      }

      else if(jsonResult["succ"]) {
        console.log(jsonResult["succ"]);
        logout();
      }
    }
  });
}

function createUser() {

  // get user information from form
  let user = {
    username: $("#user-create-username").val(),
    password: $("#user-create-password").val(),
    confirm_password: $("#user-create-confirm-password").val(),
    app_token: $("#user-create-app-token").val(),
    app_token_secret: $("#user-create-app-token-secret").val(),
    access_token: $("#user-create-access-token").val(),
    access_token_secret: $("#user-create-access-token-secret").val()
  }

  // execute php script for adding a user
  $.ajax({
    url: "php/createUser.php",
    data: user,
    datatype: "json",
    type: "POST",
    success: function(data) {
      console.log(data);
      let jsonResult = $.parseJSON(data);

      if(!jsonResult) {
        Util.setAlert(1, "#alert-user-create", "No valid jsonReturn");
      }

      else if(jsonResult["err"]) {
        Util.setAlert(1, "#alert-user-create", jsonResult["err"]);
      }

      else if(jsonResult["succ"]) {
        Util.setAlert(0, "#alert-user-create", jsonResult["succ"]);
        login(user["username"], user["password"]);
      }
    }
  });
}

// check if auth token are valid
function checkTokens(mod) {

  Util.addSpinner("#icon-user-"+mod);

  // get auth information of a user from a form
  let ats = {
    app_token : $("#user-"+mod+"-app-token").val(),
    app_secret : $("#user-"+mod+"-app-token-secret").val(),
    access_token : $("#user-"+mod+"-access-token").val(),
    access_token_secret : $("#user-"+mod+"-access-token-secret").val()
  }

  // request to mkm for checking auth token set
  MkmRequestService.getAccountData(ats)
  .then(function (result) {
    let username = result.account.username;
    Util.setAlert(0, "#alert-user-"+mod, "Connected to Account "+username);
    Util.removeSpinner("#icon-user-"+mod);
  })
  .catch(function (err) {
    Util.setAlert(1, "#alert-user-"+mod, err.statusText);
    Util.removeSpinner("#icon-user-"+mod);
  });
}

// fill editForm and wantlist dropdown with user informations
function getUserData() {

  // get all user information
  UserService.getUser()
  .then(function(result) {

    let ats = {
      app_token : result["app_token"],
      app_secret : result["app_token_secret"],
      access_token : result["access_token"],
      access_token_secret : result["access_token_secret"]
    }

    fillUserEditForm(ats, result["username"], null);
    fillListDropdown(ats);

  })
  .catch(function(err) {
    fillUserEditForm(null, null, err);
    fillListDropdown(null, err);
  });
}

// fill editForm with user informations
function fillUserEditForm(ats, username, error) {

  if (ats) {
    $("#p-user-edit").html("Edit user <i>"+username+"</i>");
    $("#user-edit-app-token").val(ats.app_token);
    $("#user-edit-app-token-secret").val(ats.app_secret);
    $("#user-edit-access-token").val(ats.access_token);
    $("#user-edit-access-token-secret").val(ats.access_token_secret);
  } else {
    $("#user-edit-form")[0].reset();
    Util.setAlert(1, "#alert-user-edit", error);
  }
}

// fill dropdown list with all wantlists of logged in user
function fillListDropdown(ats, error) {

  Util.addSpinner("#icon-export-get-lists");

  if (ats) {
    MkmRequestService.getWantlists(ats)
    .then(function (result) {
      $("#alert-export").hide();
      Util.resetDropdown("#export-dropdown", false, false);
      let lists = result.wantslist;
      lists.forEach(function(list) {
        Util.addOption("#export-dropdown", list.idWantslist, list.name + " (" + list.itemCount + " Wants)");
      })
      Util.removeSpinner("#icon-export-get-lists");
    })
    .catch(function (err) {
      Util.resetDropdown("#export-dropdown", true, true);
      Util.setAlert(1, "#alert-export", err.statusText);
      Util.removeSpinner("#icon-export-get-lists");
    });
  } else {
    Util.resetDropdown("#export-dropdown", true, true);
    Util.setAlert(1, "#alert-export", error);
    Util.removeSpinner("#icon-export-get-lists");
  };
}

// get all wantlists of logged in user
function getWants() {

  Util.addSpinner("#icon-export-get-wants");

  let selectedList = $("#export-dropdown").val();

  // get all user information
  UserService.getUser()
  .then(function(result) {

    let ats = {
      app_token : result["app_token"],
      app_secret : result["app_token_secret"],
      access_token : result["access_token"],
      access_token_secret : result["access_token_secret"]
    }

    // get all entriesof selected wantlist
    MkmRequestService.getWantlist(ats, selectedList)
    .then(function (result) {
      let list = result.wantslist.item;
      let txt = "";
      list.forEach(function(item) {
        //storing additional information in array
        let additionalInfo = [];

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
          for (let i = 0; i < additionalInfo.length-1; i++){txt += additionalInfo[i] + ", ";}
          txt += additionalInfo[additionalInfo.length-1] + ")";
        }
        txt += "\n";
      });
      $("#alert-export").hide();
      $("#export-output").val(txt);
      Util.removeSpinner("#icon-export-get-wants");
    })
    .catch(function (err) {
      Util.setAlert(1, "#alert-export", err.statusText);
      Util.removeSpinner("#icon-export-get-wants");
    });

  })
  .catch(function(err) {
    Util.setAlert(1, "#alert-export", err);
    Util.removeSpinner("#icon-export-get-wants");
  });
}

// login a user
function login(username, password) {

  UserService.login(username, password)
  .then(function (result) {
    window.location.reload();
    console.log(result["succ"]);
  })
  .catch(function (err) {
    console.log("Fehler: "+err);
  });
}

// logout a user
function logout() {

  UserService.logout()
  .then(function (result) {
    window.location.reload();
    console.log(result["succ"]);
  })
  .catch(function (err) {
    console.log("Fehler: "+err);
  });
}
