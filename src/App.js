import React, { useState, useEffect } from "react";
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Exchange from './pages/Exchange';
import Bridges from './pages/Bridges';
import Home from './pages/Home';
import Account from './pages/Account';

export default function App() {

  const useStyles = makeStyles((theme) => ({
    '@global': {
      ul: {
        margin: 0,
        padding: 0,
        listStyle: 'none',
      },
    },
    appBar: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      background:
      'linear-gradient(15deg, #00AEE9 0%, #69FABD 100%)',
      padding: theme.spacing(2),
    },
    toolbar: {
      flexWrap: 'wrap',
    },
    link: {
      margin: theme.spacing(1, 1.5),
      color: '#00AEE9',
      fontSize: `1.5rem`,
      textDecoration: 'none'
    },
    toolbarTitle: {
      flexGrow: 1,
      color: '#69FABD',
      fontSize: `2rem`,
    },
  }));
  
  const classes = useStyles();

  return (
    <>
      <Router>
        <div>
        <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
              HarmonyScan
            </Typography>
            <nav>
              <Link to="/" variant="button" color="textPrimary" className={classes.link}>
              Exchanges
              </Link>
              <Link to="/account" variant="button" color="textPrimary" className={classes.link}>
              Account
              </Link>
              <Link to="/bridges" variant="button" color="textPrimary" className={classes.link}>
              Horizon Bridge
              </Link>
            </nav>
          </Toolbar>
        </AppBar>
        
  {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/bridges">
              <Bridges />
            </Route>
            <Route path="/exchanges">
              <Exchange />
            </Route> 
            <Route path="/account">
              <Account />
            </Route> 
            <Route path="/">
              <Home />
            </Route> 
          </Switch>
        </div>
        
      </Router>
    </>
  );
}








