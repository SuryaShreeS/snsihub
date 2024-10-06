import React from 'react';
import { AppBar, Toolbar, Typography, Badge, Button, Box, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/AuthSlice';

const Navbar = ({ cartCount }) => {
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#2E3B55' }}>
            <Toolbar>
                {/* Left Section - Branding */}
                <Typography
                    variant="h6"
                    component={Link}
                    to="/"
                    sx={{
                        flexGrow: 1,
                        textDecoration: 'none',
                        color: 'inherit',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    E-Commerce
                </Typography>

                {/* Center Section - Menu Links */}
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                    {isLoggedIn ? (
                        <>
                            <Button
                                color="inherit"
                                component={Link}
                                to="/order-summary"
                                sx={{ margin: '0 10px', textTransform: 'capitalize' }}
                            >
                                My Orders
                            </Button>
                            <Button
                                color="inherit"
                                onClick={handleLogout}
                                sx={{ margin: '0 10px', textTransform: 'capitalize' }}
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                color="inherit"
                                component={Link}
                                to="/login"
                                sx={{ margin: '0 10px', textTransform: 'capitalize' }}
                            >
                                Login
                            </Button>
                            <Button
                                color="inherit"
                                component={Link}
                                to="/signup"
                                sx={{ margin: '0 10px', textTransform: 'capitalize' }}
                            >
                                Signup
                            </Button>
                        </>
                    )}
                </Box>

                {/* Right Section - Cart Icon */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h6" sx={{ marginRight: '20px', fontWeight: 'bold' }}>
                        Product Store
                    </Typography>
                    <IconButton component={Link} to="/cart" color="inherit">
                        <Badge badgeContent={cartCount} color="error">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
