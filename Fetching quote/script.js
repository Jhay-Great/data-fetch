"use strict";
const quote = document.querySelector(".new-quotes");
const addQuote = document.querySelector(".add-quote");
const spinner = document.querySelector(".spinner-container");

const navContainer = document.querySelector("nav");
const btnContainer = document.querySelector(".btns");
const displaySectionContainer = document.querySelector(".display-section");
const mainQuoteContainer = document.querySelector(".main-quote-container");

// State variables
let state = {
    containers: {},
    content: {},
};
const savedQuotes = [];


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
  container.innerHTML = "";
  container.insertAdjacentHTML("afterbegin", message);
};


// ========= Event functionalities ===============

// handling navigation
navContainer.addEventListener("click", function (e) {
  const navElements = e.target?.closest("ul")?.querySelectorAll("li");
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

    // return state = {
    //     spinner: document.querySelector('.spinner-container'),
    //     mainQuoteContainer: document.querySelector('.main-quote-container'),
    // }
    state.containers.spinner = document.querySelector('.spinner-container');
    state.containers.mainQuoteContainer = document.querySelector('.main-quote-container');

  }

  // saved quote nav
  if (e.target.classList.contains("saved-quotes-nav")) {
    if(savedQuotes.length === 0) {
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
    console.log(displaySectionContainer);
    if(savedQuotes.length !== 0) {
        console.log(savedQuotes);
        displaySectionContainer.innerHTML = '';
        savedQuotes.map(quote => {
            const markup = `<p> ${quote} </p>`;
            // renderMessage(displaySectionContainer, markup);
            displaySectionContainer.insertAdjacentHTML('afterbegin', markup);
        })
    }
  }
});

// handling quote
displaySectionContainer.addEventListener("click", function (e) {
  if (e.target === e.target.closest(".new-quotes")) {

    
    const getQuote = async function () {
      displaySpinner(state.containers.spinner);
      try {
        const data = await generateQuote();
        console.log(data);

        // const {content, author, date} = data;
        // state.content.test = 'test';

        state.content.content = data.content;
        state.content.author = data.author;
        state.content.date = data.date;

        // const {state: {content: {content}}} = data;

        const markup = `
            <div class="quote-container">
                <p class="message"> ${state.content.content} </p>
                <p class="author"> By: ${state.content.author} </p>
                <p class="date">${state.content.date}</p>
            </div>
        `;
        renderMessage(state.containers.mainQuoteContainer, markup);
        displaySpinner(state.containers.spinner);
      } catch (err) {
        renderMessage(state.containers.mainQuoteContainer, err.message);
        displaySpinner(state.containers.spinner);
        // console.error(err);
      }
      console.log("w");
    };
    getQuote();
  }

//   when classList is add-quote
  if (e.target === e.target.closest('.add-quote')) {
    const {content: {content}} = state;
    console.log(content);
    savedQuotes.push(content);
    // state.containers = 'w';
    // console.log(state);
    // console.log(state.content)

  }
});

/** On Load - default display */
window.addEventListener('load', function() {
    const markup = `
        <section class="header-container">
            <h1 class="heading"> Quote Generator </h1>
            <p class="sub-message">Looking to get some random quotes. Head of to Home and start generating some of the valuable and inspiring quote of all time.</p>
        </section>
    `;
    renderMessage(displaySectionContainer, markup)
})


// const obj = {
//     boy: {
//         name: "John",
//         age: 20,
//         hobbies: ["Reading", "Coding"]
//     },
//     girl: {
//         name: "Jane",
//         age: 35,
//     }
// }
// // const {girl: {name}} = obj;
// // console.log(name);

// console.log(obj.boy.name)

// // const {boy: {name}} = obj;
// // console.log(name);

