"use strict";
const quote = document.querySelector(".new-quotes");
const addQuote = document.querySelector(".add-quote");
const spinner = document.querySelector(".spinner-container");

const navContainer = document.querySelector("nav");
const btnContainer = document.querySelector(".btns");
const displaySectionContainer = document.querySelector(".display-section");
const mainQuoteContainer = document.querySelector(".main-quote-container");

// Simple functions
const displaySpinner = function () {
  spinner.classList.toggle("hidden");
};

const generateQuote = async function () {
  try {
    const data = await fetch("https://api.quotable.io/quotes/random");
    // console.log(data);

    if (!data.ok) throw new Error(`${data.status} Something went wrong`);

    const res = await data.json();
    const [value] = res;
    // console.log(value);
    return {
      author: value.author,
      content: value.content,
      date: value.dateAdded,
    };
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

const renderMessage = function (container, message) {
  container.innerHTML = "";
  container.insertAdjacentHTML("afterbegin", message);
};

// Event functionalities

// handling navigation
navContainer.addEventListener("click", function (e) {
  const navElements = e.target.closest("ul").querySelectorAll("li");
  console.log(e.target);

  if (e.target.closest("ul")) {
    navElements.forEach((el) => {
      el.classList.remove("active");
    });
    e.target.classList.add("active");
  }

  // client-side rendering of selected nav
  // Home nav
  if (e.target.classList.contains("home")) {
    const markup = `
        <!-- spinner / loader -->
        <section class="spinner-container hidden">
          <div class="spinner">
          </div>
        </section>
        
        <!-- section display -->
        <section class="main-quote-container">
          <p class="message">Hello me</p>
          <p class="author">cool sage</p>
        </section>

        <!-- buttons -->
        <section class="btns">
            <button class="new-quotes">New quotes</button>
          <button class="add-quote">Add quotes</button>
        </section>
        `;
    renderMessage(displaySectionContainer, markup);
  }

  // saved quote nav
  if (e.target.classList.contains("saved-quotes-nav")) {
    const markup = `
        <section class="saved-quote-container">
            <div class="saved-quote">
            <p class="message">Hello me, I saved this quote because it's one of my favorite</p>
            <p class="author">cool sage</p>
            <button class="remove-btn">Remove quote</button>
            </div>
        </section> `;
    renderMessage(displaySectionContainer, markup);
  }
});

// handling quote
displaySectionContainer.addEventListener("click", function (e) {
  if (e.target === e.target.closest(".new-quotes")) {

    console.log(e.target)
    
    const getQuote = async function () {
      displaySpinner();
      try {
        const data = await generateQuote();
        const { content, author, date } = data;

        console.log('hi')

        // console.log(data);
        // console.log(content, author, date);

        const markup = `
            <div class="quote-container">
                <p class="message"> ${content} </p>
                <p class="author"> ${author} </p>
                <p class="date">${date}</p>
            </div>
        `;
        renderMessage(mainQuoteContainer, markup);
        displaySpinner();
      } catch (err) {
        renderMessage(mainQuoteContainer, err.message);
        displaySpinner();
        console.log(err);
      }
      console.log("w");
    };
    getQuote();
  }
});
