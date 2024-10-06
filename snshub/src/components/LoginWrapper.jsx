import React from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../pages/LoginPage';
import { loginUser, signupUser } from '../backend/services/api';


const LoginWrapper = (onLogin) => {
    const navigate = useNavigate()
 

    const handleLogin = async (email,password) => {
        console.log(email,password,'/?/')
       
    };

    return <Login onLogin={handleLogin} />;
};

export default LoginWrapper;
