import { FormControl, FormHelperText, TextField } from '@material-ui/core';
import React from 'react';

const style = {
    maxWidth: '520px',
    width: '100%'
};

/**
 * 
 * @param {*} props 
 * @param {string} props.value
 * @returns 
 */
const Input = (props) => {

    const {
        value,
        label,
        type = "text",
        onInput = () => {},
        helperText = "",
        errors
    } = props;

    const getHelperText = () => {
        if (errors && errors.length) {
            return errors;
        }
        return helperText || " ";
    }

    return (
        <FormControl className="form-control" style={style}>
            <TextField
                type={type}
                label={label}
                value={value}
                variant='outlined'
                style={style}
                onInput={onInput}
            />
            <FormHelperText 
                component="div" 
                error={errors && errors.length > 0} 
                style={{paddingLeft: "8px", boxSizing: "border-box"}}
            >{getHelperText()}</FormHelperText>
        </FormControl>
    );
};

export default Input;