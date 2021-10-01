import { Container, makeStyles, Box } from "@material-ui/core";
import { border, borderRadius, height } from "@mui/system";
import React, { useEffect, useRef } from "react";
import theme from "../ui/Theme";
import TypeIt from "typeit-react";
import Typed from "typed.js";

const RCarousel = () => {
    const el = React.useRef(null);
    const typed = React.useRef(null);

    useEffect(() => {
        const options = {
            strings: [
                "Some <i>strings</i> are slanted",
                "Some <strong>strings</strong> are bold",
                "HTML characters &times; &copy;",
            ],
            typeSpeed: 50,
            backSpeed: 50,
            loop: true,
        };

        // elRef refers to the <span> rendered below
        typed.current = new Typed(el.current, options);

        return () => {
            // Make sure to destroy Typed instance during cleanup
            // to prevent memory leaks
            typed.current.destroy();
        };
    }, []);

    const useStyles = makeStyles({
        carousel: {
            backgroundColor: theme.palette.common.ternaryColor,
            height: "450px",
            margin: "0 0",
            width: "100%",
            color: "#fff",
            // position: "absolute",
        },
        typedBox: {
            backgroundColor: "#fff",
            // margin: "0",
            // padding: "0",
            color: "#000",
            top: "100px",
            right: "100px",
            position: "absolute",
            zIndex: "10",
            padding: "10px",
            width: "40%",
            height: "90%",
            border: "2px solid #8EE4AF",
            borderRadius: "5px 5px 5px 75px",
            wordWrap: "break-word"
        },
        container: {
            width: "100%",
            position: "relative",
        },
        typedText: {
            margin: "auto",
            height: "100%",
        },
    });

    let classes = useStyles();

    return (

        
        <div className={classes.container}>
            <div className={classes.carousel}>
                <Box className={classes.typedBox}>
                    <center>
                        <h3
                            style={{ padding: "0", margin: "0" }}
                            className={classes.typedText}
                        >
                            <span style={{ whiteSpace: "pre" }} ref={el} />
                        </h3>
                    </center>
                </Box>
            </div>
        </div>
        
    );
};

export default RCarousel;
