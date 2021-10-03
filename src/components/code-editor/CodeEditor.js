import React, { useState } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/python/python";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/clike/clike";

import { Controlled as ControlledEditor } from "react-codemirror2";
import {
    Box,
    Grid,
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography,
    Button
} from "@mui/material";
import { makeStyles } from "@material-ui/core";
import "./CodeEditor.css"
import theme from '../ui/Theme'

const useStyles = makeStyles((theme) => ({
    codeEditorHeader: {
        // padding: "10px",
        padding: "15px 40px",
        // margin: "20px"
        marginBottom: "10px",
        backgroundColor: `${theme.palette.common.lightMainGreenColor}`
    },
}));

const Codeeditor = (props) => {
    // let {
    //     onChange
    // } = props;

    const classes = useStyles();

    const [codeEditorLanguage, setCodeEditorLanguage] = useState("JavaScript");
    const [title, setTitle] = useState('JavaScript')
    const [code, setCode] = useState("");

    const handleChangeLanguage = (e) => {
        
        setCodeEditorLanguage(e.target.value);

        switch(e.target.value){
            case "text/x-csrc": 
                setTitle("C")
                break;
            
            case "text/x-java": 
                setTitle("Java")
                break;
            
            case "text/x-c++src": 
                setTitle("C++")
                break;
            
            case "Python": 
                setTitle("Python")
                break;
            
            case "JavaScript": 
                setTitle("JavaScript")
                break;
        }
        
    };

    const handleChange = (editor, data, value) => {
        console.log(data);
        setCode(value);
        // onChange(value)
    };

    return (
        <div className="editor-container">
            <Grid container xs={12} sm={12} md={12}>
                <Grid item xs={12} sm={12} md={12} >
                    {/* 
                        <div className={classes.codeEditorHeader}>
                        {displayName}  editor
                        </div> 
                    */}

                    <Paper
                        variant="outlined"
                        elevation={3}
                        className={classes.codeEditorHeader}
                    >
                        <Grid container xs={12} sm={12} md={12}>
                            <Grid
                                item
                                direction="column"
                                style={{ placeSelf: "center" }}
                            >
                                <Typography
                                    variant="h5"
                                    style={{ margin: "auto" }}
                                >
                                    {title} Editor
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                direction="column"
                                style={{
                                    marginLeft: "auto",
                                    placeSelf: "center",
                                }}
                            >
                                <FormControl style={{ width: "250px" }}>
                                    <InputLabel id="demo-simple-select-label">
                                        Language
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={codeEditorLanguage}
                                        label="language"
                                        onChange={handleChangeLanguage}
                                    >
                                        <MenuItem value="JavaScript" name="JavaScript">
                                            JavaScript
                                        </MenuItem>
                                        <MenuItem value="Python" name="Python">
                                            Python
                                        </MenuItem>
                                        <MenuItem value="text/x-csrc" name="C">C</MenuItem>
                                        <MenuItem value="text/x-c++src" name="C++">C++</MenuItem>
                                        <MenuItem value="text/x-java" name="Java">Java</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Paper>

                    <ControlledEditor
                        onBeforeChange={handleChange}
                        value={code}
                        className="code-mirror-wrapper"
                        options={{
                            lineWrapping: true,
                            lint: true,
                            mode: codeEditorLanguage.toLowerCase(),
                            theme: "material",
                            lineNumbers: true,
                        }}
                    />

                <center>
                    <Button variant="contained" style={{margin: "20px 0"}} size="large">Execute Code</Button>
                </center>
                </Grid>

                {/* Add Submit Buttons here */}
                

            </Grid>
        </div>
    );
};

export default Codeeditor;
