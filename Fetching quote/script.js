"use strict";
const quote = document.querySelector(".new-quotes");
const addQuote = document.querySelector(".add-quote");
const spinner = document.querySelector(".spinner-container");

const navContainer = document.querySelector("nav");
const btnContainer = document.querySelector(".btns");
const displaySectionContainer = document.querySelector(".display-section");
const mainQuoteContainer = document.querySelector(".main-quote-container");

// State variables
let state = {};


// Simple functions
const displaySpinner = function (spin) {
  spin.classList.toggle("hidden");
};

const generateQuote = async function () {
  try {
    const data = await fetch("https://api.quotable.io/quotes/random");

    if (!data.ok) throw new Error(`${data.status} Something went wrong`);

    const res = await data.json();
    const [value] = res;
    console.log(value);
    return {
      author: value.author,
      content: value.content,
      date: value.dateAdded,
    };
  } catch (err) {
    console.error(err.message + err.status);
    throw err;
  }
};

const renderMessage = function (container, message) {
    console.log(container);
  container.innerHTML = "";
  container.insertAdjacentHTML("afterbegin", message);
};


// ========= Event functionalities ===============

// handling navigation
navContainer.addEventListener("click", function (e) {
  const navElements = e.target.closest("ul").querySelectorAll("li");
//   console.log(e.target);

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
          <div class="spinner">  </div>
        </section>
        
        <!-- section display -->
        <section class="main-quote-container">
          <p class="message">Hello me</p>
          <ul> <li> New quote will help you generate new quote </li>
          <li> Add quotes will save your favorite quote </li>
          <p class="author">cool sage</p>
        </section>

        <!-- buttons -->
        <section class="btns">
            <button class="new-quotes">New quotes</button>
          <button class="add-quote">Add quotes</button>
        </section>
        `;
    renderMessage(displaySectionContainer, markup);

    return state = {
        spinner: document.querySelector('.spinner-container'),
        mainQuoteContainer: document.querySelector('.main-quote-container'),
    }

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

    
    const getQuote = async function () {
      displaySpinner(state.spinner);
      try {
        const data = await generateQuote();
        console.log(data)
        const { content, author, date } = data;

        const markup = `
            <div class="quote-container">
                <p class="message"> ${content} </p>
                <p class="author"> By: ${author} </p>
                <p class="date">${date}</p>
            </div>
        `;
        renderMessage(state.mainQuoteContainer, markup);
        displaySpinner(state.spinner);
      } catch (err) {
        renderMessage(state.mainQuoteContainer, err.message);
        displaySpinner(state.spinner);
        // console.error(err);
      }
      console.log("w");
    };
    getQuote();
  }
});

window.addEventListener('load', function() {
    console.log(displaySectionContainer);
    const markup = `
        <section class="header-container">
            <h1 class="heading"> Quote Generator </h1>
            <p class="sub-message">Looking to get some random quotes. Head of to Home and start generating some of the valuable and inspiring quote of all time.</p>
        </section>
    `;
    renderMessage(displaySectionContainer, markup)
})



// const data = generateQuote();
// console.log(data);

// const obj = {};

// const getTestQuote = async function() {
//     const res = await fetch('https://api.quotable.io/quotes/random');
//     const [data] = await res.json();
//     obj.content = data.content;
//     obj.author = data.author;
//     console.log(data)

//     console.log(obj)
// }
// getTestQuote();