import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import { alpha, makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import NewAccount from './newAccount';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      justifyContent: "center",
      width: "100%",
      marginBottom: "100px",
      paddingBottom: "100px",
    },
    inner: {
      margin: theme.spacing(10),
    },
    container: {
      display: "flex",
      justifyContent: 'center',
      flexWrap: "wrap",
      alignItems: "center",      
    },
    smallCards: {
      height: "200px",
    },
    search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    border: "1px solid #00AEE9",
    color: "#00AEE9",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    color: "#00AEE9",
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '18ch',
      '&:focus': {
        width: '38ch',
      },
    },
  },
  invalid: {
    borderColor: "red",
    color: "red",
  },
  invalidText: {
    color: "red",
    paddingLeft: theme.spacing(1),
  }
}))



const SelectAccount = ( { onSelectAccounts, onGetSavedAccounts } ) => {
  const classes = useStyles();
  const [, updateState] = useState();
  const [isValid, setIsValid] = useState(true);
  const initialState = onGetSavedAccounts == null ? 
  [{
    id: '1',
    address: 'one1srsg5legjrwsn8mzlz2tct53t6ushj9let6h2y',
    balance: '234.23',
    txcount: '100'
  }]
  : onGetSavedAccounts;
  const [accounts, setAccounts] = useState(initialState);
  const [isSelected, setIsSelected] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [id, setId] = useState(0);
  const { Harmony } = require("@harmony-js/core");
  const { HarmonyAddress, toChecksumAddress } = require("@harmony-js/crypto");
  const { ChainID, ChainType, isValidAddress, isBech32Address } = require("@harmony-js/utils");
  const hmy = new Harmony("https://api.s0.t.hmny.io", {
    chainType: ChainType.Harmony,
    chainId: ChainID.HmyMainnet,
  });

  const submitHandler = async (event) => {
    if (event.keyCode == 13) {
      let addr = event.target.value.trim();
      let valid = false;

      try { 
        if ( HarmonyAddress.isValidBech32(addr) && isValidAddress(addr) ) {
          valid = true;
        } else {
          valid = false;
        }
      } catch (e) {
        console.log('err');
      } finally {
        console.log('done');
      }

      if (addr.length == 42 && valid ) {
        console.log('value', addr);
        let generatedData = await generateAccountData(addr);
        console.log(generatedData);
        onSaveAccountData(generatedData);
      } else {
        setIsValid(false);
      }
    } else {
      console.log('err');
    }
  };

  const generateAccountData = async (address) => {
    if (isValidAddress(address)) {
      const [balance, txcount] = await Promise.all([
        hmy.blockchain.getBalance({
          address: address,
          blockNumber: 'latest'
        }).then(value => {
          return (parseInt(value.result, 16)/ 10**18).toFixed(3);
        }),
        hmy.blockchain.getTransactionCount({
          address: address
        }).then((value) => {
          return parseInt(value.result, 16);
        })
      ]);
      const accountData = {
        id: Math.random().toString(),
        address: address,
        balance: balance,
        txcount: txcount
      };
      return accountData;
    }
  };

  const onSaveAccountData  = (newAccountData) => {
    if (accounts.length == 1) {
      setAccounts((prevAccounts) => {
        return [newAccountData, ...prevAccounts]
      });
      setIsSelected(true);
    } else if (accounts.length == 0) {
      setAccounts((prevAccounts) => {
        return [newAccountData, ...prevAccounts]
      });
      setIsSelected(false);
    } else {
      console.log('max accounts reached');
    }

  };

  useEffect(() => {
    const selectingAccounts = () => {
        if (isSelected == true) {
            onSelectAccounts(accounts);
            console.log('selected');
        } else {
            onSelectAccounts(accounts);
            console.log('not selected');
        };
    };
    console.log('help 2');
    console.log(isSelected);
    selectingAccounts();
  }, [isSelected]);

  const inputChangeHandler = (event) => {
    if (event.target.value.trim().length > 0) {
      setIsValid(true);
    }
  };

  useEffect(() => {
    const deletingAccount = () => {
      if (isDeleting == true) {
        for (let i=0; i<accounts.length; i++) {
          if (accounts[i].id == id) {
            if (i > -1) {
              accounts.splice(i, 1);
              setAccounts(accounts);
              onSelectAccounts(accounts);
              setIsSelected(false);
            }
          }
        };
      }
    };
  deletingAccount();
  setIsDeleting(false);  
  }, [isDeleting]);

  const deleteAccount = (id) => {
    setId(id); 
    setIsDeleting(true);     
  };


  return (
    <>
      <div className={classes.container}>
        <div className={` ${classes.search} ${!isValid && classes.invalid}`}>
            <div className={classes.searchIcon}>
              <SearchIcon/>
            </div>
            <InputBase
              placeholder="one1srsg5legjrwsn8mzlz2tct53t6ushj9let6h2y"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onKeyDown={submitHandler}
              onChange={inputChangeHandler}
            />
        </div>
        {!isValid && <p className={classes.invalidText}>Invalid address</p>}
      </div>    
      <div className={classes.root}>
        <div className={classes.inner}>
          <Grid container spacing={3}>
              <NewAccount 
                items={accounts} 
                onDeleteAccount={deleteAccount} 
                onClick={() => {console.log('hello')}}
              />
          </Grid>
        </div>
      </div>
    </>
  );
  

}

export default SelectAccount;