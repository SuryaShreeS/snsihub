import React from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import CustomButton from '../components/reusable/CustomButton';

const Checkout = ({ cart, onPlaceOrder }) => {
    const total = cart.reduce((sum, item) => sum + item.sellingPrice, 0);

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" sx={{ marginBottom: 4 }}>
                Checkout
            </Typography>
            <List>
                {cart.map((item) => (
                    <ListItem key={item.id}>
                        <ListItemText primary={item.name} secondary={`₹${item.sellingPrice}`} />
                    </ListItem>
                ))}
            </List>
            <Typography variant="h6" sx={{ marginTop: 4 }}>
                Total: ₹{total}
            </Typography>
            <CustomButton label="Place Order" onClick={onPlaceOrder} color="primary" />
        </Container>
    );
};

export default Checkout;
