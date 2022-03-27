import React, { useEffect, useState } from "react";
import { selectColectionList, loadList, selectLoadList, addList, userSelect, selectIsSelecting, selectOutToken, selectInToken } from "../exchangeSlice";
import recentTokens from "../../../constance/recentTokens.json";
import { useDispatch, useSelector } from "react-redux";
import { selectFinalList, } from "../exchangeSlice"
import AddColectionList from "./AddColectionList";
import { SearchUlLi } from "./SearchUlLi";
import diamond from '../../../imges/diamond.gif'



export default function ListsModal() {
  const colectionList = useSelector(selectColectionList);
  const dispatch = useDispatch();
  const finalList = useSelector(selectFinalList);
  const sLoadlist = useSelector(selectLoadList);
  const [isLoading, setIsLoading] = useState();
  const isSelecting = useSelector(selectIsSelecting);
  const inToken = useSelector(selectInToken);
  const outToken = useSelector(selectOutToken);


  //for dublicated tokens 
  const filterd = finalList.filter((element, index) => index === finalList.findIndex(elem => elem.symbol === element.symbol && elem.name === element.name))


  // for tab cheng in list manager
  const activeClass = (e, activClas, idtarget) => {
    var elements = document.getElementsByClassName(activClas);
    var content = document.getElementsByClassName("show_content")
    for (var i = 0; i < elements.length; i++) {
      elements[i].classList.remove(activClas);;
    }
    for (var j = 0; j < content.length; j++) {
      content[j].classList.remove("show_content");;
    }

    e.target.classList.add(activClas);
    document.getElementById(idtarget).classList.add("show_content");
  };

  //for load lists that should load ON by defult in list colection
  useEffect(() => {
    for (let i = 0; i < colectionList.length; i++) {
      if (colectionList[i].load) {
        dispatch(addList(colectionList[i].url))
      }
    }
  }, []);

  // handel click for load loading only li clicked
  const isClicked = (i) => setIsLoading(i);

  return (
    <>
      {/* <!-- Modal list--> */}
      <div className="modal fade" id="TokenList" tabIndex="-1" role="dialog" aria-labelledby="modal_list" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text_color" id="modal_list">Select a token</h5>
              <button id='close_modal' type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="Serch_Recent">
              <div className="input-group rounded">
                <input type="search" onKeyUp={(e) => SearchUlLi(e, "final_list")} className="form-control rounded" placeholder="Search Tokens" />
              </div>
              <ul className="RecentToken">
                <span className="label_On_border">Recent</span>
                <div className='recent_scrooll'>
                  {recentTokens.tokens.map((row, index) =>
                    ((isSelecting === "input" && row.symbol === outToken.symbol) || (isSelecting === "output" && row.symbol === inToken.symbol))
                      ? <li key={index} className="CoinList_recent token_dsable">
                        <img src={row.logoURI} alt="" />
                        <span>{row.symbol}<small>{row.name}</small>
                        </span>
                      </li>
                      : <li key={index} onClick={() => dispatch(userSelect(row))} className="CoinList_recent" data-bs-dismiss="modal">
                        <img src={row.logoURI} alt="" />
                        <span>{row.symbol}<small>{row.name}</small>
                        </span>
                      </li>
                  )}
                </div>
              </ul>

            </div>
            <div className="modal-body modal_body modal-dialog-scrollable d-flex">
              <div className="TokenList_all w-100 d-flex">
                <span className="label_On_border">Tokens</span>
                <ul id="final_list" className=" modal-body modal_body">
                  {filterd.map((row, index) =>
                    ((isSelecting === "input" && row.symbol === outToken.symbol) || (isSelecting === "output" && row.symbol === inToken.symbol))
                      ? <li key={index} className="CoinList_all token_dsable">
                        <img src={row.logoURI} alt="" />
                        <span>{row.symbol}<small>{row.name}</small></span>
                      </li>
                      : <li key={index} onClick={() => dispatch(userSelect(row))} className="CoinList_all" data-bs-dismiss="modal">
                        <img src={row.logoURI} alt="" />
                        <span>{row.symbol}<small>{row.name}</small></span>
                      </li>
                  )}
                </ul>
              </div>
            </div>
            <div className="modal-footer justify-content-center">
              <button type="button" className="btn_ton_noBorder " data-bs-toggle="modal" data-bs-target="#TokenList_manager"><span className='icon'>edit_note</span>Manage Token Lists
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Modal List Manager--> */}

      <div className="modal fade" id="TokenList_manager" tabIndex="-1" role="dialog" aria-labelledby="modal_manager_list" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text_color" id="modal_manager_list">Manage List</h5>
              <button id='close_modal' type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
            </div>
            <div className='tab_list_continer navbar'>
              <div className='tab_list tab_active' onClick={(e) => activeClass(e, "tab_active", "list_colection")}>
                lists<span className='tab_border'></span>
              </div>
              <div className='tab_list' onClick={(e) => activeClass(e, "tab_active", "custom_token")}>
                Tokens<span className='tab_border'></span>
              </div>
            </div>

            {/* ------first tab (List)------ */}
            <div id='list_colection' className='show_content'>
              <div className="list_url">
                <AddColectionList></AddColectionList>
              </div>
              <div className="modal-body modal_body modal-dialog-scrollable d-flex">
                <div className="TokenList_all w-100 d-flex">
                  <span className="label_On_border">Tokens Lists</span>
                  <ul className=" modal-body modal_body">
                    {colectionList.map((row, index) =>
                      <li key={index} className="Token_list_item" style={row.load ? {} : { opacity: 0.6 }}>
                        <div className='Token_list_info' >
                          <img src={row.image} alt="" />
                          <span>{row.name}<small>{row.tokensNumber} tokens</small></span>
                        </div>
                        {(sLoadlist === "loading" && isLoading === index) ? <img alt="" className='diamond_middle' src={diamond} /> : <></>}
                        <div className='check_box'>
                          <input type="checkbox" onChange={() => { dispatch(loadList(index)); isClicked(index); row.load ? <></> : dispatch(addList(row.url)) }} checked={row.load} />
                          <span className='checkbox_btn'></span>
                          <div className='checkbox_back'>
                            <span>ON</span>
                            <span>OFF</span>
                          </div>
                        </div>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
            {/* ------secend tab (Token)------ */}

            <div id='custom_token' className=''>
              <div className="list_url">
                <div className="input-group rounded">
                  <input id="search_tokens" type="url" className="form-control rounded" placeholder="Insert Token adress " />
                </div>
              </div>
              <div className="modal-body modal_body modal-dialog-scrollable d-flex">
                <div className="TokenList_all w-100 d-flex">
                  <span className="label_On_border">custome Tokens</span>
                  <ul className=" modal-body modal_body">
                    <li className="custom_Token_item">
                      <div className='custom_Token_info'>
                        <img src="https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0x3472A5A71965499acd81997a54BBA8D852C6E53d/logo.png" alt="" />
                        <span>BADGER<small>Badger</small></span>
                      </div>
                      <div className='Token_delet_info'>
                        <span className='icon'>delete_outline</span>
                        <span className='icon'>launch</span>
                      </div>
                    </li>
                    <li className="custom_Token_item">
                      <div className='custom_Token_info'>
                        <img src="https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0x3472A5A71965499acd81997a54BBA8D852C6E53d/logo.png" alt="" />
                        <span>BADGER<small>Badger</small></span>
                      </div>
                      <div className='Token_delet_info'>
                        <span className='icon'>delete_outline</span>
                        <span className='icon'>launch</span>
                      </div>
                    </li>
                    <li className="custom_Token_item">
                      <div className='custom_Token_info'>
                        <img src="https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0x3472A5A71965499acd81997a54BBA8D852C6E53d/logo.png" alt="" />
                        <span>BADGER<small>Badger</small></span>
                      </div>
                      <div className='Token_delet_info'>
                        <span className='icon'>delete_outline</span>
                        <span className='icon'>launch</span>
                      </div>
                    </li>
                    <li className="custom_Token_item">
                      <div className='custom_Token_info'>
                        <img src="https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0x3472A5A71965499acd81997a54BBA8D852C6E53d/logo.png" alt="" />
                        <span>BADGER<small>Badger</small></span>
                      </div>
                      <div className='Token_delet_info'>
                        <span className='icon'>delete_outline</span>
                        <span className='icon'>launch</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="modal-footer justify-content-center">
              <button type="button" className="btn_ton_noBorder " data-bs-dismiss="modal" data-bs-target="#TokenList" data-bs-toggle="modal"><span className='icon'>undo</span>Back to list
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


