import logolight from '../imges/tonlogos/logolight.svg'
import githubblue from '../imges/github-blue.svg'
import telegram from '../imges/telegram.svg'
import emailIcon from '../imges/email_icon.svg'
export default function Footer() {
    function topFunction() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

    return (
        <>

            <div className="px-3 w-100 py-md-5 py-3">
                <div className='d-flex justify-content-between align-items-center'>
                    <div className="col-sm-4">
                        <a href="/" className="">
                            <img className="nav-img" src={logolight} alt="" />
                        </a>
                    </div>
                    <div className="scroll-top d-md-none" onClick={topFunction}> Back to top </div>
                    <div className="nav-btns d-none d-md-flex col-sm-8 justify-content-end">
                        <a href="https://t.me/tonblockchain" className="btn btn-primary">
                            <img src={telegram} alt="" />
                            <span> Channel </span>
                        </a>
                        <a href="https://github.com/newton-blockchain" target="" className="btn btn-outline ms-sm-4">
                            <img src={githubblue} alt="" />
                            <span> Github </span>
                        </a>
                        <a href="mailto:press@ton.org" target="" className="btn btn-outline ms-sm-4">
                            <img src={emailIcon} className="email-icon" alt="" />
                            <span> Press </span>
                        </a>
                    </div>
                </div>
                <div className='d-none d-md-block'>
                    <div className="d-flex justify-content-between pt-5">
                        <div className="nav-item">
                            <div className="nav-item__btn"> Core </div>
                            <ul className="nav-item__list">
                                <li> <a href="/primer.pdf"> Primer </a> </li>
                                <li> <a href="/whitepaper.pdf"> Whitepaper </a> </li>
                                <li> <a href="/wallets"> Wallets </a> </li>
                                <li> <a href="/services/"> Services </a> </li>
                                <li> <a href="https://tonscan.org/" target=""> Explorer </a> </li>
                                <li> <a href="/bridge/"> Bridge </a> </li>
                                <li> <a href="/brand-assets"> Brand Assets </a> </li>
                                <li> <a href="https://ton.org/vacancies/" target=""> Vacancies </a> </li>
                            </ul>
                        </div>
                        <div className="nav-item">
                            <div className="nav-item__btn"> Toncoin </div>
                            <ul className="nav-item__list">
                                <li> <a href="/coin"> About Toncoin </a> </li>
                            </ul>
                        </div>
                        <div className="nav-item">
                            <div className="nav-item__btn"> Developers </div>
                            <ul className="nav-item__list">
                                <li> <a href="https://github.com/newton-blockchain" target=""> GitHub </a> </li>
                                <li> <a href="/docs"> Docs </a> </li>
                                <li> <a href="https://toncenter.com" target=""> API </a> </li>
                                <li> <a href="https://t.me/testgiver_ton_bot" target=""> Testnet Faucet </a> </li>
                                <li> <a href="https://testnet.tonscan.org/" target=""> Testnet Explorer </a> </li>
                                <li> <a href="/bridge?testnet=true"> Testnet Bridge </a> </li>
                            </ul>
                        </div>
                        <div className="nav-item">
                            <div className="nav-item__btn"> Mining </div>
                            <ul className="nav-item__list">
                                <li> <a href="/mining"> Mining Data </a> </li>
                            </ul>
                        </div>
                        <div className="nav-item">
                            <div className="nav-item__btn"> How It Works </div>
                            <ul className="nav-item__list">
                                <li> <a href="/how-it-works/pos"> Proof-of-Stake </a> </li>
                                <li> <a href="/how-it-works/bridge"> Bridge </a> </li>
                                <li> <a href="/how-it-works/mining"> Givers </a> </li>
                            </ul>
                        </div>
                        <div className="nav-item">
                            <div className="nav-item__btn"> Validators </div>
                            <ul className="nav-item__list">
                                <li> <a href="/validator"> Become validator </a> </li>
                                <li> <a href="https://tonmon.xyz/" target=""> Network Monitor </a> </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}