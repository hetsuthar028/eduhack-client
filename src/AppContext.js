import React,{ useState } from 'react';
import Banner from './components/banner/banner';

export const AppContext = React.createContext();

export const AppProvider = (props) => {

    const [showBanner, setShowBanner] = useState(null);

    const renderApiResponse = () => {
        if (showBanner.apiErrorResponse) {
            return <Banner error={true} message={showBanner.apiErrorResponse} />
        }
        if (showBanner.apiSuccessResponse) {
            return <Banner message={showBanner.apiSuccessResponse} />
        }
    }

    return (
        <AppContext.Provider value={{setShowBanner}}>
            {props.children}
            {
                showBanner && renderApiResponse()
            }
        </AppContext.Provider>
    )
}
