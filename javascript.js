function UserAction() {

  let rs = new RequestService();
  let result = rs.getAccountData();

  console.log(result);

    // var xhttp = new XMLHttpRequest();
    //
    // var name = "WantlistManager";
    // var app_type = "Dedicated";
    // var app_token = "TY9c4GFnaHXjMbJe";
    // var app_secret = "XUpi8kNDTs3VyJad4A7mbFWFsbsNfOMk";
    // var access_token = "m3naRZnW9DS34E4c9Nec77ojOEvikVvf";
    // var access_token_secret = "enHqyVK8WUOUO2odSEA9NM7OmtX3UhMc";
    // var request_url = "https://api.cardmarket.com/ws/v2.0/output.json/account";
    // var nonce = Math.floor(Date.now()).toString();
    // var timestamp = Math.floor(Date.now() / 1000).toString();
    // var version = "1.0";
    // var signature_method = "HMAC-SHA1";
    //
    // var realm = request_url;
    // var oauth_consumer_key = app_token;
    // var oauth_token = access_token;
    // var oauth_nonce = nonce;
    // var oauth_timestamp = timestamp;
    // var oauth_signature_method = signature_method;
    // var oauth_version = version;
    //
    // var baseStringWithoutGet = "oauth_consumer_key=" + oauth_consumer_key
    //         + "&oauth_nonce=" + oauth_nonce
    //         + "&oauth_signature_method=" + oauth_signature_method + "&oauth_timestamp=" + oauth_timestamp
    //         + "&oauth_token=" + oauth_token + "&oauth_version=" + oauth_version;
    //
    // var baseString = "GET&" + encodeURIComponent(realm) + "&" + encodeURIComponent(baseStringWithoutGet);
    //
    // var signingKey = encodeURIComponent(app_secret) + "&" + encodeURIComponent(access_token_secret);
    //
    // var rawSignature = CryptoJS.HmacSHA1(baseString, signingKey);
    // var signature = CryptoJS.enc.Base64.stringify(rawSignature);
    //
    // var auth = "realm=\"" + realm + "\",oauth_consumer_key=\"" + oauth_consumer_key
    //     + "\",oauth_token=\"" + oauth_token + "\",oauth_nonce=\"" + oauth_nonce
    //     + "\",oauth_timestamp=\"" + oauth_timestamp + "\",oauth_signature_method=\"" + oauth_signature_method
    //     + "\",oauth_version=\"" + oauth_version + "\",oauth_signature=\"" + signature  + "\"";
    //
    // xhttp.open("GET", "https://api.cardmarket.com/ws/v2.0/output.json/account", true);
    // xhttp.setRequestHeader("Content-type", "application/json");
    // xhttp.setRequestHeader("Authorization", "OAuth " + auth);
    // xhttp.send();
    //
    // xhttp.onreadystatechange = function() {
    //   if (this.readyState == 4 && this.status == 200) {
    //       var myArr = JSON.parse(this.responseText);
    //       console.log(myArr);
    //   }
    // }
}
