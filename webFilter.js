var lastrequest = "google.com";
var database = [];
var examinedSite = "";
var chars = ["-",".","0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

function matchUrl(value, index) {
    var res = examinedSite.endsWith(value);
    return res

}

function matching(url) {
    examinedSite = url;
    var abbrev = url.substring(0,2);
    database = JSON.parse(localStorage.getItem(abbrev));
    var contained = database.some(matchUrl);
    return contained
}

function checkFilt(url) {
    var det = new URL(url)
    var full = det.hostname;
    var nosubdomain = full.split('.');
    nosubdomain.shift();
    var host = nosubdomain.join('.');
    console.log(host+"    is different from:  "+lastrequest+"     and the matching i");
    if(host != lastrequest) {
        if(!matching(host)) {
            lastrequest = host;
            var confi = window.confirm('the page: "'+host+'"is not in ALexa Top 1Mil. Do you still wish to visit this page?');
            if(confi == true) {
                var store = window.confirm("would you like to permanently allow: "+host);
                if(store == true) {
                    var tomod = JSON.parse(localStorage.getItem(host.substring(0,2)));
                    tomod.push(host);
                    tomod.sort();
                    localStorage.setItem(host.substring(0,2), JSON.stringify(tomod));
                }
            }
            confi = true;
            if(confi == false) {return true};
       }
    }
    return false
}

chrome.webRequest.onBeforeRequest.addListener(
        function(details) {
        var canc = checkFilt(details.url);
        if(canc == true) {return {cancel: true}};
        },
        {urls: ["<all_urls>"]},
        ["blocking"]);
