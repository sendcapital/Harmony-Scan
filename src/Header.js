import React, { useState, useEffect } from "react";
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Link from 'next/link';


const useStyles = makeStyles((theme) => ({
    appBar: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      background:
      'linear-gradient(15deg, #00AEE9 0%, #69FABD 100%)',
      padding: theme.spacing(2),
      fontFamily: `'Nunito Sans', sans-serif`,
    },
    toolbar: {
      flexWrap: 'wrap',
    },
    link: {
      margin: theme.spacing(1, 1.5),
      color: '#00AEE9',
      fontSize: `1.5rem`,
      textDecoration: 'none',
      '&:hover': {
        cursor: "pointer",
      }
    },
    toolbarTitle: {
      flexGrow: 1,
      color: '#69FABD',
      fontSize: `2rem`,
      fontWeight: "600",
      '&:hover': {
        cursor: "pointer",
      }
    },
  }));

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Link href="/exchange" variant="button" color="textPrimary" className={classes.link}>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            HarmonyScan
          </Typography>
        </Link>

        <nav>
          <Link href="/account" variant="button" color="textPrimary">
          <span className={classes.link}>Account</span>
          </Link>
          <Link href="/bridge" variant="button" color="textPrimary">
          <span className={classes.link}>Horizon Bridge</span>
          </Link>
        </nav>
      </Toolbar>
    </AppBar>
  );
}

export default Header