const quoteEl = document.getElementById("quote");
const authorEl = document.getElementById("author");
const newBtn = document.getElementById("newQuote");
const copytBtn = document.getElementById("copy-button");
const quoteDiv = document.getElementById("quoteDiv");

async function fetchQuotes() {
  const response = await fetch("/quotes.json");
  const data = await response.json();
  return data.quotes;
}

function getRandomQuote(quotes) {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}

async function displayQuote() {
  try {
    const quotes = await fetchQuotes();
    const randomQuote = getRandomQuote(quotes);

    quoteEl.textContent = randomQuote.quote;
    authorEl.textContent = randomQuote.author;
  } catch (error) {
    console.error("Failed to load the quotes: ", error);
  }
}

newBtn.addEventListener("click", displayQuote);

copytBtn.addEventListener("click", async () => {
  const quoteToCopy = quoteDiv.innerText;

  try {
    await navigator.clipboard.writeText(quoteToCopy);
    copytBtn.innerText = "Copied!";
    setTimeout(() => {
      copytBtn.innerText = "Copy Quote";
    }, 2000);
  } catch (err) {
    console.error("Failed to copy text: ", err);
    alert("Could not copy text. Please try manually.");
  }
});

displayQuote();
