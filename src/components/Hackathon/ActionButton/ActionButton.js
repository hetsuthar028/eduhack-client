import React from "react";
import { Button } from "@mui/material";

const Actionbutton = (props) => {
    const { color, children, onClick } = props;

    return <Button onClick={onClick}>{children}</Button>;
};

export default Actionbutton;
