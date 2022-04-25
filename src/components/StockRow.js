import React, { Component } from 'react';
//import { iex } from '../config/iex.js'
const StockRow = ({ticker, sector, country, employees, marketcap, epsNext5Yr, epsPrev5Yr, epsThisYr, roe, roi, roa, eps, fcf, pe, pb, divyield, debtequity}) => {
    return (
        <tr>
            <td font-size= "9px">{ticker}</td> 
            <td font-size= "9px">{sector}</td> 
            <td font-size= "9px">{country}</td>
            <td font-size= "9px">{employees}</td>
            <td font-size= "9px">{marketcap}</td>
            <td font-size= "9px">{epsNext5Yr}</td>
            <td font-size= "9px">{epsPrev5Yr}</td>
            <td font-size= "9px">{epsThisYr}</td>
            <td font-size= "9px">{roe}</td>
            <td font-size= "9px">{roi}</td>
            <td font-size= "9px">{roa}</td>
            <td font-size= "9px">{eps}</td>
            <td font-size= "9px">{fcf}</td>
            <td font-size= "9px">{pe}</td>
            <td font-size= "9px">{pb}</td>
            <td font-size= "9px">{divyield}</td>
            <td font-size= "9px">{debtequity}</td>
        </tr>
    )
}

export default StockRow;