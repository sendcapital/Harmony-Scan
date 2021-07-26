import React from "react";
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";

const Dex = (props) => {

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  const history = useHistory();

  function redirect(props) {
    history.push({
      pathname: '/exchanges',
      state: {
        dex: `${props.name}`,
      }
    });
  }  

  return (
    <>
      <tr className="row" 
        onClick={() => redirect(props)}

      >
        <td className="dex-id">{props.id}</td>
        <td className="dex-name">{capitalizeFirstLetter(props.name)}</td>
        <td className="dex-img"><img srcSet={props.image} alt="dex-img" /></td>
        <td className="dex-marketcap">{props.yearEstab} </td>
        <td className='dex-24h green'>{props.perc24h.toFixed(2)}</td>
      </tr>
    </>
  );
};

export default withRouter(Dex);