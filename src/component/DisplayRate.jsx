import { useState, useEffect } from "react";

function DisplayRate() {

    const [currencies, setCurrencies] = useState([]);
    const apiKey = '11e99d307087493490ae1bb1573d6667'
    const url = `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${apiKey}&symbols=CAD,IDR,JPY,CHF,EUR,USD`;
    
    //Currencies -> https://api.currencyfreaks.com/v2.0/rates/latest?apikey=11e99d307087493490ae1bb1573d6667
    const fetchCurrencies = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        const rates = data.rates;
        const currenciesArray = Object.keys(rates).map((currency) => {
          return {
            currency,
            weBuy: (parseFloat(rates[currency]) * 1.05).toPrecision(6), //parseFloat untuk mengonversi nilai rates[currency] menjadi tipe number
            exchangeRate: parseFloat(rates[currency]).toPrecision(6),
            weSell: (parseFloat(rates[currency]) * 0.95).toPrecision(6),
          };
        });

        setCurrencies(currenciesArray);
      } catch (error) {
        console.error("Error Fetching", error);
      }
    };

    useEffect(() => {
      fetchCurrencies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <>
       <div className="bg-lime-200 flex justify-center items-center h-screen">
          <div className="w-100 p-5">
            <p className="font-black text-center mb-5"> RATE CURRENCY </p>
            <table className="table-auto bg-orange-200">
              <thead className="bg-orange-500 border-b-2 border-black">
                <tr>
                  <th className="px-10 py-3"> </th>
                  <th className="px-10 py-3">WE BUY</th>
                  <th className="px-0 py-3">EXCHANGE RATE</th>
                  <th className="px-10 py-3">WE SELL</th>
                </tr>
              </thead>
              <tbody>
                {currencies.map((currency) => {
                  return ( // dikembalikan dan dirender ke dalam tabel
                  <tr key={currency.currency} className="border-b border-black">
                    <td className="px-10 py-3">{currency.currency}</td>
                    <td className="px-10 py-3">{currency.weBuy}</td>
                    <td className="px-10 py-3">{currency.exchangeRate}</td>
                    <td className="px-10 py-3">{currency.weSell}</td>
                  </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="font-normal mt-5"> 
              <p> *been currency is IDR </p>
              <p> *As for the API, <a className="text-blue-700" href="https://currencyfreaks.com/">https://currencyfreaks.com/</a> is used </p>
            </div>
            
          </div>
        </div>
      </>
    )
  }
  
export default DisplayRate
  