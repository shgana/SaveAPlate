import React from 'react';
import './Header.css'; // Ensure you have this CSS file in the same directory

const Header = () => {
    return (
        <div className="header">
            {/* Replace the src attribute with the path to your actual logo */}
            <img src="path/to/your/logo.png" alt="SaveAPlate Logo" className="logo" />
            <h1>SaveAPlate</h1>
        </div>
    );
};

export default Header;