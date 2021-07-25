import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import NewExchange from './newExchange';
import './selectExchange.css';


const SelectExchange = () => {
  const [exchanges, setExchanges] = useState();

  const setExchangeHandler = (e) => {
    e.preventDefault();
    
  }

  return (
    <>
      <div class="row1-container">
          <div class="box box-down cyan" onClick={setExchangeHandler}>
            <h2>ViperSwap</h2>
            <p>Monitors activity to identify project roadblocks</p>
          </div>

          <div class="box red">
            <h2>MochiSwap</h2>
            <p>A Peer-to-Peer Multichain DEX DAO with Liquidity Pools</p>
    
          </div>

          <div class="box box-down blue">
            <h2>ViteX</h2>
            <p>Cross-Chain DEX By the Community, For the Community</p>
          </div>
        </div>
        <div class="row2-container">
          <div class="box orange">
            <h2>Switchain</h2>
            <p>Global exchange to swap assets for businesses</p>
          </div>
        </div>
    </>
  );
  

}

export default SelectExchange;