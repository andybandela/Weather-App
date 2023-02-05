

//Requiring express 
const express  = require("express");

let path = require('path');

//Requiring https
const https = require("https");

//Requiring Body Parser
const bodyParser = require("body-parser");


//initializing a new app express
const app = express();

//initializing Body Parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')));


//Root route Get
app.get("/", (req,res) =>{
    // "__dirname" is used to get directory/path of the project folder
    const rootF = __dirname + "/index.html";
    //Sending index.html to the user
    res.sendFile(rootF);
});

//Root route Post
app.post("/", (req,res) =>{

    //"req.body.element" is used to get an html element
    const city = req.body.cityName;
    const apiKey = "55df40f45a7c669cb94a526b6a87bf87";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units="+unit;
    
    //using https module to get data from an api server
    https.get(url, (response) => {
        console.log(response.statusCode);
        response.on("data", (data) =>{
            //converting the data received into Js Object
            const weatherData = JSON.parse(data);

            //accessing the data inside the Js Object(weatherData) using paths
            const temp = weatherData.main.temp;
            const wDescription = weatherData.weather[0].description;
            const wIcon = weatherData.weather[0].icon;
            const urlIcon = "http://openweathermap.org/img/wn/" + wIcon + "@2x.png";

            //Creating the response
            res.write("<h1>The Weather In "+ city+"</h1>");
            res.write("<h3>Temperature: "+temp+"</h3>");
            res.write("<h3>Weather Description: "+wDescription+"</h3>");
            res.write("<img src="+urlIcon+">");

            //Sending the response
            res.send();
        });
    });
});


//Home page Get
// app.get("/", (req,res) =>{
//     const url = "https://api.openweathermap.org/data/2.5/weather?q=Cape Town&appid=55df40f45a7c669cb94a526b6a87bf87&units=metric";
//     https.get(url, (response) => {
//         console.log(response.statusCode);

//         response.on("data", (data) =>{
//             const weatherData = JSON.parse(data);
//             const temp = weatherData.main.temp;
//             const wDescription = weatherData.weather[0].description;
//             const weatherIcon = weatherData.weather[0].icon;
//             const cityName = weatherData.name;

//             res.write("<h1>In "+ cityName+" </h1>");
//             res.write("<h3>Temperature is " + temp +"</h1>");
//             res.write("<p>Weather Description : " + wDescription+ "</p>");
//             res.write("<img src='http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png'>");

//             res.send();
//         })
//     });
// });


//Running server on port 3000
app.listen(3000, () => {
    console.log("Server is running on port 3000.");
});