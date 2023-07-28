let i = 0
let next = null
let nextBtn = document.querySelector('#next-btn')
let prevBtn = document.querySelector('#previous-btn')
function getApi() {
    // fetch request gets a list of all the repos for the node.js organization
    var requestUrl = 'https://api.harvardartmuseums.org/image?apikey=234ad53e-01dc-495c-8f0d-836ba0af5547';

    fetch(requestUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
            if(next){
              i++
            } else if(!next && i > 0){
              i--
              }
          
          console.log(i)
          console.log(data)
          //Get art image
          var baseImageUrl = data.records[i].baseimageurl;
          var imageElement = document.createElement('img');
          imageElement.src = baseImageUrl;
          var imageBox = document.querySelector('.image-box');
          imageBox.appendChild(imageElement);
          //Get art description
          var description = data.records[i].caption;
          var descriptionElement = document.createElement('p');
          descriptionElement.textContent = description;
          var descriptionBox = document.querySelector('.art-title-description-box');
          descriptionBox.appendChild(descriptionElement)
        })
        .catch(function (error) {
          console.log('Error fetching data:', error);
          
        });
    }
getApi()
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
