



function getApi() {
    // fetch request gets a list of all the repos for the node.js organization
    var requestUrl = 'https://api.harvardartmuseums.org/image/465905?apikey=234ad53e-01dc-495c-8f0d-836ba0af5547';

    fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Get the baseimageurl from the API response
      var baseImageUrl = data.baseimageurl;

      // Create a new image element
      var imageElement = document.createElement('img');

      // Set the src attribute of the image to the baseimageurl
      imageElement.src = baseImageUrl;

      // Get the image-box element from the DOM
      var imageBox = document.querySelector('.image-box');

      // Append the image element to the image-box
      imageBox.appendChild(imageElement);
})}
getApi()