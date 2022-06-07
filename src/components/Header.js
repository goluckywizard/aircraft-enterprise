import React from 'react';
import {Link} from "react-router-dom";
import '../style/header.css';

const Header = () => {
    return (
        <header className="headerContainer">
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
            <Link to="/engineer">
                <p>Инженерно-технический персонал</p>
            </Link>
            <Link to="/brigade">
                <p>Бригады</p>
            </Link>
            <Link to="/worker">
                <p>Рабочие</p>
            </Link>
            <Link to="/test-equipment">
                <p>Оборудование</p>
            </Link>
            <Link to="/product-category">
                <p>Категории продуктов</p>
            </Link>

        </header>
    );
};

export default Header;