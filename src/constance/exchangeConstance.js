


//---------------constance for setting of exchange------------
export const autoTolerance = 0.1; // const for auto tolerance amont
export const topTolerance = 1; // const for calculate out telorance renge tolerance
export const lowTolerance = 0.05; // const for calculate out telorance renge tolerance
export const defaultDeadline = 30; // const for default time of deadline
export const lowMinuteDeadline = 1; // const for calculate out telorance renge time of deadline
export const highMinuteDeadline = 4000; // const for calculate out telorance renge time of deadline

//--------------constance for lists of tokens------------------
export const defaultColectionLists = [ 
    {
        id:"1",
        name:"TON Demo List",
        url:'tonDemoList.json',
        image:require('../imges/tonlogos/tonsymbol.png'),
        tokensNumber:"7",
        load:true,
    },
    {
        id:"2",
        name:"Coinmarketcap",
        url:"https://api.coinmarketcap.com/data-api/v3/uniswap/all.json",
        image:"https://cloudflare-ipfs.com/ipfs/QmQAGtNJ2rSGpnP6dh6PPKNSmZL8RTZXmgFwgTdy5Nz5mx/",
        tokensNumber:"6433",
        load:false
    },
    {
        id:"3",
        name:"Uniswap Labs List",
        url:"https://tokens.uniswap.org",
        image:"https://cloudflare-ipfs.com/ipfs/QmNa8mQkrNKp1WEEeGjFezDmDeodkWRevGFN8JCV7b4Xir",
        tokensNumber:"43",
        load:false
    }
];

//--------------constance for wallets conecting------------------

export const wallets = [
    {
        id:"1",
        name:"Install Metamask",
        url:"https://metamask.io/",
        image:require("../imges/wallets/metamask.png")
    },
    {
        id:"2",
        name:"WalletConnect",
        url:"https://walletconnect.com/",
        image:require("../imges/wallets/WalletConnect.png")
    },
    {
        id:"3",
        name:"Coinbase Wallet",
        url:"https://www.coinbase.com/wallet",
        image:require("../imges/wallets/coinbase.jpg")
    },
    {
        id:"4",
        name:"Fortmatic",
        url:"https://fortmatic.com/",
        image:require("../imges/wallets/Fortmatic.png")
    },
    {
        id:"5",
        name:"Portis",
        url:"https://www.portis.io/",
        image:require("../imges/wallets/Portis.png")
    },
] 



