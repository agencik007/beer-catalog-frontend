import { SyntheticEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBeer, getBeers } from "../features/beers/beerSlice";
import { toast } from "react-toastify";
import { AppDispatch, RootState } from "src/app/store";
import { Rating } from 'react-simple-star-rating'
import {BeerEntity} from "types"

import "./BeerItem.css";
const BeerImage = require("../assets/images/beer.png");

export const BeerItem = (beer: BeerEntity) => {
  const dispatch: AppDispatch = useDispatch();

  const { currentPage, limitPerPage } = useSelector(
    (state: RootState) => state.beers
  );

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(deleteBeer(beer._id as unknown as string)).then(() => dispatch(getBeers({
      page: currentPage,
      limit: limitPerPage,
    })));

    toast.success("Successfully deleted.");
  };

  const json: any = localStorage.getItem("user");
  const user = JSON.parse(json);

  return (
    <div className="card">
      <div className="left">
        {beer.avatar === "" ? (
          <img src={BeerImage} className="image" alt="beer" />
        ) : (
          <img src={beer.avatar} className="image" alt="beer" />
        )}
      </div>
      <div className="right">
        <div className="product-details">
          <h1>{beer.name}</h1>
          <h2>{beer.type}</h2>
          <p id="description">{beer.description}</p>
          <strong className="alcohol">Alcohol: {beer.alcohol}%</strong>
          <div className="rating">
            <Rating initialValue={beer.rating} readonly/>
          </div>
          <small className="date">
            Created: {new Date(beer.createdAt).toLocaleDateString("pl-PL")} by{" "}
            {beer.createdBy}
          </small>
          {!user ? null : (
            <>
              {beer.user === user._id || user.role === "admin" ? (
                <button className="close" onClick={onSubmit}>
                  Delete
                </button>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
