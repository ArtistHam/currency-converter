var apiKey = "77c1a965ec3a6c1081747d89121b855c";
var url = "http://data.fixer.io/api/latest";
var queryParams = "?access_key=";
var symbols = "&symbols=USD,UAH,RUB,XAU,XAG";
var format = "&format=1";

var rate;
var userCurrency;

var getRate = function(){
  var endpoint = url + queryParams + apiKey + symbols + format;
  
  fetch(endpoint).then(function(response) {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Request failed!');
  }, function(networkError) {
    console.log(networkError.message);
  }).then( function(jsonResponse) {
    renderResponse(jsonResponse);
  });
};

function renderResponse(res){

  if(!res){
    console.log(res.status);
  }

  if(!res.success){
    console.log("ERROR");
    return;
  } 

  rate = res.rates;
  rate.EUR = 1;
}

function getUserCurrency(){
  var select = document.getElementById("chooseCurrency");
  userCurrency = select.value;

  var currentCurrency = document.getElementsByClassName("client_currency")[0];
  currentCurrency.innerHTML = "Your currency: " + userCurrency;

  var preload = document.getElementsByClassName("preload")[0];
  fadeOutEffect(preload);
  
  setTimeout(function(){
    preload.style.display = "none";
  }, 1000);

  calculateRate();
  
}

function calculateRate(){
  var money = [];
  var ul = document.getElementsByClassName("rate")[0];
  var currencyRate = ul.getElementsByClassName("currencyRate");
  switch(userCurrency){
    case "EUR":
      {
        money.push("1");
        money.push(rate.USD);
        money.push(rate.UAH);
        money.push(rate.RUB);
        money.push(rate.XAU);
        money.push(rate.XAG);
      }
      break;
    case "USD":
      {
        money.push((1 / rate.USD).toFixed(6));
        money.push("1");
        money.push((rate.UAH / rate.USD).toFixed(6));
        money.push((rate.RUB / rate.USD).toFixed(6));
        money.push((rate.XAU / rate.USD).toFixed(6));
        money.push((rate.XAG / rate.USD).toFixed(6));
      }
    break;
    case "UAH":
      {
        money.push((1 / rate.UAH).toFixed(6));
        money.push((rate.USD / rate.UAH).toFixed(6));
        money.push("1");
        money.push((rate.RUB / rate.UAH).toFixed(6));
        money.push((rate.XAU / rate.UAH).toFixed(6));
        money.push((rate.XAG / rate.UAH).toFixed(6));
      }
    break;
    case "RUB":
      {
        money.push((1 / rate.RUB).toFixed(6));
        money.push((rate.USD / rate.RUB).toFixed(6));
        money.push((rate.UAH / rate.RUB).toFixed(6));
        money.push("1");
        money.push((rate.XAU / rate.RUB).toFixed(6));
        money.push((rate.XAG / rate.RUB).toFixed(6));
      }
    break;
    default:
      break;
  }

  for(var i = 0; i <= 5; i++){
    currencyRate[i].innerHTML = "" + money[i];
  }

}

function convertCurrency(){
  var amount = document.getElementById("firstAmount").value;
  var from = document.getElementById("firstCurrency").value;
  var to = document.getElementById("secondCurrency").value;
  var convertation = document.getElementById("secondAmount");

  var result = ((rate[to] / rate[from]) * amount).toFixed(6);

  convertation.value = result;

}


function fadeOutEffect(elem) {
  var fadeEffect = setInterval(function() {
      if (!elem.style.opacity) {
          elem.style.opacity = 1;
      }
      if (elem.style.opacity < 0.05) {
          clearInterval(fadeEffect);
      } else {
          elem.style.opacity -= 0.05;
      }
  }, 50);
}

function check(input) { 
  var value = input.value; 
  var rep = /[-/\\;":'a-zA-Zа-яА-Я]/; 
  if (rep.test(value)) { 
      value = value.replace(rep, ''); 
      input.value = value; 
  } 
} 


function ready() {
  getRate();
}

document.addEventListener("DOMContentLoaded", ready);