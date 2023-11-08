'use strict'
const quote = document.querySelector('.quotes');
const addQuote = document.querySelector('.add-quote');
const spinner = document.querySelector('.spinner-container');

const mainQuoteContainer = document.querySelector('.main-quote-container');

// let state;
// const displaySpinner = function() {
//     console.log(spin);

//     if(spin) {
//         console.log('spin truthy and hidden removed')
//         spinner.classList.remove('hidden');
//     };
//     if(!spin) {
//         console.log('spin falsy and hidden added')
//         spinner.classList.add('hidden');
//     };
//     // // onDisplay = !onDisplay;
//     // // console.log(onDisplay);
//     // onDisplay ? spinner.classList.remove('hidden') : spinner.classList.add('hidden');
//     // // spinner.classList.toggle('hidden');
// }

const displaySpinner = function() {
    spinner.classList.toggle('hidden');
}

const generateQuote = async function() {
    try {
        const data = await fetch('https://api.quotable.io/quotes/random');
        // console.log(data);

        if(!data.ok) throw new Error(`${data.status} Something went wrong`);
        
        const res = await data.json();
        const [value] = res;
        // console.log(value);
        return {
            author: value.author,
            content: value.content,
            date: value. dateAdded,
        };

    } catch (err) {
        console.error(err.message);
        throw err;
    }
}
// console.log(generateQuote());

// const getQuote = async function() {
//     const res = await generateQuote();
//     console.log(res);
//     // const data = res.json()
//     // console.log(data);

//     const markup = `
//         <div class="quote-container">
//             <p class="message"> ${res.content} </p>
//             <p class="author">${res.author}</p>
//             <p class="date">${res.date}</p>
//         </div>
//     `;
//     container.innerHTML = '';
//     container.insertAdjacentHTML('afterbegin', markup);
// }

const renderMessage = function(message) {
    mainQuoteContainer.innerHTML = '';
    mainQuoteContainer.insertAdjacentHTML('afterbegin', message);
}



// quote.addEventListener('click', function(e) {
//     // let onDisplay = false;
//     // displaySpinner(onDisplay=true);
//     // console.log(`${onDisplay} spin`);

//     // const getQuote = async function() {
//     //     const res = await generateQuote();
//     //     // console.log(res);
//     //     // const data = res.json()
//     //     // console.log(data);
    
//     //     const markup = `
//     //         <div class="quote-container">
//     //             <p class="message"> ${res.content} </p>
//     //             <p class="author"> ${res.author} </p>
//     //             <p class="date">${res.date}</p>
//     //         </div>
//     //     `;
//     //     container.innerHTML = '';
//     //     // displaySpinner(onDisplay);
//     //     // console.log(`${onDisplay} no spin`);
//     //     container.insertAdjacentHTML('afterbegin', markup);
//     // } catch (err) {
//     //     container.insertAdjacentHTML("afterbegin", err);
//     // }
//     getQuote();
// })

quote.addEventListener('click', function() {
    console.log('coming from generateQuote func')
    
    const getQuote = async function() {
        displaySpinner();
        try {
            const data = await generateQuote();
            const { content, author, date } = data;

            // console.log(data);
            // console.log(content, author, date);

            const markup = `
            <div class="quote-container">
                <p class="message"> ${content} </p>
                <p class="author"> ${author} </p>
                <p class="date">${date}</p>
            </div>
        `;
        renderMessage(markup);
        displaySpinner();
    } catch (err) {
        renderMessage(err.message);
        displaySpinner();
            console.log(err);
        }
        console.log('w');
    }
    getQuote();
})