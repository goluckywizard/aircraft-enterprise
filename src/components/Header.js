import React from 'react';
import {Link} from "react-router-dom";
import '../style/header.css';

const Header = () => {
    return (
        <header className="container">
            <Link to="/manufacture">
                <p>Цеха</p>
            </Link>
            <Link to="/department">
                <p>Участки</p>
            </Link>
            <Link to="/testfield">
                <p>Полигоны</p>
            </Link>
            <Link to="/stages">
                <p>Стадии тестов</p>
            </Link>
            <Link to="/empl-category">
                <p>Категории персонала</p>
            </Link>
        </header>
    );
};

export default Header;