/******************** Rick and Morty API https://rickandmortyapi.com/documentation/ ********/

//some URLs:
let allCharactersURL = "https://rickandmortyapi.com/api/character";

function getrickandmorty() {
  let output = document.querySelector("#rickandmorty-data");

  output.innerHTML = "";
  let randoms = [
    getRandom(590),
    getRandom(590),
    getRandom(590),
    getRandom(590)
  ]; //see helper function below

  let randomCharactersURL = allCharactersURL + "/" + randoms; //gets us four random characters with IDs between 1-591

  //get randomCharacters
  fetch(randomCharactersURL)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      console.log(json); //see what else there is
      for (let result of json) {
        console.log(result.name);
        //append the container
        output.innerHTML += `<div class="card"> <p class="caption">${result.name}</p> <img  src=${result.image} width="100" height="100"></div>`;
      }
    })
    .catch(function(e) {
      console.log("error: " + e);
      alert(e);
    });
}

/******************** Song Lyrics API https://lyricsovh.docs.apiary.io/# ********/

let baseURL = "https://api.lyrics.ovh/v1/";

function getLyrics() {
  let artistToFetch = document.querySelector("#artist").value;
  let songToFetch = document.querySelector("#song").value;
  let output = document.querySelector("#song-lyrics");

  if (artistToFetch == "" || songToFetch == "") {
    alert("Please Enter an Artist and a Song");
  } else {
    let lyricsURL = `${baseURL}${artistToFetch}/${songToFetch}`;

    fetch(lyricsURL)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        console.log(json);
        output.innerHTML = "";

        if (json.error) {
          alert(
            "🤷🏾 NO LYRICS FOUND. Check your spelling or get your facts straight."
          );
        }

        let lyrics = json.lyrics;

        lyrics = lyrics.split("\n");

        let lyricOutput = "";
        for (let lyric of lyrics) {
          console.log(lyric);
          lyricOutput += `<p class="song-lyric">${lyric}</p>`;
        }

        output.innerHTML = lyricOutput;
      });
  }
}

/******************** OMDB MOVIES  http://www.omdbapi.com/ ********/

const OMDB_KEY = "459607c5";

let ombdBaseURL = `https://www.omdbapi.com/?apikey=${OMDB_KEY}&t=`;

function getMovie() {
  let movieToFetch = document.querySelector("#movie").value;
  let yearOfMovie = document.querySelector("#year").value;
  let output = document.querySelector("#movie-output");

  output.innerHTML = "";

  let movieURL = "";

  if (movieToFetch == "") {
    alert("Please Enter a movie title, year is optional");
  } else {
    movieToFetch = movieToFetch.replace(" ", "+");
    movieURL = ombdBaseURL + movieToFetch;

    if (yearOfMovie != "") {
      //if there is a year, add it on
      movieURL = movieURL + `&y=${yearOfMovie}`;
      console.log(movieURL);
    }

    fetch(movieURL)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        console.log(json.Title);

        output.innerHTML = `<h3>${json.Title}</h3><p>Diredted by: ${json.Director}</p><p>Rated: ${json.Rated}</p><img src="${json.Poster}">`;
      });
  }
}

/******************** Recipes  https://developer.edamam.com/edamam-docs-recipe-api ********/

function getRecipe() {
  let recipeBaseURL = "https://api.edamam.com/search?q=";
  let output = document.querySelector("#recipe-output");
  let query = document.querySelector("#recipe-query").value;

  output.innerHTML = "";
  console.log(query);

  if (query == "") {
    alert(
      "Plese make sure to add a recipe query term, like chicken or eggplant"
    );
  } else {
    recipeBaseURL += `${query}&app_id=${RECIPE_APP_ID}&app_key=${RECIPE_KEY}`;

    console.log(recipeBaseURL);

    fetch(recipeBaseURL)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        
        console.log(json)
        let randomIndex = getRandom(9);

        let recipeTitle = json.hits[randomIndex].recipe.label;
        let recipeImage = json.hits[randomIndex].recipe.image;
        let ingredients = json.hits[randomIndex].recipe.ingredients;
        let recipeURL = json.hits[randomIndex].recipe.url;
        let recipeSource = json.hits[randomIndex].recipe.source;

        let ingredientList = "";

        for (let ingredient of ingredients) {
          //build the list items dynamically and add them below
          ingredientList += `<li>${ingredient.text}</li>`;
        }

        output.innerHTML += `<h3>${recipeTitle}</h3>
                             <br/><div class"recipe-card">
                             <img onclick(alert("eh"))class="recipe-img" src="${recipeImage}"/>
                             <ul class="ingredients">${ingredientList}</ul>
                             <p>Recipe is at: <a href="${recipeURL}">${recipeSource}</a></p>
                             </div>`;
      });
  }
}

//helper functions

function getRandom(max) {
  let random = Math.floor(Math.random() * max) + 1;
  return random;
}


//API keys
 
const RECIPE_KEY = "becf8090d02a79381d5e42ef86d05cd6";
const RECIPE_APP_ID = "dc06ca04";
 