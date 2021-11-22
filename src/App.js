import React from "react";
import "./App.scss";
import AppRouter from "./components/routes/AppRouter";
import { CssBaseline } from "@material-ui/core";
import { AppProvider } from "./AppContext";

function App() {
    return (
        <AppProvider>
            <div>
                <CssBaseline />
                <AppRouter />
            </div>
        </AppProvider>
    );
}

export default App;
