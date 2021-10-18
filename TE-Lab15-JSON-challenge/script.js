let pokeID = 1   //a counter that will increment in the forEach loop below and allows us to get the right pokmemon image

/******* POKEMON **********/
fetch("/pokemon_data.json")
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    console.log(json);
    let data = json.results;

    console.log(data);

    
    let allPokemonContainer = document.querySelector("#output-container-1");
    
   
     pokeID = 1

    data.forEach(function(pokemon) {
      console.log("name >> " + pokemon.name);
       
      //create HTML elements like below
      let pokeContainer = document.createElement("div");
      let pokeName = document.createElement("p");
      
      //append to the container
      pokeName.innerText = pokemon.name;
      pokeContainer.append(pokeName);
      
      let pokeImg = document.createElement("img");

      pokeImg.srcset = `https://pokeres.bastionbot.org/images/pokemon/${pokeID}.png`
      
      pokeContainer.append(pokeImg)
      pokeContainer.classList.add("poke-container")
      
      allPokemonContainer.appendChild(pokeContainer)
      
      pokeID ++
    });
  
  console.log(" 1. number of pokemeon: " + pokeID) //
  });


console.log("2 number of pokemeon: " + pokeID) //use this to illustrate how this number will not change until 
 
/******* Dog **********/

fetch("/dog_breeds.json")
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    
   /* Challenge: Display all the dog breeds in the #output-container using .append()
    
   /* 1. log JSON data from the dog_breed.json file */
  
  /* 2. use a for-in loop on json.message to create an HTML <p> or heading with  the breed name as .innerHTML  */
   
  /* 3. add a class to your element using element.classList.add("my-class") to give it a style
  
  /* 4. define that style in the style.css file */
  
  /* 5 append the the new element to the output-container-2 */
  
  

    
  });