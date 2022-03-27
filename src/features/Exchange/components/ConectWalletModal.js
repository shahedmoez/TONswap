
import { useDispatch, useSelector } from 'react-redux'
import { wallets } from '../../../constance/exchangeConstance'
import { setWallet, selectWallet } from '../exchangeSlice'

export default function ConectWalletModal() {
  const dispatch = useDispatch();
  const userWallet = (wallet) => dispatch(setWallet(wallet));
  const wallet = useSelector(selectWallet);
  return (
    <>
      <div className="modal fade" id="conect_wallet" tabIndex="-1" role="dialog" aria-labelledby="conect_to_wallet" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable" role="document">
          <div className="modal-content">
            <div className="modal-header py-2">
              <h5 className="modal-title text_color" id="conect_to_wallet">Conect To wallet</h5>
              <button id='close_modal' type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
            </div>
            <div className="list_url">
              <div className="conect_wallet_privacy text_color">
                By connecting a wallet, you agree to Ton <a href='https://ton.org/'><b>Terms of Service</b></a> and acknowledge that you have read and understand the Ton<a href='https://ton.org/'><b> Protocol Disclaimer</b></a>.
              </div>
            </div>
            <div className="modal-body modal_body modal-dialog-scrollable d-flex">
              <div className="TokenList_all w-100 d-flex">
                <span className="label_On_border">Wallets</span>
                <ul className=" modal-body modal_body">
                  {wallets.map((row, index) =>
                    <li key={index} className="wallet_list_item" onClick={() => userWallet(row.name)}>
                      <span>{row.name}</span>
                      <div className='d-flex align-items-center'>
                        <div className='wallet_check'>
                          {row.name === wallet ? <span className='wallet_btn'>task_alt</span> : <></>}
                        </div>
                        <img src={row.image} alt="" />
                      </div>
                    </li>)}
                </ul>
              </div>
            </div>
            <div className="modal-footer justify-content-center py-2">
              <a href='https://ton.org/' className="d-flex align-items-center">How this app uses APIs</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


