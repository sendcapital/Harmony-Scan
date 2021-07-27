import React from 'react';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(() => ({
  wrapper: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    placeItems: "center",
  },
  container: {
    position: "relative",
    width: "350px",
    height: "500px",
    borderRadius: "20px",
    padding: "40px",
    boxSizing: "border-box",
    background: "#ecf0f3",
    boxShadow: "14px 14px 20px #cbced1, -14px -14px 20px white",
    fontWeight: "900",
  },
  distance: {
    marginTop: "50px",
  }
}));


const InfoChart = ({ accounts, exchanges }) => {
  const classes = useStyles();
  console.log(accounts);
  return (
    <>
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <h2>Accounts</h2>
        <ul>
          {accounts.map((account) => (
            <li key={account.id}>{account.address.slice(0, 10) + "..."}</li>
          ))}
        </ul>
        <h2 className={classes.distance}>Exchanges</h2>
        <ul>
          {exchanges.map((exchanges) => (
            <li key={Math.random()}>{exchanges}</li>
          ))}
        </ul>        
      </div>
    </div>
    </>
  )
};

export default InfoChart;