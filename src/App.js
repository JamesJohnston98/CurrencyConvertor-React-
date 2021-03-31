import React, { useEffect, useState } from 'react';
import './App.css';
import Currency from './Currency';

//currency api to allow for the latest exchange rates
const currency_url = "https://api.exchangeratesapi.io/latest";

function App() {

  //allow the currencies to be loaded to the application.
  //intially the state is an empty array because when the application loads there are no options in the list.
  const [Currency_opt, setCurrency_opt] = useState([]); 

  //load the default from currency exchange rate
  const [fromCurrency, setFromCurrency] = useState();

  //create the default to currency exchange rate 
  const [toCurrency, setToCurrency] = useState();

  //create the amount for the exchange rate calculation
  const [amount, SetAmount] = useState(1);

  //create the from amount
  const [amountInFromCurrency, SetamountInFromCurrency] =useState(true);

  //check for the exchange rate 
  const [exchange_R, setExchange_R] = useState();

//amount variable for the amounts that are being used in the currency conversion

let toAmount, fromAmount;

//if check to check which amount has been changed
if(amountInFromCurrency){
  fromAmount = amount;
  toAmount = amount * exchange_R;
}else{
  toAmount=amount;
  fromAmount = amount * exchange_R;
}


  //empty array will not change so this will load only on the first load of the application
useEffect(() => {
  //fetch the API when the application loads.
fetch(currency_url)
//return the json format
.then(res => res.json())
//convert the data into an array of options 
.then(data => {
  //load the first option from the array of currency exchange rates
  const First_Currency = Object.keys(data.rates)[0];
  //pass an array to the function
  //the first value is the base from the data
  //the second value is the keys for the exchange rates from the api
  setCurrency_opt([data.base, ...Object.keys(data.rates)])
  //load the base currency to the from currency exchange rate
  setFromCurrency(data.base);
  //load the to currency with the first option from the array of exchange rates 
  setToCurrency(First_Currency);
  //get the Exchange rate 
  setExchange_R(data.rates[First_Currency]);
});
}, []);

//use effect to allow you to change the currency you want to see the exchange rate for
//call this any time any of the currencies change
useEffect(() => {
  //check if the fromCurrency and the toCurrency contain a value

  if(fromCurrency != null  && toCurrency != null){
    fetch(`${currency_url}?base=${fromCurrency}&symbols=${toCurrency}`)
    //get a response and convert it to json format
     .then(res => res.json())
     //use the data in the json file
     .then(data => setExchange_R(data.rates[toCurrency]))
  }
 
}, [fromCurrency, toCurrency]);


//function to handle the change of the amount in the from input box
function handlefromAmountChange(e){
  SetAmount(e.target.value);
  SetamountInFromCurrency(true);
}

//function to handle the change of the amount in the to amount input
function handleToAmountChange(e){
  SetAmount(e.target.value);
  SetamountInFromCurrency(false);
}

  return (
    // a fragment is used to ensure the application renders as more than one element is stored within the return
    <>
    <h1>Check Currency</h1>
   {/* pass in the currency rates to the currency option menu */}
    <Currency 
    Currency_opt={Currency_opt}
    selectedCurrency={fromCurrency}
    onChange_Currency={e => setFromCurrency(e.target.value)}
    onChange_Amount={handlefromAmountChange}
    amount={fromAmount}
    />
    <div className="equal">=</div>
    <Currency
    Currency_opt={Currency_opt}
    selectedCurrency={toCurrency}
    onChange_Currency={e => setToCurrency(e.target.value)}
    onChange_Amount={handleToAmountChange}
    amount={toAmount}
     />
    </>
  );
}

export default App;
