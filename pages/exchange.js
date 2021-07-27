import React, { useRef, useState, useEffect } from 'react';
import HistoryChart from "../components/HistoryChart";
import PairChart from "../components/PairChart";
import coinGecko from "./api/coinGecko";
import DexPairs from "../components/DexPairs";
import Pagination from '../src/Pagination';
import Button from '@material-ui/core/Button';
import { TextField } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import Loading from '../src/Loading';
import Footer from '../src/Footer';
import Header from '../src/Header';
import { useRouter } from "next/router";

const Exchange = () => {
    const [dexData, setDexData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isReading, setIsReading] = useState(false);
    const [pairData, setPairData] = useState([]);
    const [dexoverlay, setOverlayDexData] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(10);
    const [searchText, setSearchText] = useState("");
    const router = useRouter()
    const valueRef = useRef('');
    const {
    query: { id },
    } = router;

    const formatData = (data) => {
        return data.map((el) => {
            return {
                t: el[0],
                y: parseFloat(parseFloat(el[1]).toFixed(2)),
            };
        });
    };

    const formatList = (data) => {
        let newList = [];
        for (let i = 0; i < data.length; i++) {
            newList[i] = data[i]['id'];
        }
        return newList;
    }

    useEffect(() => {
        const fetchData = async() => {
            setIsLoading(true);
            const [day, week, year, tickers, exchanges] = await Promise.all([
                coinGecko.get(`/exchanges/${id}/volume_chart/`, {
                    params: {
                        id: id,
                        days: "1",
                    },
                }),
                coinGecko.get(`/exchanges/${id}/volume_chart/`, {
                    params: {
                        id: id,
                        days: "7",
                    },
                }),
                coinGecko.get(`/exchanges/${id}/volume_chart/`, {
                    params: {
                        id: id,
                        days: "365",
                    },
                }),
                coinGecko.get(`/exchanges/${id}/`, {
                    params: {
                        id: id,
                    },
                }),
                coinGecko.get(`/exchanges/list/`),
            ]);
            // console.log(day);

            setDexData({
                day: formatData(day.data),
                week: formatData(week.data),
                year: formatData(year.data),
                detail: id,
                tickers: tickers.data,
                exchanges: formatList(exchanges.data),
            });
            setIsLoading(false);
        };

        fetchData();
    }, []);

    if (Object.keys(dexData).length > 0 && isReading != true && (typeof dexData.tickers.tickers) != 'undefined') {
        setPairData(dexData.tickers.tickers);
        setIsReading(true);
    }

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = pairData.slice(indexOfFirstRow, indexOfLastRow);

    const overlaying = (dexName) => {
        if (typeof dexName != 'undefined' && dexName.length > 0) {
            const fetchOverlayData = async() => {

                let id = dexName;
                const [day, week, year, tickers] = await Promise.all([
                    coinGecko.get(`/exchanges/${id}/volume_chart/`, {
                        params: {
                            id: id,
                            days: "1",
                        },
                    }),
                    coinGecko.get(`/exchanges/${id}/volume_chart/`, {
                        params: {
                            id: id,
                            days: "7",
                        },
                    }),
                    coinGecko.get(`/exchanges/${id}/volume_chart/`, {
                        params: {
                            id: id,
                            days: "365",
                        },
                    }),
                    coinGecko.get(`/exchanges/${id}/`, {
                        params: {
                            id: id,
                        },
                    }),
                ]);
                // console.log(day);

                setOverlayDexData({
                    day: formatData(day.data),
                    week: formatData(week.data),
                    year: formatData(year.data),
                    detail: id,
                    tickers: tickers.data,
                });
                return dexoverlay;
            };
            fetchOverlayData();
        }
    };


    const useStyles = makeStyles((theme) => ({
        container: {
            display: "flex",
            justifyContent: 'center',
            flexWrap: "wrap",
            alignItems: "center",
        },
        textField: {
            marginTop: "30px",
            width: "400px",
            height: "100px",
            color: "#00AEE9",
        },
        searchButton: {
            background: "#ccc",
            color: "#00AEE9",
            float: "right",
            bottom: "5px",
            left: "30px",
            '&:hover': {
                background: "#00AEE9",
                color: "#69FABD",
            },
        },
        margin: {
            marginBottom: "100px",
        }

    }));

    const classes = useStyles();

    const renderData = () => {

        if (isLoading) {
            return <div><Loading/></div>;
        }

        const sendValue = async() => {
            overlaying(valueRef.current.value);
        }


        return ( 
          <>
          <Header />
            <div className = "exchangeList" >
                <h1> Exchange Data </h1> 
                <h2> { dexData.detail } </h2> 
                <div className = { classes.container } >
                    <Autocomplete id = "disabled-options-demo"
                    className = { classes.textField }
                    options = { dexData.exchanges }
                    getOptionDisabled = {
                        (option) => option === dexData.detail
                    }
                    renderInput = {
                        (params) => ( 
                            <TextField {...params }
                            label = "Select Exchange to overlay"
                            variant = "outlined"
                            inputRef = { valueRef }
                            />
                        )
                    }
                    /> 
                    <Button className = { classes.searchButton }
                    onClick = { sendValue } > SELECT 
                    </Button> 
                </div> 
                <HistoryChart id = "reschart"
                data = { dexData }
                overlay = { dexoverlay }
                /> 
            </div> 
            <hr/>

            <div><PairChart data = { pairData }name = { dexData.detail }/> </div> 

            <hr/>

            <div className = { classes.margin } >
                <p className = "title-heading" > Search a trading pair </p> 
                <div className = "search-box" >
                    <input 
                        type = "text"
                        placeholder = "Search pair..."
                        onChange = {
                            (e) => { setSearchText(e.target.value) }
                        }
                    /> 
                </div>

                <div className = "box" >
                    <table>
                        <thead>
                        <tr className = "row" >
                        <th className = "pairs-id" > # </th> 
                        <th className = "pairs-name head" > Pair </th> 
                        <th className = "pairs-bidask head" > Bid - Ask Spread </th> 
                        <th className = "pairs-vol head" > Volume </th> 
                        <th className = "pairs-cvol head" > Converted Volume, USD </th> 
                        <th className = "pairs-rt head" > Recent transaction, USD </th>
                        <th className = "pairs-date head" > Date of Last trade </th> 
                        <th className = "pairs-time head" > Time of Last trade </th> 
                        </tr> 
                        </thead> 
                        <tbody> 
                        {
                            searchText != "" ?
                            (pairData.map((item, index) => {
                                if (typeof item.coin_id != 'undefined') {
                                    if (item.coin_id.toLowerCase().includes(searchText.toLowerCase())) {

                                        return ( 
                                            <DexPairs key = { index + 1 }
                                                id = { index + 1 }
                                                name = { item.coin_id + "<>" + item.target }
                                                bidask = { item.bid_ask_spread_percentage }
                                                volume = { item.volume }
                                                cVolume = { item.converted_volume.usd }
                                                rtx = { item.converted_last.usd }
                                                date = {
                                                    (item.last_traded_at.split('T'))[0]
                                                }
                                                time = {
                                                    (item.last_traded_at.split('T'))[1]
                                                }
                                            />
                                        );
                                    }
                                } else {
                                    return false;
                                }
                            })) :
                                (currentRows.map((item, index) => {

                                    return ( 
                                        <DexPairs
                                            key = {((currentPage * 10) - 10) + index + 1}
                                            id = {((currentPage * 10) - 10) + index + 1}
                                            name = { item.coin_id + "<>" + item.target }
                                            bidask = { item.bid_ask_spread_percentage }
                                            volume = { item.volume }
                                            cVolume = { item.converted_volume.usd }
                                            rtx = { item.converted_last.usd }
                                            date = {
                                                (item.last_traded_at.split('T'))[0]
                                            }
                                            time = {
                                                (item.last_traded_at.split('T'))[1]
                                            }
                                        />
                                    );
                                }))
                        } 
                        </tbody> 
                    </table> 
                </div>

            {
                searchText == "" &&
                    <Pagination
                        rowsPerPage = { rowsPerPage }
                        totalRows = { pairData.length }
                        currentPage = { currentPage }
                        setCurrentPage = { setCurrentPage }
                    />
            } </div> 
          <Footer />
          </>
        );
    };

    return renderData();
};


export default Exchange;