// src/pages/Cart.js
import React from 'react';
import { Container, Typography, Button, Grid, Card, CardContent, IconButton, TextField, Box, CardMedia } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cart, setCart }) => {
    const navigate = useNavigate();

    const handlePlaceOrder = () => {
        navigate('/place-order', { state: { cart } });
    };

    const handleQuantityChange = (id, newQuantity) => {
        if (newQuantity < 1) return;
        setCart(cart.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
    };

    const handleRemoveItem = (id) => {
        setCart(cart.filter(item => item.id !== id));
    };

    const calculateTotal = () => {
        return cart.reduce((acc, item) => acc + item.sellingPrice * item.quantity, 0)?.toFixed(2);
    };

    return (
        <Container maxWidth="lg" sx={{ marginTop: '2rem', padding: '1rem' }}>
            <Typography variant="h4" gutterBottom align="center">
                Your Cart
            </Typography>
            <Grid container spacing={4}>
                {cart.length > 0 ? (
                    cart.map((item) => (
                        <Grid item xs={12} sm={6} md={4} key={item.id}>
                            <Card variant="outlined" sx={{ boxShadow: 3, borderRadius: 2 }}>
                                {/* Product Image */}
                                <CardMedia
                                    component="img"
                                    image={item.image || 'https://via.placeholder.com/150'} // Fallback if no imageUrl is available
                                    alt={item.name}
                                    height="180"
                                    sx={{ objectFit: 'contain' }} // Keeps aspect ratio of the image
                                />
                                <CardContent>
                                    <Typography variant="h6">{item.name}</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Price: ${item?.sellingPrice?.toFixed(2)}
                                    </Typography>
                                    <Box display="flex" alignItems="center" marginTop={2}>
                                        <TextField
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                                            inputProps={{ min: 1 }}
                                            size="small"
                                            sx={{ width: '60px', marginRight: 2 }}
                                        />
                                        <IconButton color="secondary" onClick={() => handleRemoveItem(item.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Grid item xs={12}>
                        <Box display="flex" flexDirection="column" alignItems="center" marginTop={4}>
                            <Typography variant="h6" color="textSecondary" gutterBottom>
                                Your cart is empty
                            </Typography>
                            <Typography variant="body1" color="textSecondary">
                                It looks like you haven't added anything to your cart yet.
                            </Typography>
                            <Button variant="outlined" color="primary" sx={{ marginTop: 2 }} onClick={() => navigate('/')}>
                                Start Shopping
                            </Button>
                        </Box>
                    </Grid>
                )}
            </Grid>
            {cart.length > 0 && (
                <Box mt={4} textAlign="right">
                    <Typography variant="h6">Total: ${calculateTotal()}</Typography>
                    <Button variant="contained" color="primary" onClick={handlePlaceOrder} sx={{ mt: 2 }}>
                        Place Order
                    </Button>
                </Box>
            )}
        </Container>
    );
};

export default Cart;
