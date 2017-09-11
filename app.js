var form = document.getElementById("user-selection");
var earth = document.getElementsByClassName('earth-container')[0];
var header = document.getElementsByClassName('welcome')[0];

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

function fetchData() {
  fetch('https://epic.gsfc.nasa.gov/api/natural')
    .then(function(response) {
      return response.json()
        .then(function(results) {
          console.log(results);
          getEarth(results);
        });
    });
}

// function clearData() {
//   var toRemove = document.getElementsByClassName('added');
//   while (toRemove[0]) {
//     toRemove[0].parentNode.removeChild(toRemove[0]);
//   }
// }

// form.addEventListener('submit', function(event) {
//   event.preventDefault();
//   result.innerHTML = '';
//   // var id = getId();
//   fetchData();
// });

fetchData();
var counter = 0;

$(document).ready(function() {
  var _welcomeInterval;
  var fadeTime = 2000;
  // var _moveEarthInterval;

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
      console.log('change');
      header.style.fontSize = '30px';
      header.style.margin = '22px';
      header.innerText = 'How many elephants between Earth and Mars?';
    }
    // console.log(counter);
    counter++;
    if (counter < 11) {
      fadeInLastImg();
    }
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
      // $("body").css("background-image","url(https://i.ytimg.com/vi/EZ7la-hMNuk/maxresdefault.jpg)").fadeIn(4000);
    }
    if (counter > 13){
      $(".user-form").css("display","flex");
      $(".welcome").css("display","none");
      $(".user-form").animate({
        opacity: '1'
      }, 1000);
      $(".value").animate({
        opacity: '1'
      },1000);
      $(".background-layer").fadeTo(fadeTime, 1);
    }
  }, 1200); //1200 after testing
});

// $(document).on('click', '.image', function(){
//   var pTag = document.createElement('p');
//   pTag.innerText = 'helllllo';
//     // result.append(pTag);
//   // console.log('clicked');
// });
