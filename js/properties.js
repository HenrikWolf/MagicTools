export default {
  version : "1.0",
  signature_method : "HMAC-SHA1",
  mkm_url : "https://api.cardmarket.com/ws/v2.0/output.json/",
  xml : {
    start : "<?xml version='1.0' encoding='UTF-8' ?><request>",
    end :  "</request>"
  },
  log : {
    mkmRes : false,
    phpRes : false,
    alerts: false
  }
}
