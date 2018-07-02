import {RequestService} from "./requestService.js"
// TODO: import js moduls for each part of the application
// TODO: add utilities as a service

// if page is loaded, fill selectUserDropdown
$(document).ready(function() {
  fillSelectUserDropdown();
});

// Assures that only one element is active.
// Needed as long there are two navs.
$(".nav a").click(function(){
  $(".nav").find(".active").removeClass("active");
  $(this).parent().addClass("active");
});

// If selected user in dropDown is changed, update forms
$("#select-user").change(function(e) {
  fillUserEditForm();
  resetDropdown("#export-dropdown", true, true);
  $("#alert-user-edit").hide();
});

// Login
$("#login-button").click(function(e) {
  login();
});

// Logout
$("#logout-button").click(function(e) {
  logout();
});

// ------------------------------------------------------------------
// ------------------- start button event handler -------------------
// ------------------------------------------------------------------

$("#btn-user-create-check").click(function(e) {
  addSpinner("#icon-user-create");
  checkTokens("create");
});

$("#btn-user-create-save").click(function(e) {
  createUser();
});

$("#user-delete-tab").click(function(e) {
  deleteUser();
});

$("#btn-user-edit-check").click(function(e) {
  addSpinner("#icon-user-edit");
  checkTokens("edit");
});

$("#btn-user-edit-save").click(function(e) {
  editUser();
});

$("#btn-get-lists").click(function(e) {
  addSpinner("#icon-export-get-lists");
  getLists();
});

$("#btn-get-wants").click(function(e) {
  addSpinner("#icon-export-get-wants");
  getList();
});


$("#btn-copy-clipboard").click(function(e) {
  let copyText = document.getElementById("export-output");
  copyText.select();
  document.execCommand("copy");
});

// -------------------------------------------------------------------
// ------------------------- start functions -------------------------
// -------------------------------------------------------------------

function editUser() {

  // get username
  let selectedUser = $("#select-user").find(":selected").text();

  // execute php script for updating a user
  $.ajax({
    url: "php/editUser.php",
    data: {
      username: selectedUser,
      app_token: $("#user-edit-app-token").val(),
      app_token_secret: $("#user-edit-app-token-secret").val(),
      access_token: $("#user-edit-access-token").val(),
      access_token_secret: $("#user-edit-access-token-secret").val()
    },
    datatype: "json",
    type: "POST",
    success: function(data) {
      console.log(data);
      let jsonResult = $.parseJSON(data);

      if(!jsonResult) {
        setAlert(1, "#alert-user-edit", "No valid jsonReturn");
      }

      else if(jsonResult["err"]) {
        setAlert(1, "#alert-user-edit", jsonResult["err"]);
      }

      else if(jsonResult["succ"]) {
        setAlert(0, "#alert-user-edit", jsonResult["succ"]);
      }
    }
  });
}

function fillSelectUserDropdown() {

  // execute php script for getting a list of users
  $.ajax({
    url: "php/getUserList.php",
    datatype: "json",
    type: "POST",
    success: function(data) {
      console.log(data);
      let jsonResult = $.parseJSON(data);

      if(!jsonResult) {
        console.log("No valid jsonReturn");
      }

      else if(jsonResult["err"]) {
        console.log(jsonResult["err"]);
      }

      else {
        for (let user in jsonResult) {
          let username = jsonResult[user]["username"];
          addOption("#select-user", username, username);
        }
        fillUserEditForm();
      }
    }
  });
}

function deleteUser() {

  // get username
  let selectedUser = $("#select-user").find(":selected").text();

  // execute php script for deleting a user
  $.ajax({
    url: "php/deleteUser.php",
    data: {
      username: selectedUser
    },
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
        $("#select-user").find(":selected").remove();
        fillUserEditForm();
        console.log(jsonResult["succ"]);
      }
    }
  });
}

