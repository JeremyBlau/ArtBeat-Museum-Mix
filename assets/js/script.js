let pictures;
let music = 1
let nextArt = null
let nextMusic = null
let nextBtnArt = document.querySelector('#next-btn')
let prevBtnArt = document.querySelector('#previous-btn')
let playBtn = document.querySelector('#play-pause-btn')
let musicSearchBtn = document.querySelector('#musicSearchBtn')
let musicSearch = document.querySelector('#musicSearch')
let nextBtnMusic = document.querySelector('#musicNextBtn')
let prevBtnMusic = document.querySelector('#musicPreviousBtn')
//Local Storage Error Handling
if (localStorage.getItem('imageLastViewed')) {
  pictures = localStorage.getItem('imageLastViewed')
} else {
  pictures = 0
}
function getMusicApi2() {
  var requestUrl = 'https://freesound.org/apiv2/sounds/' + id + '?format=json&token=eODQqUqbbKKalG98FXSFz08TDqNwc9ntofNlR2TC';
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      let preview = data.previews['preview-hq-mp3']; // Corrected property access using brackets
      new Audio(preview).play(); // Play the audio preview
      return preview
    })
    .catch(function (error) {
      console.log('Error fetching data', error);
    });
}
function getMusicApi() {
  var requestUrl = 'https://freesound.org/apiv2/search/text/?query=' + musicSearch.value + '&token=eODQqUqbbKKalG98FXSFz08TDqNwc9ntofNlR2TC';
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (nextMusic) {
        if (music < 15) {
          music++
        } else {
          music = 0
        }
      } else if (!nextMusic) {
        if (music > 0) {
          music--
        } else {
          music = 15
        }
      }
      id = data.results[music].id; // Assign the correct value to the global 'id' variable
      console.log(id);
      return id
    })
    .catch(function (error) {
      console.log('Error fetching data', error);
    });
}
function getArtApi() {
  // fetch request gets a list of all the repos for the node.js organization
  var requestUrl = 'https://api.harvardartmuseums.org/image?apikey=234ad53e-01dc-495c-8f0d-836ba0af5547&size=100';
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Next and Previous button handling
      if (nextArt) {
        if (pictures < 99) {
          pictures++
        } else {
          pictures = 0
        }
      } else if (!nextArt) {
        if (pictures > 0) {
          pictures--
        } else {
          pictures = 99
        }
      }
      //Get art image
      var baseImageUrl = data.records[pictures].baseimageurl;
      var imageElement = document.querySelector('#img')
      imageElement.src = baseImageUrl;
      var imageBox = document.querySelector('.image-box');
      imageBox.appendChild(imageElement);
      //Get art caption
      var description = data.records[pictures].caption;
      var descriptionElement = document.querySelector('#imgDesc');
      descriptionElement.textContent = description;
      var descriptionBox = document.querySelector('.art-title-description-box');
      descriptionBox.appendChild(descriptionElement)
      // Stores last image viewed
      let lastImg = pictures
      localStorage.setItem('imageLastViewed', lastImg + 1)
    })
    .catch(function (error) {
      console.log('Error fetching data:', error);
    });
}
getArtApi()
// Next and previous art api button handling
nextBtnArt.addEventListener('click', function () {
  nextArt = true
  return next
})
nextBtnArt.addEventListener('click', getArtApi)
prevBtnArt.addEventListener('click', function () {
  nextArt = false
  return next
})
prevBtnArt.addEventListener('click', getArtApi)
// Next and previous music api button handling
nextBtnMusic.addEventListener('click', function () {
  nextMusic = true
  getMusicApi()
  return nextMusic
})
// nextBtnMusic.addEventListener('click', getMusicApi2)
prevBtnMusic.addEventListener('click', function () {
  nextMusic = false
  getMusicApi()
  return nextMusic
})
musicSearchBtn.addEventListener('click', getMusicApi)
playBtn.addEventListener('click', getMusicApi2)