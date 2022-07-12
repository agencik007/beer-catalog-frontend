import React from 'react';
import StarsRating from 'react-star-rate';

import BeerImage from '../assets/images/beer.png';
import './BeerItem.css';



// @ts-ignore
export const BeerItem = ({beer}) =>  {

    // const json: any = localStorage.getItem('user');
    // const userId = JSON.parse(json);

    return (
        <div className="card">
            <div className="left">
                {beer.avatar === '' ? (
                        <img src={BeerImage} className="image" alt="beer"/>
                    ) : (
                        <img src={beer.avatar} className="image" alt="beer"/>
                    )}
            </div>
            <div className="right">
                <div className="product-details">
                    <h1>{beer.name}</h1>
                    <h2>{beer.type}</h2>
                    <p id="description">{beer.description}</p>
                    <strong className="alcohol">Alcohol: {beer.alcohol}%</strong>
                    <div className="rating">
                        <StarsRating
                            value={beer.rating}
                            disabled={true}
                        />
                    </div>
                    <small className="date">Created: {new Date(beer.createdAt).toLocaleDateString('pl-PL')} by {beer.createdBy}</small>
                    {/*{!userId ? null : (*/}
                    {/*    <>*/}
                    {/*        {beer.user === userId._id ? (*/}
                    {/*            <button className="btn btn-block">Edit beer</button>*/}
                    {/*        ) : null}*/}
                    {/*    </>*/}
                    {/*)}*/}
                </div>
            </div>
        </div>
    )
}