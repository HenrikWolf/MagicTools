// -------------------------------------------
// --------- API for user management ---------
// -------------------------------------------

export class UserService {

  static createUser(user) {
    return new Promise(function (resolve, reject) {
      // TODO: execute ajax here
    });
  }

  static deleteUser() {
    return new Promise(function (resolve, reject) {
      // TODO: execute ajax here
    });
  }

  static editUser(ats) {
    return new Promise(function (resolve, reject) {
      // TODO: execute ajax here
    });
  }

  // get all user information
  static getUser() {
    return new Promise(function (resolve, reject) {
      $.ajax({
        url: "php/getUser.php",
        datatype: "json",
        type: "POST",
        success: function(data) {
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

  // login a user
  static login(username, password) {
    return new Promise(function (resolve, reject) {
      $.ajax({
        url: "php/login.php",
        data: {
          username: username,
          password: password
        },
        datatype: "json",
        type: "POST",
        success: function(data) {
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

  // logout a user
  static logout() {
    return new Promise(function (resolve, reject) {
      $.ajax({
        url: "php/logout.php",
        datatype: "json",
        type: "POST",
        success: function(data) {
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
    console.log(data);

    try {
      let jsonResult = JSON.parse(data);

      if(!jsonResult) {
        return {err: "Empty JsonResult"};
      } else {
        if(!jsonResult["succ"]) {
          jsonResult["succ"] = "Request Erfolgreich";
        }
        return jsonResult;
      }
    }

    catch (e) {
      return {err: "No valid JsonResult"};
    }
  }
}
