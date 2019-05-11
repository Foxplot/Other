
//These are the inputs, replace these example strings with the actual string input method:
webURL = "exampleURL";
webPass = "examplePassword";

//We load list from storage. The storage name is "webList":
var loadedList = JSON.parse(localStorage.getItem("webList"));

//Checking if the list has the URL, and if it does, whether the input password matches the URL's corresponding password
//If passwords don't match a warning is given in the console
//The list is an array that goes[[url,password],[url,password],[url,password],etc.]
if(loadedList != null) {
    for (var i = 0; i < loadedList.length; i++) {
        console.log("loop");
        if (loadedList[i][0] == (webURL)){
            if(loadedList[i][1] != (webPass)) {
                console.log("Warning 2: Password doesn't match password recorded in storage.");
            }
            else {
                console.log("Input password matches password in database");
            }
            break;
        }
    }
}





