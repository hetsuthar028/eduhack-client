import React,{ useState, useEffect } from 'react';
import Banner from './components/banner/banner';
import axios from 'axios';

export const AppContext = React.createContext();

export const AppProvider = (props) => {

    const [showBanner, setShowBanner] = useState(null);
    const [appCurrentUser, setAppCurrentUser] = useState(null);

    const renderApiResponse = () => {
        if (showBanner.apiErrorResponse) {
            return <Banner error={true} message={showBanner.apiErrorResponse} />
        }
        if (showBanner.apiSuccessResponse) {
            return <Banner message={showBanner.apiSuccessResponse} />
        }
    }

    const updateAppCurrentUser = async () => {
        await axios.get(`http://localhost:4200/api/user/currentuser`, {
            headers: {
                authorization: localStorage.getItem('session')
            }
        })
        .then(responses => {
            setAppCurrentUser(responses.data.currentUser)
            console.log("Updated User", appCurrentUser)
            return appCurrentUser
        }).catch((err) => {
            setShowBanner({apiErrorResponse: "Error fetching data! Please try again."})
        })
    }

    useEffect(() => {
        updateAppCurrentUser();
        console.log("C2 User", appCurrentUser)
    }, []);

    return (
        <AppContext.Provider value={{setShowBanner, appCurrentUser, updateAppCurrentUser}}>
            {props.children}
            {
                showBanner && renderApiResponse()
            }
        </AppContext.Provider>
    )
}
