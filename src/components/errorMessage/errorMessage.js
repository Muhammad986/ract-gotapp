import React from "react";
import './errorMessage.css';
import img from './phError.jpg';

const ErrorMessage = () => {
    return (
        <>
            {/* process.env.PUBLIC_URL + '/img/phError.jpg'   в таком виде берём из папки public*/}
            <img src={img} alt='error'></img>
            <span>Something goes wrong</span>
        </>
    );
}

export default ErrorMessage;