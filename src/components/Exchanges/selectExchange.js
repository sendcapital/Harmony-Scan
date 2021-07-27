import React, { useState } from 'react';
import clsx from  'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
  box : {
    borderRadius: "5px",
    padding: "30px",
    margin: "20px",
    transition: "all .2s ease-in-out",
    "& p": {
      color: "hsl(229, 6%, 66%)"
    },
    "&:hover": {
      cursor: "pointer",
      transform: "scale(1.1)",
    },
    '@media (max-width: 950px) and (min-width: 450px)': {
      textAlign: "center",
      height: "180px",
    },
    '@media (max-width: 450px)': {
      height: "200px",
    },
  },
  cyan: {
    borderTop: "3px solid hsl(180, 62%, 55%)",
  },
  red: {
    borderTop: "3px solid hsl(0, 78%, 62%)",
  },
  blue: {
    borderTop: "3px solid hsl(212, 86%, 64%)",
  },
  orange: {
    borderTop: "3px solid hsl(34, 97%, 64%)",
  },
  h2: {
    color: "hsl(234, 12%, 34%)",
    fontWeight: "600",
  },
  "@media (min-width: 950px)": {
    row1Container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    row2Container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    boxDown: {
        position: "relative",
        top: "150px",
    },
    box: {
        width: "20%",
    },
  },
"@media (max-width: 450px)": {
    box: {
        height: "200px",
    }
  },
  "@media (max-width: 950px) and (min-width: 450px)": {
    box: {
        textAlign: "center",
        height: "180px",
    }
  },
  glow: {
    boxShadow: "0 0 10px #719ECE",
  }


}));


const SelectExchange = ( { onSelectExchanges, onGetSavedExchanges } ) => {
  const [exchanges, setExchanges] = useState();
  const _ = require('lodash');
  const initialState = (onGetSavedExchanges == undefined) ? 
  [false, false, false, false]
  : ((exchange) => {
    if (exchange !== undefined) {
      let savedArr = [];
      switch (exchange.includes('viperswap')) {
        case true:
          savedArr.push(true);
          break;
        case false:
          savedArr.push(false);
          break;
      };
      switch (exchange.includes('mochiswap')) {
        case true:
          savedArr.push(true);
          break;
        case false:
          savedArr.push(false);
          break;
      };
      switch (exchange.includes('vitex')) {
        case true:
          savedArr.push(true);
          break;
        case false:
          savedArr.push(false);
          break;
      };
      switch (exchange.includes('switchain')) {
        case true:
          savedArr.push(true);
          break;
        case false:
          savedArr.push(false);
          break;
      };
      return savedArr;
    } else {
      return [false, false, false, false];
    }
  })(onGetSavedExchanges);
  const [clicked, setClicked] = useState(initialState);
  const classes = useStyles();

  const setExchangeHandler = (id) => {
    if (_.countBy(clicked)['false'] > 2) {
      setClicked((prevActiveState) => {
        const prevArr = [...prevActiveState];
        prevArr[id] = !prevArr[id];
        return prevArr;
      });
    } else if (_.countBy(clicked)['false'] == 2 && clicked[id] == true){
      setClicked((prevActiveState) => {
        const prevArr = [...prevActiveState];
        prevArr[id] = !prevArr[id];
        return prevArr;
      });
    } else {
      console.log('Max of 2 exchanges')
    }
  }

  useEffect(() => {
    const updateExchanges = () => {
      let exchangeArr = [];
      switch (clicked[0]) {
        case true:
          exchangeArr.push('viperswap');
          break;
        case false:
          break;
      };
      switch (clicked[1]) {
        case true:
          exchangeArr.push('mochiswap');
          break;
        case false:
          break;
      };
      switch (clicked[2]) {
        case true:
          exchangeArr.push('vitex');
          break;
        case false:
          break;
      };
      switch (clicked[3]) {
        case true:
          exchangeArr.push('switchain');
          break;
        case false:
          break;
      };
      return exchangeArr;
    };
    onSelectExchanges(updateExchanges());
  }, [clicked]);

  return (
    <>
      <div className={classes.row1Container}>
          <div 
            className={ clsx(classes.box, classes.boxDown, classes.cyan)} 
            onClick={() => {setExchangeHandler(0)} }
            style={{boxShadow: (clicked[0]) ? "0 0 10px #719ECE" : "0px 30px 40px -20px hsl(229, 6%, 66%)"}}
            >
            <h2>ViperSwap</h2>
            <p>Monitors activity to identify project roadblocks</p>
          </div>

          <div 
            className={ clsx(classes.box, classes.red) }
            onClick={() => {setExchangeHandler(1)} }
            style={{boxShadow: (clicked[1]) ? "0 0 10px #719ECE" : "0px 30px 40px -20px hsl(229, 6%, 66%)"}}
            id = {1}
          >
            <h2>MochiSwap</h2>
            <p>A Peer-to-Peer Multichain DEX DAO with Liquidity Pools</p>
    
          </div>

          <div 
            className={ clsx(classes.box, classes.boxDown, classes.blue) } 
            onClick={() => {setExchangeHandler(2)} }
            style={{boxShadow: (clicked[2]) ? "0 0 10px #719ECE" : "0px 30px 40px -20px hsl(229, 6%, 66%)"}}
            id = {2}
          >
            <h2>ViteX</h2>
            <p>Cross-Chain DEX By the Community, For the Community</p>
          </div>
        </div>
        <div className={classes.row2Container}>
          <div 
            className={ clsx(classes.box, classes.orange) }
            onClick={() => {setExchangeHandler(3)} }
            style={{boxShadow: (clicked[3]) ? "0 0 10px #719ECE" : "0px 30px 40px -20px hsl(229, 6%, 66%)"}}
            id = {3}
          >
            <h2>Switchain</h2>
            <p>Global exchange to swap assets for businesses</p>
          </div>
        </div>
    </>
  );
  

}

export default SelectExchange;