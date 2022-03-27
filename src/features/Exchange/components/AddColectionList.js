import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addColection, selectColectionList, loadList, addList, selectLoadColection, selectError, selectLoadList } from "../exchangeSlice";
import Loading from "./loading/Loading";
import diamond from '../../../imges/diamond.gif';

export default function AddColectionList() {

  const [urlColection, setUrlColection] = useState("");
  const [isloaded, setIsloaded] = useState(-2); //-2 : user not import url or not Ckicked to import colection
  const dispatch = useDispatch();
  const colectionList = useSelector(selectColectionList);
  const Error = useSelector(selectError);
  const LoadColection = useSelector(selectLoadColection);
  const isLoadingList = useSelector(selectLoadList);


  //for past btn
  async function pasteClip(id) {
    let text = await navigator.clipboard.readText();
    setUrlColection(text);
  }

  //for check url and add colection 
  const checkAddcolection = (url) => {
    let exist = false;
    for (let i = 0; i < colectionList.length; i++) {
      if (colectionList[i].url === url) { exist = true; setIsloaded(i); setUrlColection("") };// isloaded: i => return index of exist colection 
    }
    if (!exist && !(url === "")) { setIsloaded(-1) }; //isloaded: -1 => colection not exist and will be add if no errorr
  }


  return (
    <>
      <div className="input-group rounded position-relative">
        <input id="search_colection" type="url" className="form-control rounded" placeholder="Insert a link adress of list" value={urlColection} onChange={(e) => setUrlColection(e.target.value)} />
        <button className="icon search_btn" onClick={() => checkAddcolection(urlColection)}>search</button>
        <span className="icon paste_btn" onClick={() => pasteClip("search_colection")}>content_paste</span>
      </div>
      {isLoadingList === "loading" ? <div className="d-flex justify-content-center mt-3"><span style={{ "color": 'var(--tonBlue)' }}>List is Loading</span><img alt="" className='diamond_middle' src={diamond} /></div> : <></>}
      {isloaded === -2 ? <></>
        : isloaded >= 0 ?
          <ul className=" modal-body modal_body">
            <li className="Token_list_item">
              <div className='Token_list_info' >
                <img src={colectionList[isloaded].image} alt="" />
                <span>{colectionList[isloaded].name}<small>{colectionList[isloaded].tokensNumber} tokens</small></span>
              </div>
              <span className="icon_static">task_alt</span>
              <div className='import_btn'>
                <input type="checkbox" onChange={() => { dispatch(loadList(isloaded)); setIsloaded(-2); colectionList[isloaded].load ? <></> : dispatch(addList(colectionList[isloaded].url)) }} checked={colectionList[isloaded].load} />
                {colectionList[isloaded].load ? <span>Remove Tokens</span>
                  : <span>Import Tokens</span>
                }
              </div>
            </li>
          </ul>
          : isloaded === -1
            ? <>
              <div className="alert_addList">
                <span className="icon_static">warning_amber</span>
                <p><b>Import at your own risk</b></p>
                <p>If you purchase a token from this list, you may not be able to sell it back.</p>
                <button onClick={(e) => { dispatch(addColection(urlColection)); e.target.parentElement.style.display = "none"; setUrlColection("") }} className="alert-link">Add List</button>
              </div>
              {LoadColection === "idle" ?
                <ul className=" modal-body modal_body">
                  <li className="Token_list_item">
                    <div className='Token_list_info' >
                      <img src={colectionList[colectionList.length - 1].image} alt="" />
                      <span>{colectionList[colectionList.length - 1].name}<small>{colectionList[colectionList.length - 1].tokensNumber} tokens</small></span>
                    </div>
                    <div className='import_btn'>
                      <input type="checkbox" onChange={() => { dispatch(loadList(colectionList.length - 1)); setIsloaded(-2); colectionList[colectionList.length - 1].load ? <></> : dispatch(addList(colectionList[colectionList.length - 1].url)) }} checked={colectionList[colectionList.length - 1].load} />
                      <span>Import Tokens</span>
                    </div>
                  </li>
                </ul>
                : LoadColection === "rejected" ? <span className="alert_persent">{Error}</span>
                  : LoadColection === "loading" ? <div className='d-flex'><p className='px-3 m-0'>Loading List...</p><Loading color="var(--tonBlue)" size="20px" top="-4px" left="-5px"></Loading></div> : <></>
              }
            </>
            : <></>
      }

    </>)
}