//******** API URLs to experiemnt with ************************************

let pokeURL = "https://pokeapi.co/api/v2/pokemon/";

let ghibli = "https://ghibliapi.herokuapp.com/people";

const dog = "https://dog.ceo/api/breeds/image/random";

//Use the URL below to make your own call and display it using the function below
const API_URL = "";

let pokemonToFind = "";

//***************GET DOG DATA *************************

function getDogData() {
  fetch(dog) //change to real api url
    .then(function(response) {
      return response.json();
    })
    .then(function(jsonData) {
      console.log(jsonData);

      //let dataToDisplay = jsonData.abilities[0].ability.name

      let dogImg = jsonData.message;

      console.log("data to display >> " + dogImg);

      //document.querySelector("#display-dog-data").innerHTML = dataToDisplay;

      document.querySelector("#display-dog-img").src = dogImg;
    })
    .catch(function(error) {
      // This is where you run code if the server returns any errors

      console.log(error);
    });
}

//***************GET POKEMON DATA *************************

function getPokeData() {
  pokemonToFind = document.querySelector("#pokemon-name").value;
  let search = pokeURL + pokemonToFind;

  console.log("search: " + search);

  if (pokemonToFind) {
    fetch(search)
      .then(function(response) {
        return response.json();
      })
      .then(function(jsonData) {
        console.log(jsonData);  //use this log statement to see what you get in your JSON

        //let dataToDisplay = jsonData.abilities[0].ability.name

        let dataToDisplay = jsonData.name;
        let imgToDisplay = jsonData.sprites.front_shiny; //there are other sprites

        console.log("data to display >> " + dataToDisplay);

        document.querySelector("#display-poke-data").innerHTML = dataToDisplay;

        //we can also store the element if we want to do more thigns to it.
        let imageElement = document.querySelector("#display-poke-img");

        imageElement.src = imgToDisplay;
        imageElement.style.visibility = "visible"; //this is how you can set the style programatically
      })
      .catch(function(error) {
        // This is where you run code if the server returns any errors

        console.log(error);
        document.querySelector("#display-poke-data").innerHTML = error;
      });
  } else {
    alert("please enter a pokemon name");
  }
}

function getYourOwnData() {
  fetch(API_URL)
    .then(function(response) {
      return response.json();
    })
    .then(function(jsonData) {
      console.log(jsonData);

      /* Use this function to grap your own url and display it, or log it. */
    
    
    
    })
    .catch(function(error) {
      // This is where you run code if the server returns any errors

      console.log(error);
    });
}
