import React from 'react';
import { Button } from '@mui/material';

const CustomButton = ({ label, onClick, type, color }) => (
    <Button
        variant="contained"
        color={color || "primary"}
        onClick={onClick}
        type={type || "button"}
        sx={{ marginTop: 2 }}
    >
        {label}
    </Button>
);

export default CustomButton;
