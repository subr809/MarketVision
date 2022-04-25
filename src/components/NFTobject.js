import React from 'react';
import "semantic-ui-react";
import { List } from 'semantic-ui-react';

const NFTobject = ({title, price, desc, image}) => {
    return(
        <List.Item style={{ padding:30 }}>
            <h1>{title}</h1>
            <p>{Math.round(price*100)/100} ETH</p>
            <p>{desc}</p>
            <img src={image} alt="" width="200" height="200"/>
        </List.Item>
    )
}

export default NFTobject;

