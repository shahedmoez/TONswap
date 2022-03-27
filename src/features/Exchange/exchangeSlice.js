import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import { autoTolerance, topTolerance, lowTolerance, highMinuteDeadline, lowMinuteDeadline, defaultDeadline, defaultColectionLists } from '../../constance/exchangeConstance'
import { FetchPrice, FetchList } from './exchangeAPI';


const initialState = {

  setting: {
    auto: true,
    tolerance: autoTolerance,
    outRengeTolerance: false,
    deadline: defaultDeadline,
    outRengeTime: false,
  },
  inToken: {
    chainId: null,
    address: null,
    name: null,
    symbol: null,
    decimals: null,
    logoURI: null,
  },
  outToken: {
    chainId: 1,
    address: "",
    name: "Ton Coin",
    symbol: "Toncoin",
    decimals: 18,
    logoURI: "toncoin_symbol.png",
  },
  inAmount: "",
  outAmount: "",
  isSelecting: null,
  position: null,
  wallet: null,
  price: {
    priceInToken: null,
    priceOutToken: null,
    priceOutToIn: null,
    amountAfterFee: null,
    amount: null,
    fee: null,
    inpact: 0.01,
    priceLoad: null,
    priceError: "",
  },
  lisets: {
    colectionList: defaultColectionLists,
    finalList: [],
    listloading: "",
    colectionloading: "",
    error: "",
  },
};
export const addList = createAsyncThunk(
  'Exchange/FetchList1',
  async (url) => {
    const response = await FetchList(url);
    return response.data;
  }
);
export const addColection = createAsyncThunk(
  'Exchange/FetchList2',
  async (url) => {
    const response = await FetchList(url);
    return response.data;
  }
);
export const getPrice = createAsyncThunk(
  'Exchange/FetchPrice',
  async (info) => {
    const response = await FetchPrice(info);
    return response.data;
  }
);


export var savedSetting = null; //temp item for load if user not save change setting


