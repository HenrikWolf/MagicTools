import {RequestService} from "./requestService.js"

$(document).ready(function() {
  fillSelectUserDropdown();
});

$("#btn-user-create-save").click(function(e) {
  // TODO: add spinner
  $.ajax({
    url: "php/createUser.php",
    data: {
      username: $("#user-create-username").val(),
      password: $("#user-create-password").val(),
      confirm_password: $("#user-create-confirm-password").val(),
      app_token: $("#user-create-app-token").val(),
      app_token_secret: $("#user-create-app-token-secret").val(),
      access_token: $("#user-create-access-token").val(),
      access_token_secret: $("#user-create-access-token-secret").val()
    },
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
});

$(".nav a").click(function(){
  $(".nav").find(".active").removeClass("active");
  $(this).parent().addClass("active");
});

$("#user-delete-tab").click(function(e) {
  // addSpinner("#icon-user-edit");

  // get username
  let selectedUser = $("#select-user").find(":selected").text();

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
});

$("#btn-user-edit-check").click(function(e) {
  addSpinner("#icon-user-edit");
  checkTokens("edit");
});

$("#btn-user-create-check").click(function(e) {
  addSpinner("#icon-user-create");
  checkTokens("create");
});

$("#btn-get-lists").click(function(e) {
  addSpinner("#icon-export-get-lists");
  getWantlists();
});

$("#btn-get-wants").click(function(e) {
  addSpinner("#icon-export-get-wants");
  getWantlist();
});

$("#select-user").change(function(e) {
  fillUserEditForm();
  resetDropdown("#export-dropdown", true, true);
  $("#alert-user-edit").hide();
});

$("#btn-copy-clipboard").click(function(e) {
  let copyText = document.getElementById("export-output");
  copyText.select();
  document.execCommand("copy");
});

$("#btn-user-edit-save").click(function(e) {

  // get username
  let selectedUser = $("#select-user").find(":selected").text();

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
});

function fillSelectUserDropdown() {
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

function fillUserEditForm() {

  // get username
  let selectedUser = $("#select-user").find(":selected").text();

  // set label to the beginning of the form
  $("#p-user-edit").html("Edit user <i>"+selectedUser+"</i>");

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
    setAlert(0, "#alert-user-"+mod, "Connected to Account "+username);
    removeSpinner("#icon-user-"+mod);
  })
  .catch(function (err) {
    setAlert(1, "#alert-user-"+mod, err.statusText);
    removeSpinner("#icon-user-"+mod);
  });
}

function getWantlists() {

  // get username
  let selectedUser = $("#select-user").find(":selected").text();

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
        resetDropdown()"#export-dropdown", true, true);
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

function getWantlist() {

  // get username and choosen list
  let selectedUser = $("#select-user").find(":selected").text();
  let selectedList = $("#export-dropdown").val();

  // check if a valid wantlist is selected
  if (!selectedList) {
    setAlert(1, "#alert-export", "No valid wantlist selected");
    removeSpinner("#icon-export-get-wants");
  }

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
    addOption(box, null, Choose Wantlist);
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
