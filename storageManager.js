var chars = ["-",".","0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];


for(x=0; x<chars.length; x++) {
    for(y=0; y<chars.length; y++) {
        var abbrev = chars[x]+chars[y]
        localStorage.setItem(abbrev, JSON.stringify(knownSites[x*chars.length+y]));
    }
}

/*
TESTING METHODS AND VARIABLES FOR OPTIMIZED SQUARE ARRAY

var d = new Date();
const start = d.getTime();
console.log("from:  "+start);
for(i=0; i<testarray.length; i++) {
    matching(testarray[i]);
}
d= new Date();
const end = d.getTime();
console.log("  to:  "+end);

function matchUrl(value, index) {
    var res = examinedSite.endsWith(value);
    return res
}
function matching(url) {
    examinedSite = url;
    var subs = url.substring(0,2);
    database = JSON.parse(localStorage.getItem(subs));
    if(database == null) {return false}
    var contained = database.some(matchUrl);
    return contained
}
*/

/*
TESTING METHODS AND VARIABLES FOR SINGLE NON-OPTIMIZED ARRAY

var knownSites = <<OUTPUT FROM makeSitesArray.py CONTAINING ARRAY OF ALL WEBSITES>>;
var d = new Date();
const start = d.getTime();
console.log("from:  "+start);
for(i=0; i<testarray.length; i++) {
    matching(testarray[i]);
}
d= new Date();
const end = d.getTime();
console.log("  to:  "+end);

function matchUrl(value, index) {
    var res = examinedSite.endsWith(value);
    return res
}
function matching(url) {
    examinedSite = url;
    var contained = knownSites.some(matchUrl);
    return contained
}
*/