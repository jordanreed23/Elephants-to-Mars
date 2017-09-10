var form = document.getElementById("movie-title");
// var films = document.getElementById("movies");
var earth = document.getElementsByClassName('earth-container')[0];
var images = document.getElementsByClassName('image');

// function createTag(inputTag) {
//   var tag = document.createElement(inputTag);
//   if (inputTag === 'img') {
//     tag.setAttribute('class', 'added image');
//   } else {
//     tag.setAttribute('class', 'added');
//   }
//   return tag;
// }
//
// function getData(movie) {
//   var h4Tag = createTag('h4');
//   var imgTag = createTag('img');
//   h4Tag.innerText = movie.Title + '\n(' + movie.Year + ')';
//   imgTag.setAttribute('src', movie.Poster);
//   result.append(h4Tag, imgTag);
//   return movie.imdbID;
// }

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
          // var imgTag =  document.createElement('img');
          // var date = results[0].date.split(' ');
          // date[0] = date[0].split('-').join('/');
          // console.log(date[0]);
          // var img = "https://epic.gsfc.nasa.gov/archive/natural/" + date[0] + "/jpg/" + results[0].image + '.jpg';
          // console.log(img);
          // imgTag.setAttribute('src', img);
          // result.append(imgTag);
        });
    });
}

function clearData() {
  var toRemove = document.getElementsByClassName('added');
  while (toRemove[0]) {
    toRemove[0].parentNode.removeChild(toRemove[0]);
  }
}

// form.addEventListener('submit', function(event) {
//   event.preventDefault();
//   result.innerHTML = '';
//   // var id = getId();
//   fetchData();
// });

fetchData();
var counter = 0;

$(document).ready(function() {
    var _intervalId;

    function fadeInLastImg()
    {
        var backImg = $('.earth-container img:first');
        backImg.hide();
        backImg.remove();
        $('.earth-container' ).append( backImg );
        backImg.fadeIn(400);
    }

    _intervalId = setInterval( function() {
        if (counter > 1){
          console.log('yes');
          $('.welcome').fadeTo(7000, 1);
        }
        counter++;
        fadeInLastImg();
    }, 1500 );

});

// $(document).on('click', '.image', function(){
//   var pTag = document.createElement('p');
//   pTag.innerText = 'helllllo';
//     // result.append(pTag);
//   // console.log('clicked');
// });
