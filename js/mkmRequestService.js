import prop from "./properties.js";

// -------------------------------------------------------
// -------------- API for connection to MKM --------------
// -------------------------------------------------------

export class MkmRequestService {

  // put wants to a wantlist
  static putWantsToWantlist(ats, listId, wants) {
    let requestUrl = prop.mkm_url + "wantslist/" + listId;
    let authString = this.getAuthString(requestUrl, ats, "PUT");

    let xmlData = this.getXmlDataForPutWantsToWantlist(wants);

    return this.putData(requestUrl, authString, xmlData);
  }

  // find a metaproduct by id
  static findMetaproduct(ats, metaproduct) {
    let requestUrl = prop.mkm_url + "metaproducts/find";
    let requestUrlParams = requestUrl + this.formatParams(metaproduct);
    let authString = this.getAuthString(requestUrl, ats, "GET", metaproduct);

    return this.getData(requestUrlParams, authString);
  }

  // create an empty wantlist with a specified name
  static createWantlist(ats, listName) {
    let requestUrl = prop.mkm_url + "wantslist";
    let authString = this.getAuthString(requestUrl, ats, "POST");

    let xmlData = this.getXmlDataForCreateWantlist(listName);

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

  static getXmlDataForCreateWantlist(listName) {
    return prop.xml.start+"<wantslist><name>"+listName+
    "</name><idGame>1</idGame></wantslist>"+prop.xml.end;
  }

  static getXmlDataForPutWantsToWantlist(wants) {
    let xmlData = prop.xml.start+"<action>addItem</action>";

    for (let i = 0; i < wants.length; i++) {
      xmlData += "<metaproduct><idMetaproduct>"+wants[i]["id"]+"</idMetaproduct>"+
      "<count>"+wants[i]["amount"]+"</count><wishPrice></wishPrice>"+
      "<minCondition>EX</minCondition><mailAlert>false</mailAlert>"+
      "<isFoil>false</isFoil><isSigned>false</isSigned></metaproduct>";
    }

    xmlData += prop.xml.end;

    return xmlData;
  }

  // format params for get request as a string
  static formatParams(params){
    return "?" + Object.keys(params).map(function(key) {
      return key+"="+encodeURIComponent(params[key]);
    }).join("&")
  }

  // get auth string for request header
  static getAuthString(requestUrl, ats, method, params) {

    // create unique values for OAuth
    let nonce = Math.floor(Date.now()).toString();
    let timestamp = Math.floor(Date.now() / 1000).toString();

    // get params needed for OAuth
    let oauth = {
      oauth_consumer_key: ats.app_token,
      oauth_nonce: nonce,
      oauth_signature_method: prop.signature_method,
      oauth_timestamp: timestamp,
      oauth_token: ats.access_token,
      oauth_version: prop.version
    }

    // combine oauch object with params
    Object.assign(oauth, params);

    // create baseString for signature
    let baseStringWithoutGet = Object.keys(oauth).map(function(key) {
      return key+"="+encodeURIComponent(oauth[key])
    }).join("&")

    let baseString = method+"&" + encodeURIComponent(requestUrl) + "&" + encodeURIComponent(baseStringWithoutGet);

    // create signingKey for signature
    let signingKey = encodeURIComponent(ats.app_secret) + "&" + encodeURIComponent(ats.access_token_secret);

    let rawSignature = CryptoJS.HmacSHA1(baseString, signingKey);
    let signature = CryptoJS.enc.Base64.stringify(rawSignature);

    // add signature and url to oauth object
    oauth["oauth_signature"] = signature;
    oauth["realm"] = requestUrl;

    // create auth string
    let authString = Object.keys(oauth).map(function(key) {
      return key+"=\""+oauth[key]+ "\"";
    }).join(",");

    return authString;
  }

  // send get request to mkm api
  static getData(requestUrl, auth) {
    return MkmRequestService.executeXhr(requestUrl, auth, null, "GET");
  }

  // send post request to mkm api
  static postData(requestUrl, auth, xmlData) {
    return MkmRequestService.executeXhr(requestUrl, auth, xmlData, "POST");
  }

  // send put request to mkm api
  static putData(requestUrl, auth, xmlData) {
    return MkmRequestService.executeXhr(requestUrl, auth, xmlData, "PUT");
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
