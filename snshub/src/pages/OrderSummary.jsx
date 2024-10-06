import React from 'react';
import { Container, Typography, List, ListItem, ListItemText, Card, Divider } from '@mui/material';

const OrderSummary = ({ order }) => {
    
    // Dynamically calculate total if it's not provided
    const calculateTotal = () => {
        return order?.items?.reduce((acc, item) => acc + item.sellingPrice, 0)?.toFixed(2);
    };

    return (
        <Container maxWidth="sm" sx={{ marginTop: '2rem' }}>
            <Card variant="outlined" sx={{ padding: '1.5rem', boxShadow: 3 }}>
                <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', marginBottom: '1rem' }}>
                    Order Summary
                </Typography>
                
                <List>
                    {order.items.map((item) => (
                        <ListItem key={item.id} sx={{ paddingLeft: 0, paddingRight: 0 }}>
                            <ListItemText 
                                primary={item.name} 
                                primaryTypographyProps={{ fontSize: '1.2rem', fontWeight: '500' }}
                                secondary={`₹${item.sellingPrice}`} 
                            />
                        </ListItem>
                    ))}
                </List>
                
                <Divider sx={{ marginY: 2 }} />
                
                <Typography variant="h6" align="right" sx={{ fontWeight: 'bold' }}>
                    Total: <span style={{ fontSize: '1.5rem', fontWeight: '700' }}>₹{order.total || calculateTotal()}</span>
                </Typography>
                
                <Typography variant="body1" align="right" sx={{ marginTop: '1rem', fontStyle: 'italic' }}>
                    Payment Method: Cash
                </Typography>
            </Card>
        </Container>
    );
};

export default OrderSummary;
