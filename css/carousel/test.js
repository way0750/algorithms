var allImgEle = document.getElementById('car').childNodes;
allImgEle = Array.apply([], allImgEle);
allImgEle = allImgEle.filter( (ele) => {
  return ele.nodeName !== '#text';
});
allImgEle.forEach((ele, index) => {
  ele.style.cssText = "left: " + (imgWidth * index) + "px";
});





var imgWidth = 240;
var curIndex = Math.floor(allImgEle.length/2);

var car = document.getElementById('car');
var buttons = document.getElementById('buttons');
var radioInput = Array.apply(null, buttons.childNodes).reduce( (radioInputList, node) => {
  if (node.childNodes[0] && node.childNodes[0].nodeName === 'INPUT') {
    radioInputList.push(node.childNodes[0]);
  }
  return radioInputList;
}, []);

var clickHandler = function (parentNode, eleIndex) {
  //need to get parent's width
  curIndex = +eleIndex;
  var parentWidth = parentNode.getBoundingClientRect().width;
  var midIndex = parentWidth/2 - imgWidth/2;
  var leftestPos = (-eleIndex * imgWidth + midIndex);
  //loop through every single image
  allImgEle.forEach( (ele, index) => {
    var distance = leftestPos + index * imgWidth;
    var css = "left: " + distance + "px; ";
    if (eleIndex === index) {
      css += "transform: scale(1.4); z-index: 100;";
    } else {
      if (index < curIndex) {
        css += "-webkit-transform: rotateY(45deg); z-index:" + index + ';';
      } else if (index > curIndex) {
        css += "-webkit-transform: rotateY(-45deg); z-index:" + (allImgEle.length - index) + ';';
      }
      
    }
    ele.style.cssText = css;
  });

  //also go through all radio input to activate the right one in case the image is clicked instead of the radio input
  radioInput.forEach( (ele) => {
    ele.checked = +ele.id === curIndex;
  });
  window.requestAnimationFrame(function(){});
};

car.addEventListener('click', (event) => {
    if (event.target.nodeName === 'IMG') {
      window.requestAnimationFrame(() => {
        clickHandler(car, +event.target.id);
      });
    }
});


buttons.addEventListener('click', (event) => {
    if (event.target.nodeName === 'INPUT') {
      debugger;
      window.requestAnimationFrame(() => {
        clickHandler(car, +event.target.id);
      });
    }
});

window.onresize = function () {
  clickHandler(car, curIndex);
};

//center initially
// clickHandler(car, curIndex);

window.requestAnimationFrame(() => {
  clickHandler(car, curIndex);
});