export const exchangeSlice = createSlice({
  name: 'exchange',
  initialState,
  reducers: {
    setAuto: (state) => {
      state.setting.auto = !state.setting.auto;
      if (state.setting.auto) {
        state.setting.tolerance = autoTolerance;
        state.setting.outRengeTolerance = false;
      }
    },
    setTolerance: (state, action) => {
      state.setting.tolerance = action.payload;
      state.setting.auto = false;
      if (action.payload === "") {
        state.setting.auto = true;
        state.setting.tolerance = autoTolerance;
        state.setting.outRengeTolerance = false;
      }
      else if (action.payload > topTolerance || action.payload < lowTolerance) {
        state.setting.outRengeTolerance = true;
      } else {
        state.setting.outRengeTolerance = false;
      }
    },
    setDeadline: (state, action) => {
      state.setting.deadline = action.payload;
      if (action.payload === "") {
        state.setting.deadline = defaultDeadline;
        state.setting.outRengeTime = false;
      }
      else if (action.payload > highMinuteDeadline || action.payload < lowMinuteDeadline) {
        state.setting.outRengeTime = true;
      } else {
        state.setting.outRengeTime = false;
      }

    },
    defaultSetting: (state) => {
      state.setting.auto = true;
      state.setting.tolerance = autoTolerance;
      state.setting.deadline = defaultDeadline;
      state.setting.outRengeTolerance = false;
      state.setting.outRengeTime = false;

    },
    saveSetting: (state) => {
      savedSetting = current(state.setting);
    },
    loadSetting: (state) => {
      (savedSetting === null) ? state.setting = initialState.setting
        : state.setting = savedSetting;
    },
    loadList: (state, action) => {
      state.lisets.colectionList[action.payload].load = !state.lisets.colectionList[action.payload].load;
      if (!state.lisets.colectionList[action.payload].load) {
        state.lisets.finalList = [];
        for (let i = 0; i < state.lisets.colectionList.length; i++) {
          if (state.lisets.colectionList[i].load) {
            state.lisets.finalList = [...state.lisets.finalList, ...state.lisets.colectionList[i].tokens];
          }
        }
      }
    },
    isSelecting: (state, action) => {
      state.isSelecting = action.payload;
    },
    userSelect: (state, action) => {
      if (state.isSelecting === "input") { state.inToken = action.payload }
      if (state.isSelecting === "output") { state.outToken = action.payload }
    },
    setPosition: (state, action) => {
      state.position = action.payload;
    },
    reversOrder: (state) => {
      state.position === "sell" ? state.position = "buy"
        : state.position === "buy" ? state.position = "sell" : <></>;
      let temp1 = state.inToken;
      state.inToken = state.outToken;
      state.outToken = temp1;
      let temp2 = state.inAmount;
      state.inAmount = state.outAmount;
      state.outAmount = temp2;
    },
    setAmount: (state, action) => {
      state.position === "sell" ? state.inAmount = action.payload : <></>;
      state.position === "buy" ? state.outAmount = action.payload : <></>;
    },
    setWallet: (state, action) => {
      state.wallet = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addList.pending, (state) => {
        state.lisets.listloading = 'loading';
        state.lisets.error = "";
      })
      .addCase(addList.fulfilled, (state, action) => {
        state.lisets.listloading = 'idle';
        let tokens = action.payload.tokens;
        let filterdTokens = tokens.filter((element, index) => index === tokens.findIndex(elem => elem.symbol === element.symbol && elem.name === element.name))
        state.lisets.finalList = [...state.lisets.finalList, ...filterdTokens];
        for (let i = 0; i < state.lisets.colectionList.length; i++) {
          if (state.lisets.colectionList[i].name === action.payload.name) {
            state.lisets.colectionList[i].tokens = filterdTokens;
          }
        };
        state.lisets.error = "";
      })
      .addCase(addList.rejected, (state, action) => {
        state.lisets.listloading = 'rejected';
        state.lisets.error = action.error.message;
      });
    builder
      .addCase(addColection.pending, (state) => {
        state.lisets.colectionloading = 'loading';
        state.lisets.error = "";
      })
      .addCase(addColection.fulfilled, (state, action) => {
        state.lisets.colectionloading = 'idle';
        let tokens = action.payload.tokens;
        let filterdTokens = tokens.filter((element, index) => index === tokens.findIndex(elem => elem.symbol === element.symbol && elem.name === element.name))
        const newColection = {
          id: state.lisets.colectionList.length + 1,
          name: action.payload.name,
          url: action.meta.arg,
          image: action.payload.logoURI,
          tokensNumber: filterdTokens.length,
          load: false,
        };
        state.lisets.colectionList = [...state.lisets.colectionList, newColection];
        state.lisets.error = "";
      })
      .addCase(addColection.rejected, (state, action) => {
        state.lisets.colectionloading = 'rejected';
        state.lisets.error = action.error.message;
      });
    builder
      .addCase(getPrice.pending, (state) => {
        state.price.priceLoad = 'loading';
        state.price.priceError = "";
        state.position === "sell" ? state.outAmount = "" : state.inAmount = "";
      })
      .addCase(getPrice.fulfilled, (state, action) => {
        state.price.priceLoad = 'idle';
        state.price.priceError = "";
        state.price = { ...state.price, ...action.payload };
        state.position === "sell" ? state.outAmount = action.payload.amount : state.inAmount = action.payload.amount;
      })
      .addCase(getPrice.rejected, (state) => {
        state.price.priceLoad = 'rejected';
        state.price.priceError = "Price Fetching error";
      });
  },
});

export const selectAuto = (state) => state.exchange.setting.auto;
export const selectTolerance = (state) => state.exchange.setting.tolerance;
export const selectOutRengeTolerance = (state) => state.exchange.setting.outRengeTolerance;
export const selectDeadline = (state) => state.exchange.setting.deadline;
export const selectOutRengeTime = (state) => state.exchange.setting.outRengeTime;

export const selectColectionList = (state) => state.exchange.lisets.colectionList;
export const selectFinalList = (state) => state.exchange.lisets.finalList;
export const selectLoadList = (state) => state.exchange.lisets.listloading;
export const selectLoadColection = (state) => state.exchange.lisets.colectionloading;
export const selectError = (state) => state.exchange.lisets.error;

export const selectInToken = (state) => state.exchange.inToken;
export const selectOutToken = (state) => state.exchange.outToken;
export const selectIsSelecting = (state) => state.exchange.isSelecting;

export const selectPosition = (state) => state.exchange.position;
export const selectInamount = (state) => state.exchange.inAmount;
export const selectOutamount = (state) => state.exchange.outAmount;

export const selectPrice = (state) => state.exchange.price;
export const selectWallet = (state) => state.exchange.wallet;

export const { setAuto, setTolerance, setDeadline, defaultSetting, saveSetting, loadSetting, loadList, isSelecting, userSelect, setPosition, reversOrder, setAmount, setWallet } = exchangeSlice.actions;

export default exchangeSlice.reducer;