import React from "react"
import logolight from '../imges/tonlogos/logolight.svg'
import githubblue from '../imges/github-blue.svg'
import telegram from '../imges/telegram.svg'
import {Link } from 'react-router-dom'

export default function Navbar() {

  return (
    <>
 
        <nav className="navbar navbar-expand-lg navbar-light  py-md-5 py-3 mt-2">
          <div className="container-fluid">
            <a className="navbar-brand " href="/">
              <img className="nav-img" src={logolight} alt="Ton" />
            </a>
            <button id="nav-btn" className="navbar-toggler" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasNavbarLabel"><img className="nav-img" src={logolight} alt="Ton" /></h5>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div className="offcanvas-body">
                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                  <li className="nav-item" data-bs-dismiss="offcanvas">
                    <span className="nav-link px-4 active" aria-current="page" href="/">
                    <Link to={"/"} className="nav-link nav-link-custom" >Home</Link>
                    </span>
                  </li>
                  <li className="nav-item" data-bs-dismiss="offcanvas">
                    <span className="nav-link px-4" href="/Exchange">
                    <Link to={"/Exchange"} className="nav-link nav-link-custom" >Exchange</Link></span>
                  </li>
                  <li className="nav-item" data-bs-dismiss="offcanvas">
                    <span className="nav-link px-4" href="/Pool">
                    <Link to={"/Pool"} className="nav-link nav-link-custom" >Pool</Link></span>
                  </li>
                  <li className="nav-item" data-bs-dismiss="offcanvas">
                    <span className="nav-link px-4" href="/Liquidity">
                    <Link to={"/Liquidity"} className="nav-link nav-link-custom" >Liquidity</Link></span>
                  </li>
                </ul>
                {/* this part only show in burger Menu */}
                <div className="offcanvas-header">
                  <div className="nav-btns d-flex justify-content-around w-100">
                    <a href="https://t.me/tonblockchain" className="btn btn-primary">
                      <img src={telegram} alt="" />
                      <span> Channel </span>
                    </a>
                    <a href="https://github.com/newton-blockchain" target="" className="btn btn-outline">
                      <img src={githubblue} alt="" />
                      <span> Github </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
        
       
      </>
        
  )
}