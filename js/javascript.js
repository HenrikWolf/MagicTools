import {RequestService} from "./requestService.js"
import prop from "./properties.js";

$(document).ready(function() {
  fillSelectUserDropdown();
});

$("#btn-user-create-save").click(function(e) {
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
         if(jsonResult) {
           if(jsonResult["err"]) {
             console.log(jsonResult["err"]);
             $("#alert-user-create").removeClass("alert-success").addClass("alert-danger");
             $("#alert-user-create").html("Fehler: <strong>"+jsonResult["err"]+"</strong>").show();
           } else if(jsonResult["succ"]) {
             console.log(jsonResult["succ"]);
             $("#select-user").append("<option value='test'>"+jsonResult["username"]+"</option>");
             $("#alert-user-create").removeClass("alert-danger").addClass("alert-success");
             $("#alert-user-create").html("Erfolg: <strong>"+jsonResult["succ"]+"</strong>").show();
           }
         }
       }
  });
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

function fillSelectUserDropdown() {
  $.ajax({
       url: "php/getUserList.php",
       datatype: "json",
       type: "POST",
       success: function(data) {
         console.log(data);
         let jsonResult = $.parseJSON(data);
         if(jsonResult) {
           if(jsonResult["err"]) {
             console.log(jsonResult["err"]);
           } else {
             for (var user in jsonResult) {
               let username = jsonResult[user]["username"];
               let option = $('<option />').val(username).html(username);
               $("#select-user").append(option);
             }
           }
           $("#select-user").append("<option value='test'>test</option>");
         }
       }
  });
}

function fillUserEditForm() {
  let user = $("#select-user").find(":selected").text();
  $("#p-user-edit").html("Edit user <i>"+user+"</i>");
  $.ajax({
       url: "php/getUser.php",
       data: {
         username: user
       },
       datatype: "json",
       type: "POST",
       success: function(data) {
         console.log(data);
         let jsonResult = $.parseJSON(data);
         if(jsonResult) {
           if(jsonResult["err"]) {
             console.log(jsonResult["err"]);
             $("#alert-user-edit").removeClass("alert-success").addClass("alert-danger");
             $("#alert-user-edit").html("Fehler: <strong>"+jsonResult["err"]+"</strong>").show();
             $("#user-edit-app-token").val("");
             $("#user-edit-app-token-secret").val("");
             $("#user-edit-access-token").val("");
             $("#user-edit-access-token-secret").val("");
           } else {
             $("#user-edit-app-token").val(jsonResult[0]["app_token"]);
             $("#user-edit-app-token-secret").val(jsonResult[0]["app_token_secret"]);
             $("#user-edit-access-token").val(jsonResult[0]["access_token"]);
             $("#user-edit-access-token-secret").val(jsonResult[0]["access_token_secret"]);
           }
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
    $("#alert-user-"+mod).removeClass("alert-danger").addClass("alert-success");
    $("#alert-user-"+mod).html("Connected to Account <strong>"+username+"</strong>").show();
    console.log(result.account);
    $("#icon-user-"+mod).removeClass("fa-spinner fa-spin");
  })
  .catch(function (err) {
    $("#alert-user-"+mod).removeClass("alert-success").addClass("alert-danger");
    $("#alert-user-"+mod).html("Fehler: <strong>"+err.statusText+"</strong>").show();
    console.error('Augh, there was an error!', err.status, err.statusText);
    $("#icon-user-"+mod).removeClass("fa-spinner fa-spin");
  });
}

function getWantlists() {
  let user = $("#select-user").find(":selected").text();

  $.ajax({
       url: "php/getUser.php",
       data: {
         username: user
       },
       datatype: "json",
       type: "POST",
       success: function(data) {
         console.log(data);
         let jsonResult = $.parseJSON(data);
         if(jsonResult) {
           if(jsonResult["err"]) {
             console.log(jsonResult["err"]);
             $("#alert-export").html("Fehler: <strong>"+jsonResult["err"]+"</strong>").show();
             $("#export-dropdown").empty();
             $("#export-dropdown").prop("disabled", true);
             $("#export-dropdown").append("<option value='null' selected>Choose Wantlist</option>");
             $("#icon-export-get-lists").removeClass("fa-spinner fa-spin");
           } else {
             let auth_token_set = {
               app_token : jsonResult[0]["app_token"],
               app_secret : jsonResult[0]["app_token_secret"],
               access_token : jsonResult[0]["access_token"],
               access_token_secret : jsonResult[0]["access_token_secret"]
             }
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
               $("#icon-export-get-lists").removeClass("fa-spinner fa-spin");
             })
             .catch(function (err) {
               $("#alert-export").html("Fehler: <strong>"+err.statusText+"</strong>").show();
               console.log('Augh, there was an error!', err.status, err.statusText);
               $("#icon-export-get-lists").removeClass("fa-spinner fa-spin");
             });
           }
         }
       }
  });
}

function getWantlist() {

  let user = $("#select-user").find(":selected").text();

  $.ajax({
       url: "php/getUser.php",
       data: {
         username: user
       },
       datatype: "json",
       type: "POST",
       success: function(data) {
         console.log(data);
         let jsonResult = $.parseJSON(data);
         if(jsonResult) {
           if(jsonResult["err"]) {
             console.log(jsonResult["err"]);
             $("#alert-user-edit").removeClass("alert-success").addClass("alert-danger");
             $("#alert-user-edit").html("Fehler: <strong>"+jsonResult["err"]+"</strong>").show();
             $("#user-edit-app-token").val("");
             $("#user-edit-app-token-secret").val("");
             $("#user-edit-access-token").val("");
             $("#user-edit-access-token-secret").val("");
           } else {
             let listId = $("#export-dropdown").val();

             let auth_token_set = {
               app_token : jsonResult[0]["app_token"],
               app_secret : jsonResult[0]["app_token_secret"],
               access_token : jsonResult[0]["access_token"],
               access_token_secret : jsonResult[0]["access_token_secret"]
             }

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
               $("#export-dropdown").empty();
               $("#export-dropdown").prop("disabled", true);
               $("#export-dropdown").append("<option value='null' selected>Choose Wantlist</option>");
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
             $("#user-edit-app-token").val(jsonResult[0]["app_token"]);
             $("#user-edit-app-token-secret").val(jsonResult[0]["app_token_secret"]);
             $("#user-edit-access-token").val(jsonResult[0]["access_token"]);
             $("#user-edit-access-token-secret").val(jsonResult[0]["access_token_secret"]);
           }
         }
       }
  });
}
