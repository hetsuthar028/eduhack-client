import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
} from "@mui/material";
import Actionbutton from "../ActionButton/ActionButton";
import CloseIcon from "@mui/icons-material/Close";
import theme from "../../ui/Theme";

const Popup = (props) => {
    const { title, children, openPopup, setOpenPopup } = props;

    return (
        <Dialog open={openPopup} maxWidth="md">
            <DialogTitle>
                <div style={{ display: "flex" }}>
                    <Typography
                        variant="h6"
                        component="div"
                        style={{
                            flexGrow: 1,
                            color: theme.palette.primary.dark,
                        }}
                    >
                        {title}
                    </Typography>

                    <Actionbutton onClick={() => setOpenPopup(false)}>
                        <CloseIcon />
                    </Actionbutton>
                </div>
            </DialogTitle>
            <DialogContent dividers>{children}</DialogContent>
        </Dialog>
    );
};

export default Popup;
