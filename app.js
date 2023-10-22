const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const cheerio = require("cheerio");

const app = express();

app.listen(process.env.PORT || 3000, function(){
    console.log("The server is started on port 3000");
});

app.use(express.static("public"));

app.set("view engine", "hbs");
var main;
var state;
var stateData;
request("https://api.rootnet.in/covid19-in/stats/latest", function(error,response,body){
  main= JSON.parse(body); 
// console.log(main.data.summary.total);

  

});

app.use(bodyParser.urlencoded({extended: true}));


// var stateData = main.data.regional[state];


app.get("/", function(req,res){
    
    res.render("index", {
      totalRecovered : main.data.summary.total,
      totalDeaths : main.data.summary.deaths,
     total : main.data.summary.total,
      totalActive : (main.data.summary.total) - (main.data.summary.discharged),
    });

    



});

app.post("/", function(req,res) {
  state= req.body.states;
  stateData= main.data.regional[state]
  console.log(stateData.deaths);

res.render("index",{

  totalRecovered : main.data.summary.total,
      totalDeaths : main.data.summary.deaths,
     total : main.data.summary.total,
      totalActive : (main.data.summary.total) - (main.data.summary.discharged + main.data.summary.deaths),
  totalState: stateData.totalConfirmed,
  totalStateRecovered: stateData.discharged,
  totalStateDeaths: stateData.deaths,
  totalStateActive: (stateData.totalConfirmed)- (stateData.discharged + stateData.deaths),
  state: stateData.loc,

});
  
});
