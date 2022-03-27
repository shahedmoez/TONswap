# TONswap

![tonExchange](https://user-images.githubusercontent.com/92023968/160276480-50f21e04-3357-46d7-bdc6-f1eee760ed34.png)


This page allows users exchange Tokens with mange a custom list

In this version only Exchange page available 

**Setting icon on top of app:**

*	User can set tolerance manually or set auto (default 0.1% from constants) for tolerance between 0.05% to 1% (low and high tolerance in constants) and get alert if out of this range.
* User can set deadline between 1 to 4000. default 30 minutes (low and high deadline in constants) and get error alert if out of this range  
*	User can save setting or load default setting.

**Input and Output Tokens:**
*	By clicking on each one open a list of tokens, and user can select token
*	App is disable selecting Input and Output by same token.

**Input and Output amount:**
*	By focus in input app set position sell and by focus in out pout set position buy.
*	Both values are introduced as numbers, when user inter an amount in once other calculated by fetching price and other value.

**Arrow icon in center:**
*	Change all value of input and output token and position (sell/buy) by animated a section.

**Info of Exchange:**
After set input and out pout tokens and amounts Bottom of page show 	information of Exchanging:
*	Input-to-output price ratio
*	Gas fee 
*	Minimum Received after slippage by subtracting the fee value from the output value if position sell 
*	Maximum Sent after slippage if position buy by adding the fee value of the input value
*	Lost price (present of fee/final amount)
*	Price Impact
*	Alert if input amount smaller than Fee price.

**List of Tokens:**

* **Recent Tokens:**
*	User can search tokens in final list.
*	This List imported from constants
*	Final list imported from tokens of collection list and remove duplicated tokens.

**Collection list Tab:**
*	User can import any standard list URL and add tokens. default 3 collection imported from constants. (Ton demo List, Uni swap list, Coin market cap List all in constants)

**Tokens Tab:**
*	User can add custom Tokens by tokens address 

**Connect To wallet:**
*	List of available connecting app imported from constants. by clicking on each one set state connect wallet.

## **Tech Stack**

-`React` 

-`Redux` (redux toolkit)

-`Node.js`

-`Bootstrap` CSS

## **Installing** 
```bash
npm Install
```
 . It was created for the purposes of the competition posted here: ton-blockchain/TIPs#42



