import PythonSVG from './Python.svg';
import FirstPrizeSVG from './firstPrize.svg';
import SecondPrizeSVG from './secondPrize.svg';
import ThirdPrizeSVG from './thirdPrize.svg';
import CircleIcon from '@mui/icons-material/Circle';
import FailedSvg from './Failed.svg';
import SuccessSvg from './Success.svg';
import FlutterSvg from './Flutter.svg';
import FirebaseSvg from './Firebase.svg';
import JavaSvg from './Java.svg';
import RestAPISvg from './RestAPI.svg';
import XMLSvg from './XML.svg';
import JavaScriptSvg from './JS.svg';
import KotlinSvg from './Kotlin.svg'
import ReactSvg from './React.svg';
import HTMLSvg from './HTML.svg';
import CSSSvg from './CSS.svg';
import NodeJSSvg from './NodeJS.svg';
import DotNetSvg from './DotNet.svg';
import FlaskSvg from './Flask.svg';
import AngularSvg from './Angular.svg';
import DjangoSvg from './Django.svg';
import TechnologySvg from './Technology.svg';
import MachineLearningSvg from './MachineLearning.svg';
import AISvg from './AI.svg';
import AWSSvg from './AWS.svg';
import TensorflowSvg from './Tensorflow.svg';
import MySQLSvg from './MySQL.svg';
import MongoDBSvg from './MongoDB.svg';
import CompanyLogo from './Eduhack3.svg';
import FacebookSvg from './Facebook.svg';
import InstagramSvg from './Instagram.svg';
import TwitterSvg from './Twitter.svg';
import MailSvg from './Mail.svg';

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
        case 'circle':
            return <CircleIcon style={{color: "red"}} />
        case 'failed': 
            return FailedSvg
        case 'success':
            return SuccessSvg
        case 'javascript':
            return JavaScriptSvg
        case 'rest apis':
            return RestAPISvg
        case 'java':
            return JavaSvg
        case 'xml':
            return XMLSvg
        case 'firebase':
            return FirebaseSvg
        case 'flutter':
            return FlutterSvg
        case 'react native':
            return ReactSvg
        case 'kotlin':
            return KotlinSvg
        case 'html':
            return HTMLSvg
        case 'css':
            return CSSSvg
        case 'nodejs':
            return NodeJSSvg
        case 'node js':
            return NodeJSSvg
        case 'flask':
            return FlaskSvg
        case 'external apis':
            return RestAPISvg
        case '.net':
            return DotNetSvg
        case 'angular':
            return AngularSvg
        case 'react':
            return ReactSvg
        case 'reactjs':
            return ReactSvg
        case 'django':
            return DjangoSvg
        case 'machine learning':
            return MachineLearningSvg
        case 'artificial intelligence':
            return AISvg
        case 'ml':
            return MachineLearningSvg
        case 'ai':
            return AISvg
        case 'mysql':
            return MySQLSvg
        case 'mongodb':
            return MongoDBSvg
        case 'tensorflow':
            return TensorflowSvg
        case 'aws':
            return AWSSvg
        case 'eduhack':
            return CompanyLogo
        case 'facebook':
            return FacebookSvg
        case 'instagram':
            return InstagramSvg
        case 'twitter':
            return TwitterSvg
        case 'mail':
            return MailSvg
        default:
            return TechnologySvg
        
    }
}