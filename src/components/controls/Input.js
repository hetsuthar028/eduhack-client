import React from "react";
import { TextField } from "@mui/material";

const Input = (props) => {
    const { name, label, value, onChange, type } = props;

    return (
        <TextField
            variant="outlined"
            label={label}
            name={name}
            // type="email"
            type={type}
            value={value}
            onChange={onChange}
            placeholder={label}
        />
    );
};

export default Input;
