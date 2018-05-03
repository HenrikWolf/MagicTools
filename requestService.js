import prop from "./properties.js";

export class RequestService {

  getAccountData(auth_token_set) {
    var request_url = prop.mkm_url + "account";

    return this.getData(request_url, auth_token_set);
  }

  getWantlists(auth_token_set) {
    var request_url = prop.mkm_url + "wantslist";

    return this.getData(request_url, auth_token_set);
  }

  getData(request_url, auth_token_set) {

    // create unique values for OAuth
    var nonce = Math.floor(Date.now()).toString();
    var timestamp = Math.floor(Date.now() / 1000).toString();

    // get params needed for OAuth
    var realm = request_url;
    var oauth_consumer_key = auth_token_set.app_token;
    var oauth_token = auth_token_set.access_token;
    var oauth_nonce = nonce;
    var oauth_timestamp = timestamp;
    var oauth_signature_method = prop.signature_method;
    var oauth_version = prop.version;

    var baseStringWithoutGet = "oauth_consumer_key=" + oauth_consumer_key
            + "&oauth_nonce=" + oauth_nonce
            + "&oauth_signature_method=" + oauth_signature_method + "&oauth_timestamp=" + oauth_timestamp
            + "&oauth_token=" + oauth_token + "&oauth_version=" + oauth_version;

    var baseString = "GET&" + encodeURIComponent(realm) + "&" + encodeURIComponent(baseStringWithoutGet);

    var signingKey = encodeURIComponent(auth_token_set.app_secret) + "&" + encodeURIComponent(auth_token_set.access_token_secret);

    var rawSignature = CryptoJS.HmacSHA1(baseString, signingKey);
    var signature = CryptoJS.enc.Base64.stringify(rawSignature);

    var auth = "realm=\"" + realm + "\",oauth_consumer_key=\"" + oauth_consumer_key
        + "\",oauth_token=\"" + oauth_token + "\",oauth_nonce=\"" + oauth_nonce
        + "\",oauth_timestamp=\"" + oauth_timestamp + "\",oauth_signature_method=\"" + oauth_signature_method
        + "\",oauth_version=\"" + oauth_version + "\",oauth_signature=\"" + signature  + "\"";

    return this.request(request_url, auth);
  }

  request(request_url, auth) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
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
}
