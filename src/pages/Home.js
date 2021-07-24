import React, { useState, useEffect } from "react";
import Dex from "../components/Dex/Dex";
import Pagination from '../components/UI/Pagination/Pagination';
import axios from "axios";
import Footer from '../components/UI/Footer/footer';

function Home() {
    const [dex, setDex] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(10);
    const [searchText, setSearchText] = useState("");
  
    useEffect(() => {
      axios.get("https://api.coingecko.com/api/v3/exchanges?per_page=250")
        .then((res) => {
          setDex(res.data);
        })
        .catch((error) => alert(error + " " + "Please try refreshing the page...!!!"))
    }, []);
  
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = dex.slice(indexOfFirstRow, indexOfLastRow);
  
  
    return (
      <>
  
  
        <h1>HarmonyScan</h1>
  
        <section>
          <p className="title-heading">Find out all there is to know about your Exchange</p>
          <div className="search-box">
            <input type="text" placeholder="Search exchange..." onChange={(e) => { setSearchText(e.target.value) }} />
          </div>
  
          <div className="box">
            <table>
              <thead>
                <tr className="row">
                  <th className="dex-id">#</th>
                  <th className="dex-name head">Name</th>
                  <th className="dex-img head">Logo</th>
                  <th className="dex-year head"> Year Established </th>
                  <th className="dex-24h head">Volume traded in BTC</th>
                </tr>
              </thead>
              <tbody >
                {
                  searchText != "" ?
                    (dex.map((item, index) => {
                      if (item.name.toLowerCase().includes(searchText.toLowerCase())) {
                        
                        return (
                          <Dex 
                            key={index + 1}
                            id={index + 1}
                            image={item.image}
                            name={item.id}
                            yearEstab={item.year_established}
                            perc24h={item.trade_volume_24h_btc}
                          />
                        );
                      }
                      else {
                        return false;
                      }
                    })
                    ) :
                    (currentRows.map((item, index) => {
                      
                      return (
                        <Dex
                          key={((currentPage * 10) - 10) + index + 1}
                          id={((currentPage * 10) - 10) + index + 1}
                          image={item.image}
                          name={item.id}
                          yearEstab={item.year_established}
                          perc24h={item.trade_volume_24h_btc}
                        />
                      );
                    })
                    )
                }
              </tbody>
            </table>
          </div>
  
          {
            searchText == "" &&
            <Pagination
              rowsPerPage={rowsPerPage}
              totalRows={dex.length}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          }
        </section>
  
   
        <Footer />
      </>
    );
  } 

export default Home;