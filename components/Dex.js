import React, { useState, useEffect } from "react";
import Router from 'next/router';

const Dex = (props) => {
  const [selected, isSelected] = useState(false);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const selectDex = () => {
    isSelected(true);
  }

  useEffect(() => {
    if (selected) {
      const {pathname} = Router
      if(pathname == '/' ){
          // Router.push('/exchange')
          Router.push({
          pathname: '/exchange',
          query: { id: props.name},
        })
      }
    }
 }, [selected]);

  return (
    <>
      <tr className="row" onClick={selectDex}>
        <td className="dex-id">{props.id}</td>
        <td className="dex-name">{capitalizeFirstLetter(props.name)}</td>
        <td className="dex-img"><img srcSet={props.image} alt="dex-img" /></td>
        <td className="dex-marketcap">{props.yearEstab} </td>
        <td className='dex-24h green'>{props.perc24h.toFixed(2)}</td>
      </tr>
    </>
  );
};

export default Dex;