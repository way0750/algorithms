// get the target file from commend line
let filePath = process.argv.slice(2).join(' ');
let openurl = require("openurl");

let fs = require('fs');

let html = fs.readFileSync('./template.html', 'utf8');
html = html.replace(/pathToScript/, filePath);

fs.writeFileSync('./test.html', html);

// now open the browser

openurl.open("./test.html");

/// usr/bin/osascript
// /Users/Way/repos/algorithms/mochaTest/nodeScript.js
// /Users/Way/repos/algorithms/algorithms/Check Permutation/main.js
