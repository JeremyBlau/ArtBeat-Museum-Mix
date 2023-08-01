let pictures;
let next = null
let nextBtn = document.querySelector('#next-btn')
let prevBtn = document.querySelector('#previous-btn')

//Local Storage Error Handling
if(localStorage.getItem('imageLastViewed')){
pictures = localStorage.getItem('imageLastViewed')
} else{
  pictures = 0
}


function getApi() {
    // fetch request gets a list of all the repos for the node.js organization
    var requestUrl = 'https://api.harvardartmuseums.org/image?apikey=234ad53e-01dc-495c-8f0d-836ba0af5547&size=100';

    fetch(requestUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          // Next and Previous button handling
          if(next){
            if(pictures < 99){
                pictures++
            } else {
                pictures = 0
            }
          } else if(!next){
              if(pictures > 0){
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
getApi()
// Next and previous button handling
nextBtn.addEventListener('click', function(){
  next = true
  return next
})
nextBtn.addEventListener('click', getApi)
prevBtn.addEventListener('click', function(){
  next = false
  return next
})
prevBtn.addEventListener('click', getApi)
// End of next and previous button handling