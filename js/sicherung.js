// get listName and listItems from form
let listName = $("#import-listname").val();
let listItems = $("#import-input").val();

let b = listItems.split('\n');
let c = true;

let patt = new RegExp("^[ ]*[0-9]x[A-Za-z ]+");

for (let i = 0; i < b.length; i++) {
  console.log(b[0]);
  if(!patt.test(b[i])) {
    c = false;
  }
  console.log(patt.test(b[i]));
}

if(c) {
  Util.setAlert(0, "#alert-import", "korrekt");
} else {
  Util.setAlert(1, "#alert-import", "nicht korrekt");
}
