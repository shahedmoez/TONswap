import axios from 'axios'
import listprice from '../../constance/listprice.json'


//for get price 
//--------------CATUTION----------------
// This Function only for demo and  should be change
export function FetchPrice(info) {
    var fee = 10; // example    
    var priceInToken = listprice.data.find(t => t.symbol === info.inSymbol).quote.USD.price;
    var priceOutToken = listprice.data.find(t => t.symbol === info.outSymbol).quote.USD.price;
    var priceOutToIn = priceOutToken / priceInToken;
    var amountAfterFee, amount;
    // if position = -----sell----- amount & amountAfterfee calculated for -----output----- token
    // if position = -----buy------ amount & amountAfterfee calculated for -----input------ token
    if (info.position === "sell") {
        amount = info.amount * priceInToken / priceOutToken;
        amountAfterFee = (info.amount * priceInToken - fee) / priceOutToken;
    } else if (info.position === "buy") {
        amount = info.amount * priceOutToken / priceInToken;
        amountAfterFee = (info.amount * priceOutToken + fee) / priceInToken;
    }
    return new Promise((resolve) =>
        resolve({ data: { priceInToken: priceInToken, priceOutToken: priceOutToken, priceOutToIn: priceOutToIn, amount: amount, amountAfterFee: amountAfterFee, fee: fee } })
    );
}

//for get list and list colection && Tokens
export function FetchList(url) {
    return new Promise((resolve) =>
        resolve(axios.get(url))
    );
};