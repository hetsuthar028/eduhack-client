import PythonSVG from './Python.svg';
import FirstPrizeSVG from './firstPrize.svg'
import SecondPrizeSVG from './secondPrize.svg'
import ThirdPrizeSVG from './thirdPrize.svg'

export default function getIcon(iconName){

    switch(iconName.toLowerCase()){
        case "python": 
            return PythonSVG
        case "firstprizedesc":
            return FirstPrizeSVG
        case "secondprizedesc":
            return SecondPrizeSVG
        case "thirdprizedesc":
            return ThirdPrizeSVG
        // case "html": 
        //     return Python
        // case "javascript": 
        //     return Python
        // case "js": 
        //     return Python
        // case "django": 
        //     return Python
        // case "react": 
        //     return Python
        // case "react native": 
        //     return Python
        // case "flutter": 
        //     return Python
        // case "kotlin": 
        //     return Python
        // case "firebase": 
        //     return Python
        // case "mysql": 
        //     return Python
        // case "mongodb": 
        //     return Python
        // case "java": 
        //     return Python
        // case "php": 
        //     return Python
        // case "ml": 
        //     return Python
        // case "ai": 
        //     return Python
        // case "dl": 
        //     return Python
        // case ".net": 
        //     return Python
        // case "tensorflow": 
        //     return Python
        // case "aws": 
        //     return Python
        default:
            return 
        
    }
}