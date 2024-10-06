import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import InputField from '../components/reusable/InputField';
import CustomButton from '../components/reusable/CustomButton';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../backend/services/api';


const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            // Call the loginUser API
            const data = await loginUser(email, password);
            console.log('Login successful:', data);

            // Store the token or user data locally if needed
            localStorage.setItem('token', data.token);
            localStorage.setItem('role',data.user.role)
            if(data.user.role ==='admin')
            {
                navigate('/admin')
            }
            else {
                navigate('/');
            }
            // Navigate to the dashboard or home after successful login
           
        } catch (error) {
            // Handle login error
            //setError(error.message);
        }
    };

    return (
        <Container maxWidth="sm"  sx={{ marginTop: '2rem' }}>
            <Typography variant="h4" sx={{ marginBottom: 4 }}>
                Login
            </Typography>
            <InputField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <InputField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <CustomButton label="Login" onClick={handleLogin} color="primary" />
        </Container>
    );
};

export default Login;
