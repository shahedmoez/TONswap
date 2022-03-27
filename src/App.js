import React from 'react';
import Navbar from './container/navbar';
import Footer from './container/footer';
import './styles/style.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './container/pages/HomePage'
import ExchangePage from './container/pages/ExchangePage'
import PoolPage from './container/pages/PoolPage'
import LiquidityPage from './container/pages/LiquidityPage'

function App() {
  return (
    <>
    <BrowserRouter>
     <Navbar />
     <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/Exchange' element={<ExchangePage />} />
        <Route path='/Pool' element={<PoolPage/>} />
        <Route path='/Liquidity' element={<LiquidityPage />} />
      </Routes>
      </BrowserRouter>
      <Footer/>
    </>
  );
}

export default App;
