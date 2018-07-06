import prop from "./properties.js";

export class MkmRequestService {

  static createWantlist(ats, listName, listItems) {
    let requestUrl = prop.mkm_url + "wantslist";
    let authString = this.getAuthString(requestUrl, ats, "POST");

    let xmlData = prop.xml.start+"<wantslist><name>"+listName+"</name><idGame>1</idGame></wantslist>"+prop.xml.end;

    return this.postData(requestUrl, authString, xmlData);
  }

  static getAccountData(ats) {
    let requestUrl = prop.mkm_url + "account";
    let authString = this.getAuthString(requestUrl, ats, "GET");

    return this.getData(requestUrl, authString);
  }

  static getWantlists(ats) {
    let requestUrl = prop.mkm_url + "wantslist";
    let authString = this.getAuthString(requestUrl, ats, "GET");

    return this.getData(requestUrl, authString);
  }

  static getWantlist(ats, listId) {
    let requestUrl = prop.mkm_url + "wantslist/" + listId;
    let authString = this.getAuthString(requestUrl, ats, "GET");

    return this.getData(requestUrl, authString);
  }

  static getAuthString(requestUrl, ats, method) {

    // create unique values for OAuth
    let nonce = Math.floor(Date.now()).toString();
    let timestamp = Math.floor(Date.now() / 1000).toString();

    // get params needed for OAuth
    let realm = requestUrl;
    let oauthConsumerKey = ats.app_token;
    let oauthToken = ats.access_token;
    let oauthNonce = nonce;
    let oauthTimestamp = timestamp;
    let oauthSignatureMethod = prop.signature_method;
    let oauthVersion = prop.version;

    let baseStringWithoutGet = "oauth_consumer_key=" + oauthConsumerKey
            + "&oauth_nonce=" + oauthNonce
            + "&oauth_signature_method=" + oauthSignatureMethod + "&oauth_timestamp=" + oauthTimestamp
            + "&oauth_token=" + oauthToken + "&oauth_version=" + oauthVersion;

    let baseString = method+"&" + encodeURIComponent(realm) + "&" + encodeURIComponent(baseStringWithoutGet);

    let signingKey = encodeURIComponent(ats.app_secret) + "&" + encodeURIComponent(ats.access_token_secret);

    let rawSignature = CryptoJS.HmacSHA1(baseString, signingKey);
    let signature = CryptoJS.enc.Base64.stringify(rawSignature);

    let auth = "realm=\"" + realm + "\",oauth_consumer_key=\"" + oauthConsumerKey
        + "\",oauth_token=\"" + oauthToken + "\",oauth_nonce=\"" + oauthNonce
        + "\",oauth_timestamp=\"" + oauthTimestamp + "\",oauth_signature_method=\"" + oauthSignatureMethod
        + "\",oauth_version=\"" + oauthVersion + "\",oauth_signature=\"" + signature  + "\"";

    return auth;
  }

  // send get request to mkm api
  static getData(requestUrl, auth) {

    return new Promise(function (resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.open("GET", requestUrl, true);
      xhr.setRequestHeader("Authorization", "OAuth " + auth);

      xhr.onload = function() {
        if (this.status >= 200 && this.status < 300) {
          if (prop.log.mkmRes) {
            console.log(xhr.status+": "+xhr.response);
          }
          let res = MkmRequestService.parseJSON(xhr.response);
          if (res["err"]) {
            reject(res["err"]);
          } else {
            resolve(res);
          }
        } else {
          if (prop.log.mkmRes) {
            console.log(xhr.status+": "+xhr.statusText);
          }
          reject(xhr.statusText);
        }
      }

      xhr.onerror = function() {
        if (prop.log.mkmRes) {
          console.log(xhr.status+": "+xhr.statusText);
        }
        reject(xhr.statusText);
      };

      xhr.send();
    });
  }

  // send post request to mkm api
  static postData(requestUrl, auth, xmlData) {

    return new Promise(function (resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.open("POST", requestUrl, true);
      xhr.setRequestHeader("Authorization", "OAuth " + auth);

      xhr.onload = function() {
        if (this.status >= 200 && this.status < 300) {
          if (prop.log.mkmRes) {
            console.log(xhr.status+": "+xhr.response);
          }
          let res = MkmRequestService.parseJSON(xhr.response);
          if (res["err"]) {
            reject(res["err"]);
          } else {
            if (res["failed"].length > 0) {
              reject(res["failed"][0]["error"]);
            } else {
              resolve(res);
            }
          }
        } else {
          if (prop.log.mkmRes) {
            console.log(xhr.status+": "+xhr.statusText);
          }
          reject(xhr.statusText);
        }
      }

      xhr.onerror = function() {
        if (prop.log.mkmRes) {
          console.log(xhr.status+": "+xhr.statusText);
        }
        reject(xhr.statusText);
      };

      xhr.send(xmlData);
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
