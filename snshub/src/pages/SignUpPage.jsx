// src/pages/Signup.js
import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import InputField from '../components/reusable/InputField';
import CustomButton from '../components/reusable/CustomButton';
import { signupUser } from '../backend/services/api'; // Import the signup function
import { useNavigate } from 'react-router-dom';

const Signup = ({ onSignup }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); // State for error handling
    const navigate=useNavigate()
    useEffect(()=>{
        setError('')

    },[])

    const handleSignup = async () => {
        try {
            const userData = { username:name, email, password,role:'user' };
            const response = await signupUser(userData); // Call the API service
            console.log('Signup successful:', response);
            onSignup(response); // Call the parent function with the response
            navigate('/login')

        } catch (error) {
            navigate('/login')
           // setError('Signup failed. Please try again.'); // Set error message
        }
    };

    return (
        <Container maxWidth="sm"  sx={{ marginTop: '2rem' }}>
            <Typography variant="h4" sx={{ marginBottom: 4 }}>
                Signup
            </Typography>
            {error && <Typography color="error">{error}</Typography>} {/* Display error message */}
            <InputField label="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <InputField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <InputField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <CustomButton label="Signup" onClick={handleSignup} color="primary" />
        </Container>
    );
};

export default Signup;
