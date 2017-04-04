let fs = require('fs');
fs.writeFileSync('./seethis.js', 'aljdsf');

var webdriver = require('selenium-webdriver'),
  By = webdriver.By,
  until = webdriver.until;

var driver = new webdriver.Builder().forBrowser('chrome').build();


// open browser, to link, find input box, fill it up and click the button

const url = 'http://192.168.100.201/wifi/';
const MIbcode = '21750000334685';
driver.get(url);
let bcode = driver.findElement(By.css('#bcode')).then((bcode) => {
  bcode.sendKeys(MIbcode);
});

let loginBTN = driver.findElement(By.css('#submit'));

Promise.all([bcode, loginBTN]).then(([_, loginBTN]) => {
  console.log('got here at all?')
  /* loginBTN.click().then(() => {
   *   driver.close();
   * });*/
});
