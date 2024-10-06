import React from 'react';
import { TextField } from '@mui/material';

const InputField = ({ label, type, value, onChange, name, placeholder }) => (
    <TextField
        fullWidth
        variant="outlined"
        label={label}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        margin="normal"
    />
);

export default InputField;
