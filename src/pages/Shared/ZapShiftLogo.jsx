import React from 'react';
import logo from '../../assets/logo.png';

const ZapShiftLogo = ({ textColor = "text-black" }) => {
    return (
        <div className="flex items-end">
            <img className="mb-1" src={logo} alt="company logo" />
            <p className={`text-3xl -ml-2 font-extrabold ${textColor}`}>
                ZapShift
            </p>
        </div>
    );
};

export default ZapShiftLogo;