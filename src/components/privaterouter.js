import React from 'react';
import {Outlet, Navigate} from 'react-router-dom';
import {UseAuth} from './usercontext';
export function PrivateRouter(){
    const {currentUser, loading } = UseAuth();
    return(
        loading ? (
            'Loading....'
        ) : (

            currentUser ? (
            <Outlet /> 
            ) : (
                <Navigate to="/login" />
            )
        )
    );
}