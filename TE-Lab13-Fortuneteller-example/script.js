/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi" in the browser's dev tools console

let fortunes=[
  
  "Yes, but you will suffer greatly because of it.",
  "It's murky, but what is clear is that they're all gonna laugh at you!",
  "Not a chance!",
  "Why do you even ask? You already know the answer",
  "Yes. But upgrade your account to get the real answer!",
  "Well, it depends on many factors, none of which you control.",
  "If I tell you the answer, I will have to kill you.",
  "42",
  "Most likely, yes. But then again, you will probably screw it up."
  
  
]





function showFortune(){

  const randomElement = fortunes[Math.floor(Math.random() * fortunes.length)];
  
  document.querySelector(".fortune-txt").innerHTML = randomElement;

}
