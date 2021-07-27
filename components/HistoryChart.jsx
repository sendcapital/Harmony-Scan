import React, { useRef, useEffect, useState } from "react";
import { historyOptions } from "../chartjs/chartConfig";
import Chartjs from "chart.js";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  margin: {
    margin: "8px !important",
  },

  charting: {
    background: "#f8f8ff",
    borderColor: "rgba(174, 305, 194, 0.4)",
    marginLeft: "200px",
    marginRight: "200px",
    paddingLeft: "80px",
    paddingRight: "80px",
    paddingTop: "32px",
    paddingBottom: "32px",
    color: "#00AEE9",
    border: "5px solid",
    borderRadius: "25px",
  }
  }));

  
const HistoryChart = ({ data, overlay }) => {
  const classes = useStyles();
  const chartRef = useRef();
  const { day, week, year, detail, tickers } = data;
  const [timeFormat, setTimeFormat] = useState("24h");
  const [daydisable, setDayDisable] = useState(true);
  const [weekdisable, setWeekDisable] = useState(false);
  const [yeardisable, setYearDisable] = useState(false);
  let colors = ['#00AEE9','#69FABD'];
  let overlayday
    , overlayweek
    , overlayyear
    , overlaydetail
    , overlaytickers
    , chartInstance = ""
    , datasets=[]

  const determineTimeFormat = () => {
    switch (timeFormat) {
      case "24h":
          return day;
      case "7d":
          return week;
      case "1y":
          return year;
      default:
          return day;
    };
  };

  const determineOverlayTimeFormat = () => {
    switch (timeFormat) {
      case "24h":
          return overlayday;
      case "7d":
          return overlayweek;
      case "1y":
          return overlayyear;
      default:
          return overlayday;
    };
  };

  function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  };

  if (typeof overlay.detail != 'undefined') {
    overlayday = overlay.day;
    overlayweek = overlay.week;
    overlayyear = overlay.year;
    overlaydetail = overlay.detail;
    overlaytickers = overlay.tickers;


    let dataset = {
      label: `${capitalizeFirstLetter(overlaydetail)} volume in BTC`,
      data: determineOverlayTimeFormat(),
      backgroundColor: "transparent",
      borderColor: colors[1],
      pointRadius: 0,        
    };
    datasets.push(dataset);
  };


  if (typeof day != 'undefined') {
    let dataset = {
      label: `${capitalizeFirstLetter(detail)} volume in BTC`,
      data: determineTimeFormat(),
      backgroundColor: "transparent",
      borderColor: colors[0],
      pointRadius: 0,
    };
    datasets.push(dataset);
  };



  useEffect(() => {
    const draw = () => {
      if (chartRef && chartRef.current && detail) {
        chartInstance = new Chartjs(chartRef.current, {
            type: "line",
            data: {
              datasets: datasets,
            },
            options: {
                ...historyOptions,
            },
        });            
      };
    };
    console.log(chartInstance);
    draw();
    console.log(chartInstance);
  });

  const renderVol = () => {
    if (tickers) {
      return (
        <>
          <p>Trade Volume for {tickers.name} in past 24h: {tickers.trade_volume_24h_btc.toFixed(2)} BTC</p>
          {overlaytickers && <p>
          Trade Volume for {capitalizeFirstLetter(overlay.detail)} in past 24h:  
          {overlaytickers.trade_volume_24h_btc.toFixed(2)} BTC
          </p>}
        </>
      );
    }
  };

  return ( 
    <>
    <div className ={classes.charting} >   
      <div>{renderVol()}</div>
      <div id="graph-container">
        <canvas ref = { chartRef }
        id="results-graph"
        width={250}
        height={400}  > </canvas> 
      </div>
      <div>
        <Button variant="outlined" size="medium" className={classes.margin} disabled={daydisable}
        onClick = {() => {
          setTimeFormat("24h");
          chartInstance.destroy();
          setDayDisable(true);
          setWeekDisable(false);
          setYearDisable(false);
        }} >
        24 h 
        </Button> 

        <Button variant="outlined" size="medium" className={classes.margin} disabled={weekdisable}
        onClick = {() => {
          setTimeFormat("7d");
          chartInstance.destroy();
          setDayDisable(false);
          setWeekDisable(true);
          setYearDisable(false);
        }} >
        7 d 
        </Button> 

        <Button variant="outlined" size="medium" className={classes.margin} disabled={yeardisable}
        onClick = {() => {
          setTimeFormat("1y");
          chartInstance.destroy();
          setDayDisable(false);
          setWeekDisable(false);
          setYearDisable(true);
        }} >
        1 y 
        </Button> 
      </div>     

    </div>
    </>
  );

};

export default HistoryChart;