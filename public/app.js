//////----Declare Global Variables ----//////

var form = document.getElementById("user-selection");
var formRandom = document.getElementById("randomize");
var earth = document.getElementsByClassName('earth-container')[0];
var header = document.getElementsByClassName('welcome')[0];
var box1 = document.getElementsByClassName('box1')[0];
var box2 = document.getElementsByClassName('box2')[0];
var select1 = document.getElementsByClassName('first')[0];
var select2 = document.getElementsByClassName('second')[0];
var countPara = document.getElementById('theCount');
var objImg = document.getElementById('object-image');
var destImg = document.getElementById('destination-image');
var funFact = document.getElementById('fun-fact');

var counter = 0;

/////------ Functions------////////

function getEarth(results) {
  for (var i = 0; i < results.length; i++) {
    var imgTag = document.createElement('img');
    var date = results[i].date.split(' ');
    date[0] = date[0].split('-').join('/');
    var img = "https://epic.gsfc.nasa.gov/archive/natural/" + date[0] + "/jpg/" + results[i].image + '.jpg';
    imgTag.setAttribute('src', img);
    earth.append(imgTag);
  }
}

function fetchNasa() {
  fetch('https://epic.gsfc.nasa.gov/api/natural')
    .then(function(response) {
      return response.json()
        .then(function(results) {
          console.log(results);
          getEarth(results);
        });
    });
}

function createDataSet() {
  for (var key1 in data.objects) {
    var option1 = document.createElement('option');
    option1.innerText = key1;
    option1.setAttribute('value', key1);
    box1.append(option1);
  }
  for (var key2 in data.destinations) {
    var option2 = document.createElement('option');
    option2.innerText = key2;
    option2.setAttribute('value', key2);
    box2.append(option2);
  }
}

function submitted(objectIn, destinationIn) {
  $(".mars-container").animate({
    opacity: '0'
  }, 500);
  $(".object-container").animate({
    opacity: '0'
  }, 500);
  $("#theCount").animate({
    opacity: '0'
  }, 500);
  $("#fun-fact").animate({
    opacity: '0'
  }, 500);

  setTimeout(function() {
    objImg.setAttribute('src', '');
    destImg.setAttribute('src', '');
    fetchData(objectIn, destinationIn);
    changeSizes(destinationIn);
  }, 500);

  setTimeout(function() {
    $(".mars-container").animate({
      opacity: '1'
    }, 1000);
    $(".object-container").animate({
      opacity: '1'
    }, 1000);
    $("#theCount").animate({
      opacity: '1'
    }, 1000);
  }, 1000);

  setTimeout(function() {
    $("#fun-fact").animate({
      opacity: '1'
    }, 4000);
  }, 2000);
}


function fetchData(objectIn, destinationIn) {
  var obOb = data.objects[objectIn];
  var distOb = data.destinations[destinationIn];
  var solution = distOb.distance / obOb.width;
  var factMath = 0;
  countPara.innerText = makeReadable(solution);
  objImg.setAttribute('src', obOb.img);
  destImg.setAttribute('src', distOb.img);

  if (obOb.fact[4] === 'tiny') {
    factMath = makeReadable((obOb.fact[3] * solution) / obOb.fact[2]);
  } else if (obOb.fact[4] === 'speed') {
    factMath = makeReadable((distOb.distance / obOb.fact[2]) / obOb.fact[3]);
  } else if (obOb.fact[4] === 'weight') {
    factMath = makeReadable(obOb.fact[2] * solution);
  }
  funFact.innerText = obOb.fact[0] + factMath + obOb.fact[1];
}

function makeReadable(number) {
  var start = 3;
  if (number > 1000) {
    number = Math.round(number);
    $("#theCount").css("background-color", "transparent");
  } else if (number < 0.005) {
    number = Math.round(number * 1000000) / 1000000;
    // start = 6;
    $("#theCount").css("background-color", "black");
    return number;
  } else {
    number = Math.round(number * 100) / 100;
    start = 6;
    $("#theCount").css("background-color", "black");
  }
  var newNum = number.toString().split('');
  for (var j = 0; j < newNum.length; j++) {
    if (newNum[j] === 'e' || newNum[j] === '+') {
      $("#theCount").css("background-color", "black");
      return newNum.join('');
    }
  }
  var reverseNew = newNum.reverse();
  for (var i = start; i < reverseNew.length; i += 4) {
    reverseNew.splice(i, 0, ',');
  }
  var restore = reverseNew.reverse();
  return restore.join('');
}

function changeSizes(destinationIn) {
  $(".mars-container img").animate({
    width: data.destinations[destinationIn].earthRelative[0],
    right: data.destinations[destinationIn].earthRelative[1],
    top: data.destinations[destinationIn].earthRelative[2]
  }, 0);
}

function getRandom(data) {
  var list = Object.keys(data);
  var value = Math.floor(Math.random() * list.length);
  return list[value];
}
//////------ Beginning------- ////////

fetchNasa();
createDataSet();

$(document).ready(function() {
  var _welcomeInterval;
  var fadeTime = 2000;

  function fadeInLastImg() {
    var backImg = $('.earth-container img:first');
    backImg.hide();
    backImg.remove();
    $('.earth-container').append(backImg);
    backImg.fadeIn(400);
  }

  _welcomeInterval = setInterval(function() {
    if (counter >= 1 && counter < 2) {
      $('.welcome').fadeTo(fadeTime, 1);
    } else if (counter > 4 && counter < 6) {
      $('.welcome').fadeTo(fadeTime, 0);
    } else if (counter > 6 && counter < 8) {
      $('.welcome').fadeTo(fadeTime, 1);
      header.style.fontSize = '30px';
      header.style.margin = '22px';
      header.innerText = 'How many elephants between Earth and Mars?';
    }

    counter++;
    if (counter < 11) {
      fadeInLastImg();
    }
    if (counter < 15) {
      if (counter > 10) {
        $(".earth-container img").animate({
          width: "10%",
          left: "10%",
          top: "40%"
        }, fadeTime);
      }
      if (counter > 11) {
        $(".mars-container img").animate({
          opacity: '1'
        }, 1000);
      }
      if (counter > 12) {
        $('.welcome').fadeTo(fadeTime / 2, 0);
        $(".object-container img").animate({
          opacity: '1'
        }, 1000);
      }
      if (counter > 13) {
        $(".user-form").css("display", "flex");
        $(".welcome").css("display", "none");
        $(".user-form").animate({
          opacity: '1'
        }, 1000);
        $(".value").animate({
          opacity: '1'
        }, 1000);
        $(".fact").animate({
          opacity: '1'
        }, 1000);
        // $(".background-layer").fadeTo(fadeTime, 1);
      }
    }
  }, 1200); //1200 after testing
});

form.addEventListener('submit', function(event) {
  event.preventDefault();
  var objectIn = event.target.elements.object.value;
  var destinationIn = event.target.elements.destination.value;
  submitted(objectIn, destinationIn);
});

formRandom.addEventListener('submit', function(event) {
  event.preventDefault();
  var objectIn = getRandom(data.objects);
  var destinationIn = getRandom(data.destinations);
  select1.innerText = objectIn;
  select1.setAttribute('value', objectIn);
  select2.innerText = destinationIn;
  select2.setAttribute('value', destinationIn);
  $('.box1').val(objectIn);
  $('.box2').val(destinationIn);
  submitted(objectIn, destinationIn);
});
