import React from 'react';
import '../style/header.css';
import icon from  '../img/mail.png'

const Header = () => {
    return (
        <header className="header">
            <img src={icon} height='60px' width='60px'/>
            <h1>Информационная система авиастроительного предприятия</h1>
        </header>
    );
};

export default Header;