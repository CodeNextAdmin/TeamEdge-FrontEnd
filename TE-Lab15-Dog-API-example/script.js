//will hold all the breeds in a JSON Object
let allBreeds;
//to get all the breeds in one shot
let allbreedsURL = "https://dog.ceo/api/breeds/list/all";

//runs when the page loads so data is ready
fetch(allbreedsURL)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    //allBreeds set to the returned JSON object
    allBreeds = data.message;
  });

function displayByBreedNames() {
  //this function displays all the breed names as clickable buttons that reveal breed pics

  //remove all the child nodes/elements to clear space for our dog breed list
  document.querySelector("#choices-container").innerHTML = "";
  document.querySelector("#doggie-display").innerHTML = "";

  //use for in because its an object w/ properties we are looping over
  for (let breed in allBreeds) {
    let currentBreedName = breed;

    let breedCard = document.createElement("div");
    breedCard.classList.add("card-name", "card");

    let breedName = document.createElement("span");
    breedName.classList.add("dogName");
    breedName.innerHTML = currentBreedName;
    breedCard.append(breedName);
    breedCard.setAttribute("name", currentBreedName); //we can store an attribute, name is a common one to use.

    /* 
       HTML elements are objects, and can be assigned attributes
       for example we can add something like breedCard.myAttributeIJustMadeUp
       and then we can read that attribute later, in the function we pass into the event listener      
     */
    breedCard.breed = currentBreedName;
    breedCard.addEventListener("click", displayChosenBreed);

    let breedsContainer = document.querySelector("#doggie-display");

    //append the container with the new card
    breedsContainer.append(breedCard);
  }
}

function displayChosenBreed(clicked) {
  //this function takes in the click event and grabs the attribute of the target Element
  let breedToFetch = clicked.currentTarget.breed;

  //now fetch 30 random pics of the chosen breed

  let breedUrl = `https://dog.ceo/api/breed/${breedToFetch}/images/random/30`;

  fetch(breedUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data.message);

      //clear the screen again
      document.querySelector("#choices-container").innerHTML = "";
      document.querySelector("#doggie-display").innerHTML = "";

      let breedImgages = data.message;
      let nameDisplay = document.createElement("h1");
      nameDisplay.innerHTML = breedToFetch;
      let display = document.querySelector("#doggie-display");

      display.append(nameDisplay);

      /*
     use for of because its an array we can interate over
     for more info on this distinction, check this link:
      https://alligator.io/js/for-of-for-in-loops/
    */
      for (let pic of breedImgages) {

        let imageCard = document.createElement("div");
        imageCard.classList.add("card-name", "card");

        let dogImg = document.createElement("img");
        dogImg.classList.add("dog-photo");
        dogImg.src = pic;
        imageCard.append(dogImg);

        display.append(imageCard);
      }
    });
}

function displayByBreedPhotos() {
  console.log(allBreeds);

  //clear the screen again
  document.querySelector("#choices-container").innerHTML = "";
  document.querySelector("#doggie-display").innerHTML = "";

  let breedURL = " ";

  for (let breed in allBreeds) {
    breedURL = `https://dog.ceo/api/breed/${breed}/images/random/1`;

    fetch(breedURL)
      .then(function(response) {
        return response.json();
      })
      .then(function(photoURL) {
        //the actual URL is located inside an array, as the zero index, inside the messages attribute...
        //console.log(photoURL)
        //console.log(photoURL.message[0])

        let breedImgURL = photoURL.message[0];

        let imageContainer = document.createElement("div");

        imageContainer.classList.add("card-photo", "card");

        let breedImg = document.createElement("img");
        breedImg.classList.add("dog-photo");

        let breedName = document.createElement("p");
        breedName.classList.add("dogName");
        breedName.innerHTML = breed;

        breedImg.src = breedImgURL;

        imageContainer.append(breedImg);
        imageContainer.append(breedName);

        document.querySelector("#doggie-display").append(imageContainer);
      });
  }
}

function displayByRandom() {
  document.querySelector("#choices-container").innerHTML = "";
  document.querySelector("#doggie-display").innerHTML = "";

  /*     
    allBreeds is an Object, not an array so in order to get a random breed, we have to turn it into one
    by calling Object.keys, which returns an array of all the properites.    
    */

  let breedsArray = Object.keys(allBreeds);
  // a random number based on the number of breeds in the array
  let randomNumber = Math.floor(Math.random() * breedsArray.length);
  let randomBreed = breedsArray[randomNumber];
  let nameDisplay = document.createElement("h1");
  nameDisplay.innerHTML = randomBreed;

  let display = document.querySelector("#doggie-display");

  display.append(nameDisplay);

  let breedUrl = `https://dog.ceo/api/breed/${randomBreed}/images/random/30`;

  fetch(breedUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      let breedPics = json.message;

      for (let pic of breedPics) {
        let imageContainer = document.createElement("div");

        imageContainer.classList.add("card", "card-photo");

        let dogImage = document.createElement("img");
        dogImage.classList.add("dog-photo");
        dogImage.src = pic;

        imageContainer.append(dogImage);

        document.querySelector("#doggie-display").append(imageContainer);
      }
    });
}
