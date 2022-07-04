import React from "react";
import {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

export function Main() {
    const navigate = useNavigate();

    const {user} = useSelector((state: any) => state.auth)

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate])
    return (
        <div>Main</div>
    )
}