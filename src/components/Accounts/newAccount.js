import React, { useRef, useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { alpha, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    noPaddingRight: {
      margin: "0 !important" ,
      paddingRight: "0 !important"
    },
    paper: {
      padding: theme.spacing(2),
      margin: theme.spacing(.5, 0 , .5, 0),
      textAlign: 'center',
      background:
      'linear-gradient(15deg, #00AEE9 0%, #69FABD 100%)',
      color: "#FFF",
      fontSize: "1.5rem",
      '&:hover': {
        cursor: "pointer",
      },
    }
}));


const NewAccount = (props) => {

  const classes = useStyles();
  const [adding, setAdding] = useState(false);


  const deleteAccountHandler = (e, id) => {
    props.onDeleteAccount(id);
  };


  if ( props.items.length === 0 ) {
    return <h2>Found no accounts.</h2>
  };

  return (
    <>
    {props.items.map((account) => (
    <Grid item xs={12} className={classes.noPaddingRight} onClick={(e) => deleteAccountHandler(e, account.id)} key={account.id}>
      <Paper className={classes.paper}>
        Address: {account.address}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Balance: {account.balance}
          </Typography>
        </CardContent>                
      </Paper>
    </Grid>
    ))}
    </>
  )
};
export default NewAccount;