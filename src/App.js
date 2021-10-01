import React from "react";
import "./App.scss";
import AuthRouter from "./components/routes/AuthRouter";
import DashRouter from "./components/routes/DashRouter";
import AppRouter from "./components/routes/AppRouter";
import theme from "../src/components/ui/Theme";
import { ThemeProvider, Typography, CssBaseline } from "@material-ui/core";

function App() {
    return (
      <div>
                    {/* <AuthRouter />
                <DashRouter /> */}
                <CssBaseline />
                    <AppRouter />
                </div>
        //     </Typography>
        // </ThemeProvider>
    );
}

export default App;
