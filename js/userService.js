import prop from "./properties.js";

// -----------------------------------------------------
// -------------- API for user management --------------
// -----------------------------------------------------

export class UserService {

  //create a new user account
  static createUser(user) {
    return this.executeAjax("createUser.php", null);
  }

  // delete a user account
  static deleteUser() {
    return this.executeAjax("deleteUser.php", null);
  }

  // edit user account
  static editUser(user) {
    return this.executeAjax("editUser.php", user);
  }

  // get all user information
  static getUser() {
    return this.executeAjax("getUser.php", null);
  }

  // login a user
  static login(username, password) {
    let data = {
      username: username,
      password: password
    };
    return this.executeAjax("login.php", data);
  }

  // logout a user
  static logout() {
    return this.executeAjax("logout.php", null);
  }

  // -------------------------------------------------------------------
  // ------------------------- start functions -------------------------
  // -------------------------------------------------------------------

  // execute an AJAX request to the server
  static executeAjax(script, data) {
    return new Promise(function (resolve, reject) {
      $.ajax({
        url: "php/"+script,
        data: data,
        datatype: "json",
        type: "POST",
        success: function(data) {
          if (prop.log.phpRes) {
            console.log(data);
          }
          let res = UserService.parseJSON(data);
          if (res["err"]) {
            reject(res["err"]);
          } else {
            resolve(res);
          }
        },
        error: function(err) {
          reject(err.statusText);
        }
      });
    });
  }

  // parse and return json result
  static parseJSON(data) {
    try {
      let jsonResult = JSON.parse(data);

      if(!jsonResult) {
        return {err: "empty JsonResult"};
      } else {
        if(!jsonResult["succ"]) {
          jsonResult["succ"] = "request successful";
        }
        return jsonResult;
      }
    }
    catch (e) {
      return {err: "no valid JsonResult"};
    }
  }
}
