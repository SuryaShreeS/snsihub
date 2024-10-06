// src/pages/ProductList.js
import React, { useEffect, useState } from 'react';
import { Grid, Container, Typography, TextField, Button } from '@mui/material';
import ProductCard from '../components/reusable/ProductCard';
import productData from '../data/products.json';
import { useNavigate } from 'react-router-dom';

const ProductList = ({ cart, setCart }) => {
    const navigate = useNavigate();
    const [products] = useState(productData); // Removed filteredProducts state for simplicity
    const [searchKeyword, setSearchKeyword] = useState('');
    const [viewMode, setViewMode] = useState('grid');

    const onAddToCart = (product) => {
        const existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) {
            setCart(cart.map(item => 
                item.id === product.id 
                ? { ...item, quantity: item.quantity + 1 } 
                : item
            ));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
        navigate('/cart'); // Redirect to Cart page
    };

    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        product.description.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    return (
        <Container maxWidth="lg"  sx={{ marginTop: '2rem' }}>
            <Typography variant="h4" gutterBottom>
                Products
            </Typography>
            <TextField
                variant="outlined"
                fullWidth
                placeholder="Search products..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                margin="normal"
            />
            <div style={{display:'flex',margin:'2rem',gap:'1rem'}}><Button variant={viewMode === 'grid' ? 'contained' : 'outlined'} onClick={() => setViewMode('grid')}>
                Grid View
            </Button>
            <Button variant={viewMode === 'list' ? 'contained' : 'outlined'} onClick={() => setViewMode('list')}>
                List View
            </Button></div>
           
            <Grid container spacing={4}>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <Grid item xs={12} sm={6} md={viewMode === 'grid' ? 4 : 12} key={product.id}>
                            <ProductCard product={product} onAddToCart={onAddToCart} />
                        </Grid>
                    ))
                ) : (
                    <Typography variant="h6" color="textSecondary">
                        No products found
                    </Typography>
                )}
            </Grid>
        </Container>
    );
};

export default ProductList;
