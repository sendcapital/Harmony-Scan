import React, { useState } from "react";

const DexPairs = (props) => {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <>
      <tr className="row" >
        <td className="dex-id">{props.id}</td>
        <td className="dex-name">{capitalizeFirstLetter(props.name)}</td>
        <td className="dex-bidask">{props.bidask.toFixed(4)}%</td>
        <td className="dex-vol">{props.volume.toFixed(2)}</td>
        <td className="dex-cvol">{props.cVolume.toFixed(2)}</td>
        <td className="dex-rtx">{props.rtx.toFixed(2)}</td>
        <td className="dex-date">{props.date}</td>
        <td className="dex-time">{props.time}</td>
      </tr>
    </>
  );
};

export default DexPairs;