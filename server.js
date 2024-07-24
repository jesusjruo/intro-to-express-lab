const express = require('express');
const app = express();

app.get('/' , (req , res) => {
    res.send('<h1> Intro to express lab.</h1><br><br> <p> - /greetings/*your-name* to say hello. </p> <p> - /roll/*number* to roll a random integer from 0 to that number.</p> <p> - /shoes/*query-params* (optional) to enter in the shoes catalog. </p>');
});

app.get('/greetings/:username' , (req , res) => {
    res.send(`<h1> Hello there ${req.params.username}!</h1>`);
});

app.get('/roll/:number' , (req , res) => {
    if(isNaN(req.params.number)){
        res.send(`<h1 style="color:red"> ${req.params.number} is not a number! </h1>`);
    } else {
        const result = Math.floor(Math.random() * req.params.number);
        res.send(`<h1> You got ${result}! </h1>`);
    }
});

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];

app.get('/collectibles/:index' , (req , res) => {
    if(typeof collectibles[req.params.index] === 'undefined') {
        res.send(`This item is not yet in stock. Check back soon!`);
    }
    else {
        res.send(`So, you want the ${collectibles[req.params.index].name}? For $${collectibles[req.params.index].price}, it can be yours!`);
    }
});

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes' , (req , res) => {

    if(Object.keys(req.query).length) {

        let filteredArray = shoes;

        Object.entries(req.query).forEach(([key, value]) => {
            if(key == 'min-price') {
                filteredArray = filteredArray.filter((item) => item.price >= value);
            }
            if(key == 'max-price') {
                filteredArray = filteredArray.filter((item) => item.price <= value);
            }
            if(key == 'type') {
                filteredArray = filteredArray.filter((item) => item.type == value);
            }
        });
    
        if(filteredArray.length == 0) {
            res.send('No items were found based on your search criteria.');
        } else {
            let response = '';
            filteredArray.forEach((item) => {
                response += `- ${item.name}, $${item.price}, ${item.type} <br>`;
            });
            res.send(`These are the shoes we have available at the moment based on your search criteria: <br> ${response}`);
        }
    } else {
        let response = '';
        shoes.forEach((item) => {
            response += `- ${item.name}, $${item.price}, ${item.type} <br>`;
        });
        res.send(`Here is a list of all the shoes: <br> ${response}`);
    }
});

app.listen(3001, () => { 
    console.log('listening on port 3001');
});