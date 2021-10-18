let poke1, poke2, button, container;

function enterGame() {
  console.log("enter game");
  document.querySelector("#welcome").style.visibility = "hidden";
  document.querySelector("h1").style["font-size"] = "48px";
  document.querySelector("h1").style["text-shadow"] = "1px 5px rgb(85,85,82)";
  document.querySelector("#arena").style.visibility = "hidden";
  document.querySelector("#start").style.display = "flex";

  let bodyElem = document.querySelector("body");
  bodyElem.style.display = "flex";
  bodyElem.style["background-image"] =
    "linear-gradient(to bottom right, #e69846, #f7d569), url(https://cdn.glitch.com/77e20f13-53d8-493e-9422-a8cb13f6c459%2Ftexture.png)";
  bodyElem.style["background-blend-mode"] = "overlay";
  bodyElem.style["justify-content"] = "flex-start";
}

function battle() {
  //only fight if both pokemon are loaded
  if (poke1 && poke2) {
    document.querySelector("#first").style.visibility = "hidden";
    document.querySelector("#second").style.visibility = "hidden";
    document.querySelector("#center").style.visibility = "hidden";
    
    //set a variable to elements that need to have properties or event listeners set
    let resultContainer = document.querySelector("#result"); 
    resultContainer = document.querySelector("#result");
    resultContainer.style.display = "flex";

    let winner = calculateWinner(); //returns the winner object

    let winnerStatement = document.createElement("h2");
    winnerStatement.innerHTML = `${winner.name} is the winner!`;
    winnerStatement.style.color = "red";

    let winnerImg = document.createElement("img");
    winnerImg.classList.add("poke-img-win");
    winnerImg.src = `${winner.frontImg}`;

    resultContainer.append(winnerStatement, winnerImg);

    

     
  } else {
    alert("Please load Pokemon before continuing!");
  }
}

function getPokemon(clicked) {
  
  //this function is the event listener, and takes in the target element
  let buttonID = "#" + clicked.currentTarget.id; //to build the id string we need below

  button = document.querySelector(buttonID);

  let offset = Math.floor(Math.random() * 800);

  let randomPokemonURL = `https://pokeapi.co/api/v2/pokemon/?limit=1&offset=${offset}`;

  fetch(randomPokemonURL)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
    
     /* the lines below do the same thing, notice the [] vs the . notation */
    
      //let pokemonToSet = json.results[0]["name"];
      let pokemonToSet = json.results[0].name
     
      setPokemon(pokemonToSet);
    });
}

function setPokemon(pokeToSet) {
  
  //create a blank object
  let pokemon = {
    name: "",
    frontImg: "",
    backImg: "",
    speed: 0,
    defense: 0,
    attack: 0,
    hp: 0
  };
  //api needs a name
  let fetchURL = `https://pokeapi.co/api/v2/pokemon/${pokeToSet}`;

  fetch(fetchURL)
    .then(function(result) {
      return result.json();
    })
    .then(function(pokeData) {
      
    //some data we can display, set as object properties
      pokemon.name = pokeData.species.name.toUpperCase();
      pokemon.frontImg = pokeData.sprites.front_default;
      pokemon.backImg = pokeData.sprites.back_default;
      pokemon.speed = pokeData.stats[0].base_stat;
      pokemon.defense = pokeData.stats[3].base_stat;
      pokemon.attack = pokeData.stats[4].base_stat;
      pokemon.hp = pokeData.stats[5].base_stat;

     
      //hide the button when clicked and set the pokemon object
      if (button.id == "getPoke1") {
        poke1 = pokemon;
        document.querySelector("#getPoke1").style.visibility = "hidden";
        
      } else {
        poke2 = pokemon;
        document.querySelector("#getPoke2").style.visibility = "hidden";
        
      }
      
      displayPokemon(pokemon);
    });
}

function displayPokemon(pokemon) {
  //takes in a string with the pokemon name

  let pokeImg = document.createElement("img");
  pokeImg.classList.add("poke-img");
  pokeImg.src = pokemon.frontImg;

  //need to attach to the parent div, since the button is invisible now
  button.parentElement.prepend(pokeImg); 

  let statsContainer = document.createElement("div");
  statsContainer.classList.add("pokemon-stats");

  let pokeName = document.createElement("h2");
  pokeName.innerHTML = pokemon.name;

  let pokeSpeed = document.createElement("p");
  pokeSpeed.innerHTML = `Speed: ${pokemon.speed}`;

  let pokeAttack = document.createElement("p");
  pokeAttack.innerHTML = `Attack: ${pokemon.attack}`;

  let pokeDef = document.createElement("p");
  pokeDef.innerHTML = `Defense: ${pokemon.defense}`;

  statsContainer.append(pokeName, pokeAttack, pokeSpeed, pokeDef);

  button.parentElement.prepend(statsContainer);

  //turning this off improves performance :(
  if (poke1 && poke2) {
    document.querySelector("#center").style.animation =
      "pulse 1s linear infinite";
  }
}

function calculateWinner() {
  /*
  This simple algorithm just compares attack power. 
  A more complex one could be written that takes into account
  speed and defense.
  */
  
  let winner;
  if (poke1.attack > poke2.attack) {
    winner = poke1;
  } else {
    //if tied, the winner is always player 2 
    winner = poke2;
  }
  return winner;
}

function playAgain() {
  let result = document.querySelector("#result");
  result.innerHTML = ""; //clear it out again

  let playAgainBtn = document.createElement("button");
  playAgainBtn.classList.add("poke-btn");
  playAgainBtn.id = "play-again";
  playAgainBtn.innerHTML = "Play Again";
  playAgainBtn.onclick = "playAgain()";

  result.append(playAgainBtn);
  result.style.visibility = "hidden";

  let center = document.querySelector("#center");
  center.style.animation = "none";
  poke1 = undefined;
  poke2 = undefined;

  let firstContainer = document.querySelector("#first");
  firstContainer.innerHTML = "";
  let button1 = document.createElement("button");
  button1.classList.add("poke-btn");
  button1.id = "getPoke1";
  button1.innerHTML = "Get Pokemon!";
  firstContainer.append(button1);

  let secondContainer = document.querySelector("#second");
  secondContainer.innerHTML = "";
  let button2 = document.createElement("button");
  button2.classList.add("poke-btn");
  button2.id = "getPoke2";
  button2.innerHTML = "Get Pokemon!";
  secondContainer.append(button2);

  secondContainer.style.visibility = "visible";
  firstContainer.style.visibility = "visible";
  center.style.visibility = "visible";

  addEventHandlers();
}

function addEventHandlers() {
  let poke1Btn = document.querySelector("#getPoke1");
  poke1Btn.addEventListener("click", getPokemon);

  let poke2Btn = document.querySelector("#getPoke2");
  poke2Btn.addEventListener("click", getPokemon);

  let playAgainBtn = document.querySelector("#play-again");
  playAgainBtn.addEventListener("click", playAgain);
}

addEventHandlers();


