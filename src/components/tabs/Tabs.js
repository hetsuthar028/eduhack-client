import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Articlecard from "../article-card/ArticleCard";
import { Grid } from "@mui/material";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                >
                    <Tab label="All" {...a11yProps(0)} />
                    <Tab label="Python" {...a11yProps(1)} />
                    <Tab label="JavaScript" {...a11yProps(2)} />
                    <Tab label="Algorithms" {...a11yProps(3)} />
                    <Tab label="Data Structures" {...a11yProps(4)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Grid container sm={12} xs={12} md={12} spacing={{ xs: 2, md: 2 }}>
                    <Grid item xs={12} sm={6} md={2.4}>
                        <Articlecard />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2.4}>
                        <Articlecard />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2.4}>
                        <Articlecard />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2.4}>
                        <Articlecard />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2.4}>
                        <Articlecard />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2.4}>
                        <Articlecard />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2.4}>
                        <Articlecard />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2.4}>
                        <Articlecard />
                    </Grid>

                    {/*<Articlecard />
            <Articlecard />
            <Articlecard />
            <Articlecard /> */}
                </Grid>
                {/* <Articlecard />
        <Articlecard /> */}
            </TabPanel>
            <TabPanel value={value} index={1}>
                Python
            </TabPanel>
            <TabPanel value={value} index={2}>
                JavaScript
            </TabPanel>
            <TabPanel value={value} index={3}>
                Algorithms
            </TabPanel>
            <TabPanel value={value} index={4}>
                Data Structures
            </TabPanel>
        </Box>
    );
}