function fillUserEditForm() {

  // get username
  let selectedUser = $("#select-user").find(":selected").text();

  // set label to the beginning of the form
  $("#p-user-edit").html("Edit user <i>"+selectedUser+"</i>");

  // execute php script for getting a user
  $.ajax({
    url: "php/getUser.php",
    data: {
      username: selectedUser
    },
    datatype: "json",
    type: "POST",
    success: function(data) {
      console.log(data);
      let jsonResult = $.parseJSON(data);

      if(!jsonResult) {
        $("#user-edit-app-token").val("");
        $("#user-edit-app-token-secret").val("");
        $("#user-edit-access-token").val("");
        $("#user-edit-access-token-secret").val("");
        setAlert(1, "#alert-user-edit", "No valid jsonReturn");
      }

      else if (jsonResult["err"]) {
        $("#user-edit-app-token").val("");
        $("#user-edit-app-token-secret").val("");
        $("#user-edit-access-token").val("");
        $("#user-edit-access-token-secret").val("");
        setAlert(1, "#alert-user-edit", jsonResult["err"]);
      }

      else {
        $("#user-edit-app-token").val(jsonResult["app_token"]);
        $("#user-edit-app-token-secret").val(jsonResult["app_token_secret"]);
        $("#user-edit-access-token").val(jsonResult["access_token"]);
        $("#user-edit-access-token-secret").val(jsonResult["access_token_secret"]);
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
        setAlert(1, "#alert-user-create", "No valid jsonReturn");
      }

      else if(jsonResult["err"]) {
        setAlert(1, "#alert-user-create", jsonResult["err"]);
      }

      else if(jsonResult["succ"]) {
        addOption("#select-user", jsonResult["username"], jsonResult["username"]);
        setAlert(0, "#alert-user-create", jsonResult["succ"]);
      }
    }
  });
}

function checkTokens(mod) {

  // get auth information of a user from a form
  let auth_token_set = {
    app_token : $("#user-"+mod+"-app-token").val(),
    app_secret : $("#user-"+mod+"-app-token-secret").val(),
    access_token : $("#user-"+mod+"-access-token").val(),
    access_token_secret : $("#user-"+mod+"-access-token-secret").val()
  }

  // request to mkm for checking auth token set
  RequestService.getAccountData(auth_token_set)
  .then(function (result) {
    let username = result.account.username;
    setAlert(0, "#alert-user-"+mod, "Connected to Account "+username);
    removeSpinner("#icon-user-"+mod);
  })
  .catch(function (err) {
    setAlert(1, "#alert-user-"+mod, err.statusText);
    removeSpinner("#icon-user-"+mod);
  });
}

function getLists() {

  // get username
  let selectedUser = $("#select-user").find(":selected").text();

  // execute php script for getting a user
  $.ajax({
    url: "php/getUser.php",
    data: {
      username: selectedUser
    },
    datatype: "json",
    type: "POST",
    success: function(data) {
      console.log(data);
      let jsonResult = $.parseJSON(data);

      if(!jsonResult) {
        resetDropdown("#export-dropdown", true, true);
        setAlert(1, "#alert-export", "No valid jsonReturn");
        removeSpinner("#icon-export-get-lists");
      }

      else if (jsonResult["err"]) {
        resetDropdown("#export-dropdown", true, true);
        setAlert(1, "#alert-export", jsonResult["err"]);
        removeSpinner("#icon-export-get-lists");
      }

      else {

        let auth_token_set = {
          app_token : jsonResult["app_token"],
          app_secret : jsonResult["app_token_secret"],
          access_token : jsonResult["access_token"],
          access_token_secret : jsonResult["access_token_secret"]
        }

        RequestService.getWantlists(auth_token_set)
        .then(function (result) {
          $("#alert-export").hide();
          resetDropdown("#export-dropdown", false, false);
          let lists = result.wantslist;
          lists.forEach(function(list) {
            addOption("#export-dropdown", list.idWantslist, list.name + " (" + list.itemCount + " Wants)");
          })
          removeSpinner("#icon-export-get-lists");
        })
        .catch(function (err) {
          setAlert(1, "#alert-export", err.statusText);
          removeSpinner("#icon-export-get-lists");
        });
      }
    }
  });
}

