import React, { useEffect } from 'react'
import './Exchange.css'
import SettingModal from './components/SettingModal'
import ListsModal from './components/ListsModal'
import ConectWalletModal from './components/ConectWalletModal'
import { modalPosition } from './components/SettingModal'
import { selectInToken, selectOutToken, isSelecting, setPosition, reversOrder, setAmount, selectInamount, selectOutamount, getPrice, selectPosition, selectPrice } from './exchangeSlice'
import { useDispatch, useSelector } from 'react-redux'
import Loading from './components/loading/Loading'
import diamond from '../../imges/diamond.gif'


export default function Exchange() {


  const dispatch = useDispatch();
  const InToken = useSelector(selectInToken);
  const OutToken = useSelector(selectOutToken);
  const inAmount = useSelector(selectInamount);
  const outAmount = useSelector(selectOutamount);
  const position = useSelector(selectPosition);
  const price = useSelector(selectPrice);

  //for send Info For Price
  const sendInfoForPrice = (amount) => {
    if (!(InToken.symbol === null || OutToken.symbol === null || position === null)) {
      if (amount === undefined && position === "sell") amount = inAmount;
      if (amount === undefined && position === "buy") amount = outAmount;
      var info = {
        inSymbol: InToken.symbol,
        outSymbol: OutToken.symbol,
        amount: amount,
        position: position,
      }
      dispatch(getPrice(info));
    }
  }
  useEffect(() => { 
    if (!(inAmount === "") || !(outAmount === "")) { sendInfoForPrice() } 
  }, [InToken, OutToken ])

  // for reverce order and position
  const toggleClass = (clas, id) => {
    document.getElementById(id).classList.toggle(clas);
  }
  const reversWithTimeOut = () => {
    setTimeout(() => {
      dispatch(reversOrder());
    }, 350);
  }
  // for open Info Exchange
  const openInfoExchange = (e) => {
    e.target.classList.toggle("open_info");
    document.getElementById("info_exchange").classList.toggle("active_info_exchange")
  }
  return (
    <>
      <div className="swap_main">
        <div className="swap_header">
          <div>
            <div>Exchange</div>
            <div className='d-flex'>
              <button>
                <span className="icon">addchart</span>
              </button>
              <button onClick={(e) => modalPosition(e)} data-bs-toggle="modal" data-bs-target="#Setting_Exchange">
                <span className="icon ms-2" >settings</span>
              </button>
            </div>
          </div>
        </div>
        <div className="swap_body">
          <div id='order' className="order_cheng">
            <div className="swap_curency_inout">
              <input type="number" onFocus={() => dispatch(setPosition("sell"))} placeholder="0.0" value={inAmount} onChange={(e) => { dispatch(setAmount(e.target.value)); sendInfoForPrice(e.target.value) }} />
              <ul className="" onClick={() => dispatch(isSelecting("input"))} data-bs-toggle="modal" data-bs-target="#TokenList">
                <li className="Active">
                  {InToken.symbol === null ? <span className='m-auto'>Select Token</span>
                    : <>
                      <img src={InToken.logoURI} alt="" />
                      <span>{InToken.symbol}</span>
                    </>}
                </li>
              </ul>
            </div>
            {price.priceLoad === "loading" ? <div className='d-flex'><p className='px-3 m-0'>Fetching Price...</p><Loading color="var(--tonBlue)" size="20px" top="-4px" right="19px"></Loading></div>
              : price.priceLoad === "idle" ? <p className='px-3 m-0'>$ {price.priceInToken}</p> : <p className='pb-4 m-0'></p>}
            <div className="swap_cheang" onClick={() => { toggleClass("ReversOrder", "order"); reversWithTimeOut() }}>
              {price.priceLoad === "loading" ? <img className='diamond_middle' src={diamond} alt="" />
                : <span className="icon ">keyboard_double_arrow_down</span>
              }
            </div>
            <div className="swap_curency_inout">
              <input type="number" onFocus={() => dispatch(setPosition("buy"))} placeholder="0.0" value={outAmount} onChange={(e) => { dispatch(setAmount(e.target.value)); sendInfoForPrice(e.target.value) }} />
              <ul className="" onClick={() => dispatch(isSelecting("output"))} data-bs-toggle="modal" data-bs-target="#TokenList">
                <li className="Active">
                  {OutToken.symbol === null ? <span className='m-auto'>Select Token</span>
                    : <>
                      <img src={OutToken.logoURI} alt="" />
                      <span>{OutToken.symbol}</span>
                    </>}
                </li>
              </ul>
            </div>
            {price.priceLoad === "loading" ? <div className='d-flex'><p className='px-3 m-0'>Fetching Price...</p><Loading color="var(--tonBlue)" size="20px" top="-4px" right="19px"></Loading></div>
              : price.priceLoad === "idle" ? <>
                    <p className='px-3 m-0'>$ {price.priceOutToken}</p>
                    <div style={{ "padding": "0 0.8rem" }}>
                    {(price.priceInToken*inAmount<price.fee)&&(position==="sell")&&!(inAmount==="")&&!(inAmount===0) ? <p className='text-danger text-center'>Amount is small than transaction Fee !</p>
                    :<div className='exchange_price_info'>
                        <div className='d-flex w-100 justify-content-between'>
                          <p className='m-0 px-1'>1 {OutToken.symbol} = {price.priceOutToIn} {InToken.symbol}</p>
                          <div className='d-flex'>
                            <span className='icon'>local_gas_station</span>
                            <p className='m-0'>${price.fee}</p>
                          </div>
                        </div>
                        <span className='icon' onClick={(e) => openInfoExchange(e)}>expand_more</span>
                      </div>}
                    </div>
                    <div id='info_exchange'>
                      <div>
                        <div>
                          <p>Expected Output<br />Price Impact</p>
                          <span>{outAmount} {OutToken.symbol}<br />{price.inpact}%</span>
                        </div>
                        <div>
                          {position === "sell" ? <>
                            <p>Minimum <b>Received</b> after slippage<br />{(100 * price.fee / (price.amount * price.priceOutToken)).toFixed(2)}%</p>
                            <span>{price.amountAfterFee}<br />{OutToken.symbol}</span>
                      </>
                        : <><p>Maximum <b>Sent</b> after slippage<br />{(100 * price.fee / (price.amount * price.priceInToken)).toFixed(2)}%</p>
                          <span>{price.amountAfterFee}<br />{InToken.symbol}</span></>
                      }
                    </div>
                  </div>
                </div>
              </>
                : <p className='px-3 m-0 text-danger'>{price.priceError}</p>}
          </div>
          <div className="action">
            <button className="btn btn_primary" data-bs-toggle="modal" data-bs-target="#conect_wallet" >
              <span>Conect to wallet</span>
            </button>
          </div>
        </div>
      </div>
      <SettingModal></SettingModal>
      <ListsModal></ListsModal>
      <ConectWalletModal></ConectWalletModal>
    </>
  )
}