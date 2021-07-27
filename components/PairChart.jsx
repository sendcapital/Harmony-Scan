import React, { useRef, useEffect, useState } from "react";
import { pairOptions } from "../chartjs/doughnutConfig";
import Chartjs from "chart.js";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(() => ({
  charting: {
      background: "#f8f8ff",
      borderColor: "#00AEE9",
      marginLeft: "200px",
      marginRight: "200px",
      color: "#00AEE9",
      border: "5px solid",
      borderRadius: "25px",
  }
}));

const PairChart = ({ data, name }) => {
  const classes = useStyles();
  const chartRef = useRef();
  const exchange = name;
  const pairData  = data;
  let chartInstance ="";

  function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function randomColor(length) {
      let colorsArr = [];
      for (let i=0; i<length; i++) {
          let color = '#' + Math.floor(Math.random()*16**6).toString(16);
          colorsArr.push(color);
      }
      return colorsArr;
    }

  const formatData = (pairData) => {
      if (typeof pairData != "undefined") {
          let pairs = {};
          let adjustedPairs = {};
          let pairSet = {
              labels: [],
              volume: []
          };
          let total = 0;
          let mean = 0;
          let items = Object.keys(adjustedPairs).map(function(key) {
              return [key, pairs[key]];
          });

          for (let i=0; i< pairData.length; i++) {
              let pair = pairData[i];
              let pairName = pair.base + "<>" + pair.target;
              total += pair.converted_volume.usd;
              pairs[pairName] = pair.converted_volume.usd;
          };

          mean = total/pairData.length;

          for (let [key, value] of Object.entries(pairs) ) {
              if(value > mean) {
                  adjustedPairs[key] = value;
              } else {
                  if (adjustedPairs['Others']) {
                      adjustedPairs['Others'] += value;
                  } else {
                      adjustedPairs['Others'] = value;
                  }
              }
          }
          
          items.sort(function(first, second) {
              return second[1] - first[1];
          });     
          
          for (let [key, value] of Object.entries(adjustedPairs)) {
              pairSet.labels.push(key);
              pairSet.volume.push(value);
          }
          return pairSet;
      }
  }

  useEffect(() => {
      if (chartRef && chartRef.current && exchange && pairData) {
          let pairs = formatData(pairData);
          console.log(chartInstance);
          chartInstance = new Chartjs(chartRef.current, {
              type: "doughnut",
              data: {
                  labels: pairs.labels,
                  datasets: [{
                      data: pairs.volume,
                      backgroundColor: randomColor(pairs.labels.length),
                  }, 
                ],
              },
              options: {
                  ...pairOptions,
                  title: {
                      display: true,
                      text: `Proportion of ${capitalizeFirstLetter(exchange)} trading pairs`,
                      fontSize: 25,
                      fontColor: "#00AEE9",
                    },
              },
          });   
          console.log(chartInstance);    
      }
  });

  return ( 
      <>
    <Grid container spacing={3}>
      <Grid item xs={12}>
          <div className={classes.charting} >   
              <div id="graph-container">
              <canvas ref = { chartRef }
              id="results-graph"
              width={250}
              height={400}  > </canvas> 
              </div>
          </div>
      </Grid>
    </Grid>
      </>
    );
}

export default PairChart;