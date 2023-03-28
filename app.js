let quote = document.querySelector(".quote");
let text = document.querySelector(".quote_text");
let author = document.querySelector(".quote_author");
let btn = document.querySelector("button");

// This is a function named getQuote. When called, it fetches a list of quotes from the URL "https://type.fit/api/quotes". The fetch function returns a Promise that resolves to the response from the server. The first .then() method is called on that Promise and it calls the .json() method on the response to extract the JSON data from the response body. That Promise then resolves to the JSON data. The second .then() method is called on that Promise and it takes the data argument which is the JSON data. It selects a random quote from the data array and sets the text and author properties of the HTML elements with the IDs text and author, respectively.
// A Promise is a special JavaScript object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value. In this code, fetch returns a Promise that resolves to the response from the server, and .then() is used to handle the result of that Promise once it resolves.
function getQuote() {
  fetch("https://type.fit/api/quotes")
    .then((res) => res.json())
    .then((data) => {
      let index = Math.round(Math.random() * 1643);
      text.innerHTML = data[index].text;
      author.innerHTML = "-" + data[index].author;
    });

  setTimeout(() => {
    btn.classList.add("active");
  }, 3000);
}

function newQuote(e) {
  if (!e.target.matches("button.active")) return; //if what we clicked on does not match the button with a class of "active" then just return, nothing happens
  getQuote();
  btn.classList.remove("active");
}

//This line adds an event listener to the window object for the load event. When the load event is fired (i.e., when the webpage finishes loading), it calls the getQuote function.
window.addEventListener("load", getQuote);
quote.addEventListener("click", newQuote); //event delegation, insted of putting the event listener directly on an element, we put it on a parent element and listen to the target of what was clicked on, so now everywher we click will fire the function. This allow us to have event listener on every body in quote container
