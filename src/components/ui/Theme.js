import { createTheme } from "@material-ui/core";

const mainGreenColor = "#5CDB95"
const darkGreenColor = "#379683"
const secondaryColor = "#05386B"
const lightMainGreenColor = "#8EE4AF"
const ternaryColor = "#EDF5E1"

export default createTheme ({
    palette: {
        common: {
            mainGreen: `${mainGreenColor}`,
            darkGreen: `${darkGreenColor}`,
            ternaryColor: `${ternaryColor}`,
            lightMainGreenColor: `${lightMainGreenColor}`
        },
        primary: {
            main: `${mainGreenColor}`,
        }, 
        secondary: {
            main: `${secondaryColor}`
        },
        text: {
            primary: `${secondaryColor}`
        }

    }
})