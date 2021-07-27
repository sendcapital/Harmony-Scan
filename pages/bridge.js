import { React } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import Header from '../src/Header';
import Footer from '../src/Footer';

const useStyles = makeStyles((theme) => ({
    root: {
      top: "0,",
      right: "0",
      left: "0",
      bottom: "0",
      marginTop: "0px",
      marginLeft: "50px",
      marginRight: "50px",
      marginBottom: "200px",
      flexGrow: 1,
    },
    data: {
      textAlign: "center",
      color: "#00AEE9",
      fontSize: "1.2rem",
      marginBottom: "50px",
    },
    visit: {
      color: "#00AEE9",
      textAlign: "center",
    },
    paper: {
      marginTop: "100px",
      marginLeft: "25px",
      marginRight: "25px",
      padding: theme.spacing(1),
      textAlign: 'center',
      transition: "all 1.0s",
      '&:hover': {
        transform: "scale(1.05)",
        transition: "all .1.0s",
      },
      background:
      'linear-gradient(15deg, #00AEE9 0%, #69FABD 100%)',
      color: "#FFF",
      fontSize: "1.5rem",
    },
    smallCards: {
      height: "200px",
      marginLeft: "auto",
      marginRight: "auto"
    },
    mediumCards: {
      height: "300px",
      marginLeft: "auto",
      marginRight: "auto"
    },
    JumboCards: {
      height: "600px",
      marginLeft: "auto",
      marginRight: "auto"
    }
  }));

const Bridges = () => {

  const classes = useStyles();

    return (
      <>
      <Header />
        <h1>Horizon Bridge Analytics</h1>
        <p className={classes.data} >Data provided by Dune Analytics</p>
        <p className={classes.visit} >Visit our<a href="https://duneanalytics.com/sendmeat/HarmonyScan"> Dune Analytics Dashboard</a> for more!</p>
        
        <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Paper className={classes.paper}>Current Price of ONE
              <CardMedia
                  component="iframe"
                  alt="Current Price of ONE"
                  className={classes.smallCards}
                  height="100"
                  image="https://duneanalytics.com/embeds/65995/132852/fd86acb5-6fbd-45ef-8f99-27fe2dc01177"
                  title="Current Price of ONE"
              />         
          </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>Total Transactions made
              <CardMedia
                component="iframe"
                alt="Total TX made"
                className={classes.smallCards}
                height="140"
                image="https://duneanalytics.com/embeds/68504/136523/2b9fbd64-d34b-4f95-9ff2-f94f3764b26d"
                title="Total TX made"
              />                   
          </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>Total Unique Users
              <CardMedia
                  component="iframe"
                  alt="Total Unique Users"
                  className={classes.smallCards}
                  height="140"
                  image="https://duneanalytics.com/embeds/68596/136667/3b4a00d1-76de-42a3-9c2c-2fcf4660e395"
                  title="Total Unique Users"
              />                     
          </Paper>  
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>Total Unique Users per Week
              <CardMedia
                component="iframe"
                alt="Total Unique Users per Week"
                className={classes.smallCards}
                height="140"
                image="https://duneanalytics.com/embeds/68559/136651/4054235c-c432-4c75-a582-dae940e83359"
                title="Total Unique Users per Week"
              />           
          </Paper>
          </Grid> 
          <Grid item xs={6}>
            <Paper className={classes.paper}>ONE Price 1 day
              <CardMedia
                component="iframe"
                alt="ONE Price 1 day"
                className={classes.smallCards}
                height="140"
                image="https://duneanalytics.com/embeds/66049/131995/4ce17a3e-ae1c-4013-98b8-9ecade283ce7"
                title="ONE Price 1 day"
              />               
          </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>ONE Price 14 days
              <CardMedia
                component="iframe"
                alt="ONE Price 14 day"
                className={classes.smallCards}
                height="140"
                image="https://duneanalytics.com/embeds/66475/132732/d1851175-0a47-412a-9c95-ac4b3d95bf01"
                title="ONE Price 14 day"
              />               
          </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>ONE Price 30 days
              <CardMedia
                component="iframe"
                alt="ONE Price 30 day"
                className={classes.smallCards}
                height="140"
                image="https://duneanalytics.com/embeds/65972/132739/4daaf7b5-f2f0-4e53-8af3-4a5d588e60ea"
                title="ONE Price 30 day"
              />               
          </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>ONE Price All Time
              <CardMedia
                component="iframe"
                alt="ONE Price All Time"
                className={classes.smallCards}
                height="140"
                image="https://duneanalytics.com/embeds/66480/132745/ff847a6d-b8b6-4732-be05-dceea51d9981"
                title="ONE Price All Time"
              />               
          </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>Inflow Frequency
              <CardMedia
                component="iframe"
                alt="Inflow Frequency"
                className={classes.mediumCards}
                height="140"
                image="https://duneanalytics.com/embeds/66047/133062/a203433e-84c1-473b-bd0e-626f263948e0"
                title="Inflow Frequency"
              />               
          </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>Outflow Frequency
              <CardMedia
                component="iframe"
                alt="Outflow Frequency"
                className={classes.mediumCards}
                height="140"
                image="https://duneanalytics.com/embeds/68377/136276/dd81eba4-2218-4703-9e1c-300309bd61ae"
                title="Outflow Frequency"
              />               
          </Paper>
          </Grid>        
          <Grid item xs={6}>
            <Paper className={classes.paper}>Total Outflow from Bridge in USD
              <CardMedia
                component="iframe"
                alt="Total Outflow from Bridge"
                className={classes.mediumCards}
                height="140"
                image="https://duneanalytics.com/embeds/66182/136164/046965d0-b562-41f6-85b8-813a229b43cb"
                title="Total Outflow from Bridge"
              />           
          </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>Total Inflow from Bridge in USD
              <CardMedia
                component="iframe"
                alt="Total Inflow from Bridge"
                className={classes.mediumCards}
                height="140"
                image="https://duneanalytics.com/embeds/66179/136241/a6e180d5-1bf8-4fb6-a326-87233dd8c2fe"
                title="Total Inflow from Bridge"
              />               
          </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>Total Value Locked in Bridge in USD
              <CardMedia
                component="iframe"
                alt="Total Value Locked in Bridge"
                className={classes.mediumCards}
                height="140"
                image="https://duneanalytics.com/embeds/68392/136323/6d22f4df-27af-47ef-a141-19a42fb07461"
                title="Total Value Locked in Bridge"
              />               
          </Paper>
          </Grid>
        </Grid>
      </div>
    <Footer />
    </>
    )
  }
  
export default Bridges;

