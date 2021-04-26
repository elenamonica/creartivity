import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';

function SigninScreen(props){

    const dispatch = useDispatch();

    useEffect (() => {
        
        return () => {
            //
        };
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
    }

    return <div className="form">
        <form onSubmit = {submitHandler}>
            <ul className = "form-container">
                <li>
                    <label for="email">
                        Email
                    </label>
                    <input type = "email" name = "email" id = "email" onChange ={(e) => setEmail(e.target.value)}/>
                </li>
                <li>
                    <label for="password">
                        <input type = "password" id = "password" name = "password" onChange = {(e) => setPassword(e.target.value)}/>
                    </label>
                </li>
                <li>
                    <button type = "submit" className = "button primary">
                        Sign In
                    </button>
                </li>
                <li>
                    New to CreARTivity? 
                </li>
                <li>
                    <Link to = "/register" class = "button full-width">Create a free account.</Link>
                </li>
            </ul>
        </form>
    </div>
}
export default SigninScreen;