function getList() {

  // get username and choosen list
  let selectedUser = $("#select-user").find(":selected").text();
  let selectedList = $("#export-dropdown").val();

  // check if a valid wantlist is selected
  if (!selectedList) {
    setAlert(1, "#alert-export", "No valid wantlist selected");
    removeSpinner("#icon-export-get-wants");
  }

  // execute php script for getting a user
  $.ajax({
    url: "php/getUser.php",
    data: {
      username: selectedUser
    },
    datatype: "json",
    type: "POST",
    success: function(data) {
      console.log(data);
      let jsonResult = $.parseJSON(data);

      if(!jsonResult) {
        setAlert(1, "#alert-export", "No valid jsonReturn");
        removeSpinner("#icon-export-get-wants");
      }

      else if (jsonResult["err"]) {
        setAlert(1, "#alert-export", jsonResult["err"]);
        removeSpinner("#icon-export-get-wants");
      }

      else {

        let auth_token_set = {
          app_token : jsonResult["app_token"],
          app_secret : jsonResult["app_token_secret"],
          access_token : jsonResult["access_token"],
          access_token_secret : jsonResult["access_token_secret"]
        }

        RequestService.getWantlist(selectedList, auth_token_set)
        .then(function (result) {
          $("#alert-export").hide();
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
          })
          $("#export-output").val(txt);
          console.log(list);
          removeSpinner("#icon-export-get-wants");
        })
        .catch(function (err) {
          setAlert(1, "#alert-export", err.statusText);
          removeSpinner("#icon-export-get-wants");
        });
      }
    }
  });
}

function login() {

  // get username and password
  let username = $("#login-username-input").val();
  let password = $("#login-password-input").val();

  // execute php script for logging in a user
  $.ajax({
    url: "php/login.php",
    data: {
      username: username,
      password: password
    },
    datatype: "json",
    type: "POST",
    success: function(data) {
      console.log(data);
      let jsonResult = $.parseJSON(data);

      if(!jsonResult) {
        console.log("No valid jsonReturn");
      }

      else if(jsonResult["err"]) {
        console.log(jsonResult["err"]);
      }

      else if(jsonResult["succ"]) {
        window.location.reload();
        console.log(jsonResult["succ"]);
      }
    }
  });
}

function logout() {

  // execute php script for logging out a user
  $.ajax({
    url: "php/logout.php",
    datatype: "json",
    type: "POST",
    success: function(data) {
      console.log(data);
      let jsonResult = $.parseJSON(data);

      if(!jsonResult) {
        console.log("No valid jsonReturn");
      }

      else if(jsonResult["err"]) {
        console.log(jsonResult["err"]);
      }

      else if(jsonResult["succ"]) {
        window.location.reload();
        console.log(jsonResult["succ"]);
      }
    }
  });
}

// -------------------------------------------------------------------
// --------------------- start utility functions ---------------------
// -------------------------------------------------------------------

/* set an alert and write message to console
code: 0 in case of success, 1 in case of error
box: id of the alert element
msg: message
*/
function setAlert(code, box, msg) {
  if (code==0) {
    console.log("Erfolg: "+msg);
    $(box).removeClass("alert-danger").addClass("alert-success");
    $(box).html("Erfolg: <strong>"+msg+"</strong>").show();
  }
  if (code==1) {
    console.log("Fehler: "+msg);
    $(box).removeClass("alert-success").addClass("alert-danger");
    $(box).html("Fehler: <strong>"+msg+"</strong>").show();
  }
}

/* remove a spinner
box: id of the spinner element
*/
function removeSpinner(box) {
  $(box).removeClass("fa-spinner fa-spin");
}

/* add a spinner and write a notive to console
box: id of the spinner element
*/
function addSpinner(box) {
  console.log("loading...");
  $(box).addClass("fa-spinner fa-spin");
}

/* reset a dropdown menu
box: id of dropdown element
disabled: disabled or not? (boolean)
default: should a default option displayed? (boolean)
*/
function resetDropdown(box, disabled, defaultOption) {
  $(box).empty();
  $(box).prop("disabled", disabled);
  if (defaultOption) {
    addOption(box, null, "Choose Wantlist");
  }
}

/* add an option to a select dropdown
box: id of dropdown element
val: value of added option
txt: text of added option
*/
function addOption(box, val, txt) {
  let option = $('<option />').val(val).html(txt);
  $(box).append(option);
}
