import React from 'react';
import StarsRating from 'react-star-rate';

import BeerImage from '../assets/images/beer.png';
import './BeerItem.css';

// @ts-ignore
export const BeerItem = ({beer}) =>  {

    return (
        // <div className="beer-container">
        //     <div className="image">
        //         {beer.avatar === '' ? (
        //             <img src="./images/beer.png" className="image" alt="beer"/>
        //         ) : (
        //             <img src={beer.avatar} className="image" alt="beer"/>
        //         )}
        //     </div>
        //     <div className="beer">
        //         <strong className='title'>{beer.name} </strong>
        //         <small>{beer.type}</small>
        //         <h1>{beer.rating}</h1>
        //         <small>{beer.description}</small>
        //         <p>Alcohol {beer.alcohol} %</p>
        //         <small className="date">Created: {new Date(beer.createdAt).toLocaleDateString('pl-PL')}</small>
        //     </div>
        // </div>
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
                </div>
            </div>
        </div>
    )
}