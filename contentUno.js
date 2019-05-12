// Content scripts are only working within a given webpage, not browser wide.
console.log("Chrome extension go!");

var loadedList = JSON.parse(localStorage.getItem("webList")); // get password database.
var ll2 = JSON.parse(localStorage.getItem("webList"));
var entry =[]; // used for the database stuff
var result1; // stores latest password input, is updated in the typeHandler.
var havePassMatch = false; // to indicate that the page hasn't been visited before and that no password is matched with that web page. for now it's superficial.
var signUpPage = false; // true if current webpage is a register/signup page.
var allowToDatabase = false; // if true, allows updating password database.

source = document.querySelector("input[type=password]"); // get password inputs, (if they exist).

// Check if page is register/signup page or login page.
var signUpPageSymptoms = ["create", "join", "register", "signup", "sign up"]; // registration page symptoms.
var url1 = document.URL; // get full url with all the extra slashes and extra link infos and etc.
for (var x = 0; x < signUpPageSymptoms.length; x++) {
  if (url1.includes(signUpPageSymptoms[x])) {
    signUpPage = true;
    console.log("registration page detected!");
  }
}

// function to see if given password (input parameter) is the same as any of the other passwords already in use.
function isReuse(pass1, url11) {
  //var resUno = false;
  //These are the inputs, replace these example strings with the actual string input method:
  webURL = url11;
  webPass = pass1;
  webEntry = [webURL, webPass];
  entry = [webURL, webPass];

  //We load list from storage. The storage name is "webList":
  //var loadedList = JSON.parse(localStorage.getItem("webList"));

  //Checking if password is in database. If it is, the console will output a warning and the list will not grow.
  //If the password is unused, it is added to the list alongside its URL:
  //The list is an array that goes[[url,password],[url,password],[url,password],etc.]
  inList = false;
  if(loadedList != null) {
      for (var i = 0; i < loadedList.length; i++) {
          console.log("loop");
          if (loadedList[i][1] == (webPass)) {
              console.log("Warning 1: Password already in database.");
              inList = true;
              return true;
              break;
          }
      }
      if(!inList) {
          console.log("not found in list");
          if (allowToDatabase == true) {
            //console.log("Added to database.");
            //loadedList.push(webEntry); // only if register button is pressed
          }
      }
  }
  else{
    if (allowedToDatabase == true) {
      //console.log("Added to database.");
      //loadedList = [webEntry]; // only if register button is pressed
    }
  }

  //Saving the list into storage as "webList" again:
  //localStorage.setItem("webList", JSON.stringify(loadedList));
  return false;
  //return resUno;
}

// function to see if given page url has a matching password.
function checkForPass(urlurl) {
  var hasIt = false;
  // put code from wrongPassword.js here, need to modify some stuff either in your code and/or in wrongPassword.js.
  //These are the inputs, replace these example strings with the actual string input method:
  webURL = "exampleURL";
  webPass = "examplePassword";

  //We load list from storage. The storage name is "webList":
  //var loadedList1 = JSON.parse(localStorage.getItem("webList"));

  //Checking if the list has the URL, and if it does, whether the input password matches the URL's corresponding password
  //If passwords don't match a warning is given in the console
  //The list is an array that goes[[url,password],[url,password],[url,password],etc.]
  if(ll2 == null) {
      console.log("null here");
  }
  for (var i = 0; i < ll2.length; i++) {
      console.log("loop");
      if (ll2[i][0] == (urlurl)) { // ===
          //if (loadedList[i][1] != (webPass)) { // instead substring for now; result1; url1.includes(signUpPageSymptoms[x]
          if (ll2[i][1].includes(result1)) {
              console.log("Warning 2: Password doesn't match password recorded in storage.");
          }
          else {
              console.log("Input password matches password in database");
          }
          //break;
          return;
      }
      //alert("No such URL in database, don't type your password!");
  }
  console.log("no such URL");
  alert("No such URL in database, don't type your password!");
    //}

  // if matching pass exists, returns true, else false.
  return hasIt;
}

// get page URL (in pure format, i.e., youtube.com, not youtube.com/carSales/124253523/ashgh9832y3r2uhruweh/....).
var url = new URL(document.URL);
console.log("URL" + url.hostname);

var warnPhishing = false; // if true, then when user is typing password, user will be warned that webpage is wrong page and should stop typing pass.

// if not on registration page, then check if a password is in use for current page.
if (signUpPage == false && (source != null)) { // source != null to make sure that its a log in page
  console.log("this is a login page.");
  var hasPass = checkForPass(url); // see if current page url has a matching password
  //if (hasPass == false) { // if current page url doesn't have matching password.
  //  warnPhishing = true;
  //}
}

// get password field of webpage
//source = document.querySelector("input[type=password]"); // originally had quotations around the word password.
console.log(source);
var result1;

// register/signup button from webpage
var registerButt = document.querySelector("input[type=submit]");
console.log(registerButt);

var reused = false; // if true, then password is reused.

// ISSUE: you are requesting database checking functions upon every change of the password field, whereas the database functions expect the final password.
// SOLUTION: consider using some substring function in the database function (e.g. in wrongpassword compare )
typeHandler = function(e) {
    result1 = e.target.value;
    if (signUpPage == true) { // if on registration page, check with isReuse() if new password is the same as any of the other passwords used for other pages.
      reused = isReuse(result1, url);
    }
    if (reused == true) { // alert user that password is being reused.
      alert("Desired password already used for another page, please use another password.");
    }
    if (warnPhishing == true) { // consider alerting only if password being entered matches with other stored passwords.
      alert("BAD WEBSITE BAD WEBSITE DON'T TYPE YOUR PASSWORD INTO THIS PHISHHOLE!!!");
    }
    console.log(result1);
}

// the boolean part no longer matters, this function adds the latest password to the database when the submit button is pressed.
function changeBoolean() {
  allowToDatabase = true;
  console.log("submit button pressed.");
  if(loadedList != null){
    loadedList.push(entry);
  }
  else{
    loadedList = [entry];
  }
  localStorage.setItem("webList", JSON.stringify(loadedList));

}

// Make sure registerButt is not undefined with this if statement.
if (registerButt) {
  registerButt.addEventListener("click", changeBoolean); // add event listener to page's register button.
}

// Make sure source is not undefined with this if statement.
if (source) {
  source.addEventListener('input', typeHandler); // register for ininput on all password sources
}
