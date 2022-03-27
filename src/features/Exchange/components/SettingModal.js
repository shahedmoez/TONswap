import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { lowMinuteDeadline, highMinuteDeadline } from '../../../constance/exchangeConstance'
import { selectAuto, setAuto, selectTolerance, setTolerance, selectOutRengeTolerance, selectDeadline, setDeadline, selectOutRengeTime, defaultSetting, saveSetting, loadSetting } from "../exchangeSlice";


// for set position of setting modal
export const modalPosition = (e) => {
  var viewportOffset = e.target.getBoundingClientRect();
  var top = viewportOffset.top;
  var left = viewportOffset.left - 216;
  document.getElementById("setting_content").style.top = top + "px";
  document.getElementById("setting_content").style.left = left + "px";
}


export default function SettingModal() {
  const auto = useSelector(selectAuto);
  const tolerance = useSelector(selectTolerance);
  const outRengeTolerance = useSelector(selectOutRengeTolerance);
  const deadline = useSelector(selectDeadline);
  const outRengeTime = useSelector(selectOutRengeTime);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const [time, setTime] = useState("");
  return (
    <>
      <div className="modal fade" id="Setting_Exchange" tabIndex="-1" aria-labelledby="settingsModalLabel" aria-hidden="true" data-bs-backdrop="false">
        <div className="modal-dialog" id='setting_content'>
          <div className="modal-content">
            <div className="modal-header py-1">
              <h6 className="modal-title text_color" id="settingsModalLabel">Transaction Settings</h6>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { dispatch(loadSetting()); setInputValue(""); setTime("") }} ></button>
            </div>
            <div className="modal-body">
              <div className='setting_body'>
                <p className=''>Slippage tolerance <small className='tooltips'>? <span className='tooltiptext'>Your transaction will revert if the price changes unfavorably by more than this percentage.</span></small></p>
                <div className='d-flex justify-content-around align-items-center'>
                  <button className='auto_btn'>
                    <input type="checkbox" checked={auto} onChange={(e) => { dispatch(setAuto()); setInputValue("") }} />
                    <div>Auto</div>
                  </button>
                  <div className='peresent' id="tolerans">
                    <input className='persent_input' type='number' placeholder={tolerance} value={inputValue} onChange={(e) => { dispatch(setTolerance(e.target.value)); setInputValue(e.target.value) }} />
                    <span className=''>%</span>
                  </div>
                </div>
                {outRengeTolerance ? <><div className='alert_persent'>your transaction may fail</div></>
                  : <></>}
                <p className='pt-3'>transaction deadline <small className='tooltips'>? <span className='tooltiptext'>Your transaction will revert if it is pending for more than this period of time.</span></small></p>
                <div className='d-flex justify-content-center align-items-center'>
                  <div className='peresent d-flex align-items-center justify-content-center'>
                    <input className='persent_input me-1 pe-1' type='number' placeholder={deadline} value={time} onChange={(e) => { dispatch(setDeadline(e.target.value)); setTime(e.target.value) }} />
                    minits
                  </div>
                </div>
                {outRengeTime ? <><div className='alert_persent px-3'>deadline must be between {lowMinuteDeadline} and {highMinuteDeadline} </div></>
                  : <></>
                }
              </div>
            </div>
            <div className="modal-footer justify-content-center py-1">
              {outRengeTime ? <></>
                : <>
                  <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => dispatch(saveSetting())}>Save</button></>
              }
              <button type="submit" className="btn btn-outline-primary" onClick={() => { dispatch(defaultSetting()); setInputValue(""); setTime("") }}>default</button>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}


