import React from "react";
import { Button } from "@mui/material";

const Actionbutton = (props) => {
    const { children, onClick } = props;

    return <Button onClick={onClick}>{children}</Button>;
};

export default Actionbutton;
