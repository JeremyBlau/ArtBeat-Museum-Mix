
function getApi() {
    // fetch request gets a list of all the repos for the node.js organization
    var requestUrl = 'https://api.harvardartmuseums.org/image/465905?apikey=234ad53e-01dc-495c-8f0d-836ba0af5547';

    fetch(requestUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);

          //Get art image
          var baseImageUrl = data.baseimageurl;
          var imageElement = document.createElement('img');
          imageElement.src = baseImageUrl;
          var imageBox = document.querySelector('.image-box');
          imageBox.appendChild(imageElement);
          //Get art description
          var description = data.description;
          var descriptionElement = document.createElement('p');
          descriptionElement.textContent = description;
          var descriptionBox = document.querySelector('.art-title-description-box');
          descriptionBox.appendChild(descriptionElement);
        })
        .catch(function (error) {
          console.log('Error fetching data:', error);
        });
    }
getApi()