
//These are the inputs, replace these example strings with the actual string input method:
webURL = "exampleURL";
webPass = "examplePassword2";
webEntry = [webURL, webPass];

//We load list from storage. The storage name is "webList":
var loadedList = JSON.parse(localStorage.getItem("webList"));

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
            break
        }
    }
    if(!inList) {
        loadedList.push(webEntry);
    }
}
else{
    loadedList = [webEntry];
}

//Saving the list into storage as "webList" again:
localStorage.setItem("webList", JSON.stringify(loadedList));



