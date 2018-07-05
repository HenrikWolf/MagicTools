import prop from "./properties.js";

export class RequestService {

  static createWantlist(listName, auth_token_set) {
    let request_url = prop.mkm_url + "wantslist";

    return this.createData(request_url, auth_token_set, listName);
  }

  static getAccountData(auth_token_set) {
    let request_url = prop.mkm_url + "account";

    return this.getData(request_url, auth_token_set);
  }

  static getWantlists(auth_token_set) {
    let request_url = prop.mkm_url + "wantslist";

    return this.getData(request_url, auth_token_set);
  }

  static getWantlist(listId, auth_token_set) {
    let request_url = prop.mkm_url + "wantslist/" + listId;

    return this.getData(request_url, auth_token_set);
  }

  static createData(request_url, auth_token_set, listName) {

    // create unique values for OAuth
    let nonce = Math.floor(Date.now()).toString();
    let timestamp = Math.floor(Date.now() / 1000).toString();

    // get params needed for OAuth
    let realm = request_url;
    let oauth_consumer_key = auth_token_set.app_token;
    let oauth_token = auth_token_set.access_token;
    let oauth_nonce = nonce;
    let oauth_timestamp = timestamp;
    let oauth_signature_method = prop.signature_method;
    let oauth_version = prop.version;

    let baseStringWithoutGet = "oauth_consumer_key=" + oauth_consumer_key
            + "&oauth_nonce=" + oauth_nonce
            + "&oauth_signature_method=" + oauth_signature_method + "&oauth_timestamp=" + oauth_timestamp
            + "&oauth_token=" + oauth_token + "&oauth_version=" + oauth_version;

    let baseString = "POST&" + encodeURIComponent(realm) + "&" + encodeURIComponent(baseStringWithoutGet);

    let signingKey = encodeURIComponent(auth_token_set.app_secret) + "&" + encodeURIComponent(auth_token_set.access_token_secret);

    let rawSignature = CryptoJS.HmacSHA1(baseString, signingKey);
    let signature = CryptoJS.enc.Base64.stringify(rawSignature);

    let auth = "realm=\"" + realm + "\",oauth_consumer_key=\"" + oauth_consumer_key
        + "\",oauth_token=\"" + oauth_token + "\",oauth_nonce=\"" + oauth_nonce
        + "\",oauth_timestamp=\"" + oauth_timestamp + "\",oauth_signature_method=\"" + oauth_signature_method
        + "\",oauth_version=\"" + oauth_version + "\",oauth_signature=\"" + signature  + "\"";

    return this.request2(request_url, auth, listName);
  }

  static getData(request_url, auth_token_set) {

    // create unique values for OAuth
    let nonce = Math.floor(Date.now()).toString();
    let timestamp = Math.floor(Date.now() / 1000).toString();

    // get params needed for OAuth
    let realm = request_url;
    let oauth_consumer_key = auth_token_set.app_token;
    let oauth_token = auth_token_set.access_token;
    let oauth_nonce = nonce;
    let oauth_timestamp = timestamp;
    let oauth_signature_method = prop.signature_method;
    let oauth_version = prop.version;

    let baseStringWithoutGet = "oauth_consumer_key=" + oauth_consumer_key
            + "&oauth_nonce=" + oauth_nonce
            + "&oauth_signature_method=" + oauth_signature_method + "&oauth_timestamp=" + oauth_timestamp
            + "&oauth_token=" + oauth_token + "&oauth_version=" + oauth_version;

    let baseString = "GET&" + encodeURIComponent(realm) + "&" + encodeURIComponent(baseStringWithoutGet);

    let signingKey = encodeURIComponent(auth_token_set.app_secret) + "&" + encodeURIComponent(auth_token_set.access_token_secret);

    let rawSignature = CryptoJS.HmacSHA1(baseString, signingKey);
    let signature = CryptoJS.enc.Base64.stringify(rawSignature);

    let auth = "realm=\"" + realm + "\",oauth_consumer_key=\"" + oauth_consumer_key
        + "\",oauth_token=\"" + oauth_token + "\",oauth_nonce=\"" + oauth_nonce
        + "\",oauth_timestamp=\"" + oauth_timestamp + "\",oauth_signature_method=\"" + oauth_signature_method
        + "\",oauth_version=\"" + oauth_version + "\",oauth_signature=\"" + signature  + "\"";

    return this.request(request_url, auth);
  }

  static request(request_url, auth) {

    return new Promise(function (resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.open("GET", request_url, true);
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.setRequestHeader("Authorization", "OAuth " + auth);

      xhr.onload = function() {
        if (this.status >= 200 && this.status < 300) {
          let result = JSON.parse(xhr.response);
          resolve(result);
        } else {
          reject({
            status: this.status,
            statusText: xhr.statusText
          });
        }
      }

      xhr.onerror = function() {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      };

      xhr.send();
    });
  }

  static request2(request_url, auth, listName) {

    let xml = "<?xml version='1.0' encoding='UTF-8' ?><request><wantslist><name>"+listName+"</name><idGame>1</idGame></wantslist></request>";

    return new Promise(function (resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.open("POST", request_url, true);
      xhr.setRequestHeader("Authorization", "OAuth " + auth);

      xhr.onload = function() {
        if (this.status >= 200 && this.status < 300) {
          let result = JSON.parse(xhr.response);
          resolve(result);
        } else {
          reject({
            status: this.status,
            statusText: xhr.statusText
          });
        }
      }

      xhr.onerror = function() {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      };

      xhr.send(xml);
    });
  }
}
