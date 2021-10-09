/////// Getting a DOM maniputlation /////////////////////////

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById('loader');

////////////////////////////////     This is done by a Fetching data from api     ////////////////////////

// Global variable
let apiQuotes;

// Show Loading
function loading() {
loader.hidden = false;
quoteContainer.hidden = true;
};

// Hide Loading 
function complete() {
quoteContainer.hidden = false;
loader.hidden= true;
};

// Show New Quote
function newQuote(text, author) {
  loading();
  // Pick a random quote from a apiQuotes array

  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  // Check if Author field is blank and replace it with unknow
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }

  // Check quote length to determine styling
  if (quote.text.length > 60) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  // Set Quote, Hide Loader
  quoteText.textContent = quote.text;
  complete();
}

// Fetch api for Quotes
const fetchQuotes = async function () {
  loading();
  const apiUrl = "https://type.fit/api/quotes";

  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    //  Catch Error Here
    console.error(`Error: ${error} 🔥🔥🔥`);
  }
};

// Tweet Quote
const tweetQuote = function () {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
};

// Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
fetchQuotes();


/*
/////////////////// Getting Quote from local javascript File ////////////////////////
import { localQuotes } from "./quotes.js";

// Show new Quote
const getQuote = function () {

  //Pick a random quote from localQuotes
  const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
  console.log(quote);
  document.getElementById('quote').innerHTML= quote.text;
  document.querySelector('.author').innerHTML= quote.author;
  
  
};

// getQuote();

const button = document.querySelector('#new-quote');

button.addEventListener('click', function() {
    getQuote();
} )

*/
