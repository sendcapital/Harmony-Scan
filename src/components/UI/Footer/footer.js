import React, { useState, useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { makeStyles } from '@material-ui/core/styles';
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(fab);
const useStyles = makeStyles((theme) => ({
  root: {
    top: "0,",
    right: "0",
    left: "0",
    bottom: "0",
    margin: "0",
    padding: "0",
    paddingBottom: "60px",
    minGeight: "100vh",
  },
  siteFooter: {
    position: "fixed",
    left: "0",
    bottom: "0",
    right: "0",
    alignItems: "left",
    background: 'linear-gradient(15deg, #00AEE9 0%, #69FABD 100%)',
    padding: "35px 100px 0px",
    fontSize: "15px",
    lineHeight: "24px",
    color: "#FFF",    
      '& h6': {
        color: "#FFF",
        fontSize: "16px",
        textTransform: "uppercase",
        marginTop: "5px",
        letterSpacing: "2px",
      },
      '& a': {
        color: "#737373",
        '&:hover': {
          color: "#3366cc",
          textDecoration: "none",
        }
      }
  },
  footerLinks: {
    paddingLeft: "0",
    listStyle: "none",
    '& li': {
      display: "block",
    },
    '& a': {
      color: "#737373",
      '&:active': {
        color: "#3366cc",
        textDecoration: "none",
      },
      '&:focus': {
        color: "#3366cc",
        textDecoration: "none",
      },
      '&:hover': {
        color: "#3366cc",
        textDecoration: "none",
      },
    },
  },
  socialIcons: {
    textAlign: "right",
    paddingLeft: "0px",
    marginBottom: "0",
    listStyle: "none",
    '& li': {
      paddingTop: "10px",
      display: "inline-block",
      marginBottom: "4px",
      paddingLeft: "30px",
    },
  },
  github: {
    color: "#00AEE9",
    '&:hover':{
      color: "#000"
    }
  },
  twitter: {
    color: "#00AEE9",
    '&:hover':{
      color: "#FFF"
    }
  },
  discord: {
    color: "#00AEE9",
    '&:hover':{
      color: "#007bb6"
    }
  },
}));

const Footer = () => {
  // const [updated, setUpdated] = useState(Date.now());
  // const [elapsed, setElapsed] = useState(0);

  const [time, setTime] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
  });

  useEffect(() => {
    let isCancelled = false;

    const advanceTime = () => {
      setTimeout(() => {
        let nSeconds = time.seconds;
        let nMinutes = time.minutes;
        let nHours = time.hours;

        nSeconds++;

        if (nSeconds > 59) {
          nMinutes++;
          nSeconds = 0;
        }
        if (nMinutes > 59) {
          nHours++;
          nMinutes = 0;
        }
        if (nHours > 24) {
          nHours = 0;
        }

        !isCancelled && setTime({ seconds: nSeconds, minutes: nMinutes, hours: nHours });
      }, 1000);
    };
    advanceTime();

    return () => {
      isCancelled = true;
    };
  }, [time]);


  const classes = useStyles();
  return (
    <div className={classes.root}>
      <footer className={classes.siteFooter}>
        <Grid container spacing={9}>
          <Grid item xs={8}>
            <h6>About</h6>
            <p>Web application for Harmony to access Dune Analytics dashboards as well as compare exchange data</p>
            <p>Updated since {time.hours>0 && time.hours + 'h'} {time.minutes>0 && time.minutes + 'm'} {time.seconds}s ago</p>
          </Grid>
          <Grid item xs={4}>
            <ul className={classes.socialIcons}>
              <li>
                <a href="https://twitter.com/sendmeat">
                  <FontAwesomeIcon icon={['fab', 'twitter']} size="3x" className={classes.twitter}/>
                </a>
              </li>
              <li>
                <a href="https://github.com/sendmeat/Harmony-Scan">
                  <FontAwesomeIcon icon={['fab', 'github']} size="3x" className={classes.github}/>
                </a>
              </li>
            </ul>
          </Grid>
        </Grid>
      </footer>
    </div>
  );
}

export default Footer;