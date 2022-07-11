import React from "react";
import {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {Spinner} from "../components/Spinner";
import {userBeers, reset} from "../features/beers/beerSlice";
import {BeerItem} from "../components/BeerItem";

export function UserBeers() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {user} = useSelector((state: any) => state.auth);

    const {beers, isLoading, isError, message} = useSelector((state: any) => state.beers);

    useEffect(() => {
        if (isError) {
            console.log(message);
        }

        if (!user) {
            navigate('/');
        }

        // @ts-ignore
        dispatch(userBeers());

        return () => {
            dispatch(reset());
        }

    }, [user, navigate, isError, message, dispatch])

    if (isLoading) {
        return <Spinner />
    }


    return <>
        <section className="heading">
            <h1>Welcome {user.name}</h1>

            <p>Your beers</p>

            <section className="content">
                {beers.length > 0 ? (
                    <div className="beers">
                        {beers.map((beer: any) => (
                            <BeerItem key={beer._id} beer={beer} />
                        ))}
                    </div>
                ) : (
                    <h3>You have not set any beers</h3>
                )}
            </section>
        </section>
    </>
}