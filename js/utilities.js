// -------------------------------------------------------------------
// --------------------- start utility functions ---------------------
// -------------------------------------------------------------------

export class Util {

  /* set an alert and write message to console
  code: 0 in case of success, 1 in case of error
  box: id of the alert element
  msg: message
  */
  static setAlert(code, box, msg) {
    if (code==0) {
      console.log("Erfolg: "+msg);
      $(box).removeClass("alert-danger").addClass("alert-success");
      $(box).html("Erfolg: <strong>"+msg+"</strong>").show();
    }
    if (code==1) {
      console.log("Fehler: "+msg);
      $(box).removeClass("alert-success").addClass("alert-danger");
      $(box).html("Fehler: <strong>"+msg+"</strong>").show();
    }
  }

  /* remove a spinner
  box: id of the spinner element
  */
  static removeSpinner(box) {
    $(box).removeClass("fa-spinner fa-spin");
  }

  /* add a spinner and write a notive to console
  box: id of the spinner element
  */
  static addSpinner(box) {
    console.log("loading...");
    $(box).addClass("fa-spinner fa-spin");
  }

  /* reset a dropdown menu
  box: id of dropdown element
  disabled: disabled or not? (boolean)
  default: should a default option displayed? (boolean)
  */
  static resetDropdown(box, disabled, defaultOption) {
    $(box).empty();
    $(box).prop("disabled", disabled);
    if (defaultOption) {
      this.addOption(box, null, "Choose Wantlist");
    }
  }

  /* add an option to a select dropdown
  box: id of dropdown element
  val: value of added option
  txt: text of added option
  */
  static addOption(box, val, txt) {
    let option = $('<option />').val(val).html(txt);
    $(box).append(option);
  }
}
