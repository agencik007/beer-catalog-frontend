import {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {Spinner} from "../components/Spinner";
import {userBeers, reset} from "../features/beers/beerSlice";
import {BeerItem} from "../components/BeerItem";
import { AppDispatch, RootState } from "src/app/store";
import { BeerEntity } from "types";

export function UserBeers() {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();

    const {user} = useSelector((state: RootState) => state.auth);

    const {beers, isLoading, isError, message} = useSelector((state: RootState) => state.beers);

    useEffect(() => {
        if (isError) {
            console.log(message);
        }

        if (!user) {
            navigate('/');
        }

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
            <h1 className="welcome">Welcome {user?.name}</h1>

            <p>Your beers</p>

            <section className="content">
                {beers?.length > 0 ? (
                    <div className="beers">
                        {beers?.map((beer: BeerEntity) => (
                            <BeerItem key={beer._id + ''} beer={beer} />
                        ))}
                    </div>
                ) : (
                    <h3>You have not set any beers</h3>
                )}
            </section>
        </section>
    </>
}