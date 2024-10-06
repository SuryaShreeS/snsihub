// src/components/reusable/ProductCard.js

import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
    transition: 'transform 0.2s',
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: theme.shadows[10], // Increase shadow on hover
    },
    border: '1px solid #e0e0e0', // Optional: add a subtle border
}));

const ProductCard = ({ product, onAddToCart }) => {
    return (
        <StyledCard>
            <CardMedia
                component="img"
                alt={product.name}
                height="300" // Set the height for medium size (adjust as needed)
                image={product.image}
                sx={{ objectFit: 'contain' }} // Maintain aspect ratio
            />
            <CardContent>
                <Typography variant="h5" fontWeight="bold">{product.name}</Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                    {product.description}
                </Typography>
                <Typography variant="body1" fontWeight="bold" color="text.primary">
                    Original Price: <span style={{ textDecoration: 'line-through' }}>${product.originalPrice}</span>
                </Typography>
                <Typography variant="h6" color="primary">
                    Discount Price: ${product.discountPrice}
                </Typography>
                <Typography variant="body1" fontWeight="bold">Selling Price: ${product.sellingPrice}</Typography>
                <Typography variant="body2">Quantity: {product.quantity}</Typography>
                <Typography variant="body2">UOM: {product.uom}</Typography>
                <Typography variant="body2">HSN Code: {product.hsnCode}</Typography>
                <Button 
                    onClick={() => onAddToCart(product)} 
                    variant="contained" 
                    color="primary" 
                    style={{ marginTop: '16px' }} // Space between content and button
                >
                    Add to Cart
                </Button>
            </CardContent>
        </StyledCard>
    );
};

export default ProductCard;
