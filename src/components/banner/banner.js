import React from 'react';
import "./banner.scss";

const Banner = ({error, message}) => {
    return (
        <div className={`banner-container ${error ? 'error-banner-container' : 'success-banner-container'}`} >
            {message}
        </div>
    );
};

export default Banner;