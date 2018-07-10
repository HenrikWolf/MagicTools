import prop from "./properties.js";

// -------------------------------------------------------
// -------------- API for connection to MKM --------------
// -------------------------------------------------------

export class MkmRequestService {

  // put wants to a wantlist
  static putWantsToWantlist(ats, listId, listItem) {
    return new Promise(function (resolve, reject) {
      resolve("listId: "+listId+", listItem: "+listItem);
    });
  }

  // find a metaproduct by id
  static findMetaproduct(ats, metaproduct) {
    let requestUrl = prop.mkm_url + "metaproducts/find";
    let requestUrlParams = requestUrl + this.formatParams(metaproduct);
    let authString = this.getAuthString2(requestUrl, ats, "GET", metaproduct);

    return this.getData(requestUrlParams, authString);
  }

  static formatParams( params ){
    return "?" + Object
    .keys(params)
    .map(function(key){
      return key+"="+encodeURIComponent(params[key])
    })
    .join("&")
  }

  // create an empty wantlist with a specified name
  static createWantlist(ats, listName) {
    let requestUrl = prop.mkm_url + "wantslist";
    let authString = this.getAuthString(requestUrl, ats, "POST");

    let xmlData = prop.xml.start+"<wantslist><name>"+listName+"</name><idGame>1</idGame></wantslist>"+prop.xml.end;

    return this.postData(requestUrl, authString, xmlData);
  }

  // get mkm account data, e.g. for checking tokens
  static getAccountData(ats) {
    let requestUrl = prop.mkm_url + "account";
    let authString = this.getAuthString(requestUrl, ats, "GET");

    return this.getData(requestUrl, authString);
  }

  // get a list of all wantlists
  static getWantlists(ats) {
    let requestUrl = prop.mkm_url + "wantslist";
    let authString = this.getAuthString(requestUrl, ats, "GET");

    return this.getData(requestUrl, authString);
  }

  // get content of a wantlist
  static getWantlist(ats, listId) {
    let requestUrl = prop.mkm_url + "wantslist/" + listId;
    let authString = this.getAuthString(requestUrl, ats, "GET");

    return this.getData(requestUrl, authString);
  }

  // -------------------------------------------------------------------
  // ------------------------- start functions -------------------------
  // -------------------------------------------------------------------

  static getAuthString2(requestUrl, ats, method, params) {

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
            + "&oauth_token=" + oauthToken + "&oauth_version=" + oauthVersion + "&search=" + params["search"];

    let baseString = method+"&" + encodeURIComponent(realm) + "&" + encodeURIComponent(baseStringWithoutGet);

    let signingKey = encodeURIComponent(ats.app_secret) + "&" + encodeURIComponent(ats.access_token_secret);

    let rawSignature = CryptoJS.HmacSHA1(baseString, signingKey);
    let signature = CryptoJS.enc.Base64.stringify(rawSignature);

    let auth = "realm=\"" + realm + "\",oauth_consumer_key=\"" + oauthConsumerKey
        + "\",oauth_token=\"" + oauthToken + "\",oauth_nonce=\"" + oauthNonce
        + "\",oauth_timestamp=\"" + oauthTimestamp + "\",oauth_signature_method=\"" + oauthSignatureMethod
        + "\",oauth_version=\"" + oauthVersion + "\",oauth_signature=\"" + signature  + "\",search=\"" + params["search"] + "\"";

    console.log(auth);
    return auth;
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
    return MkmRequestService.executeXhr(requestUrl, auth, null, "GET");
  }

  // send post request to mkm api
  static postData(requestUrl, auth, xmlData) {
    return MkmRequestService.executeXhr(requestUrl, auth, xmlData, "POST");
  }

  // execute XMLHttpRequest to mkm api
  static executeXhr(requestUrl, auth, xmlData, method) {
    return new Promise(function (resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.open(method, requestUrl, true);
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
            if (res["failed"]) {
              if (res["failed"].length > 0) {
                reject(res["failed"][0]["error"]);
              } else {
                resolve(res);
              }
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
