import React, { useState } from 'react';
import { Container, Typography, Button, Box, Card, CardContent, Divider, Grid } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const PlaceOrder = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { cart } = location.state || {}; 

    const [orderPlaced, setOrderPlaced] = useState(false);

    const handlePayment = (paymentMethod) => {
        console.log(`Payment method selected: ${paymentMethod}`);
        setOrderPlaced(true);
    };

    const handleReturnHome = () => {
        navigate('/');
    };

    const calculateTotal = () => {
        return cart?.reduce((acc, item) => acc + item.sellingPrice * item.quantity, 0)?.toFixed(2);
    };

    return (
        <Container maxWidth="lg" sx={{ marginTop: '2rem' }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '2rem' }}>
                Place Your Order
            </Typography>

            {orderPlaced ? (
                <Box textAlign="center" mt={4}>
                    <CheckCircleIcon color="success" style={{ fontSize: '4rem' }} />
                    <Typography variant="h6" color="green" sx={{ fontWeight: 'bold', marginTop: '1rem' }}>
                        Order placed successfully!
                    </Typography>
                    <Button variant="contained" color="primary" onClick={handleReturnHome} sx={{ mt: 2 }}>
                        Return to Home
                    </Button>
                </Box>
            ) : (
                <>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: '500', marginBottom: '1rem' }}>
                        Order Summary
                    </Typography>

                    <Grid container spacing={4}>
                        {cart && cart.length > 0 ? (
                            cart.map((item) => (
                                <Grid item xs={12} sm={6} md={4} key={item.id}>
                                    <Card variant="outlined" sx={{ boxShadow: 3 }}>
                                        <CardContent>
                                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                                {item.name}
                                            </Typography>
                                            <Typography variant="body1" color="textSecondary">
                                                Quantity: {item.quantity}
                                            </Typography>
                                            <Typography variant="body1" color="textSecondary">
                                                Price: ₹{item.sellingPrice?.toFixed(2)}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))
                        ) : (
                            <Typography variant="body1">No items in cart.</Typography>
                        )}
                    </Grid>

                    <Divider sx={{ marginY: 4 }} />

                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            Total: ₹{calculateTotal()}
                        </Typography>
                    </Box>

                    <Box mt={4}>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: '500', marginBottom: '1rem' }}>
                            Payment Options
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AttachMoneyIcon />}
                            onClick={() => handlePayment('Cash')}
                            sx={{ marginRight: '1rem', padding: '0.8rem 1.5rem', fontWeight: 'bold' }}
                        >
                            Pay with Cash
                        </Button>
                        {/* Add more payment options if needed */}
                    </Box>
                </>
            )}
        </Container>
    );
};

export default PlaceOrder;
