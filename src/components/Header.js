import React from 'react';
import {Link} from "react-router-dom";
import '../style/header.css';

const Header = () => {
    return (
        <header className="headerContainer">
            <Link to="/manufacture">
                <p className="headerElement">Цеха</p>
            </Link>
            <Link to="/department">
                <p className="headerElement">Участки</p>
            </Link>
            <Link to="/testfield">
                <p className="headerElement">Полигоны</p>
            </Link>
            <Link to="/stages">
                <p className="headerElement">Стадии тестов</p>
            </Link>
            <Link to="/empl-category">
                <p className="headerElement">Категории персонала</p>
            </Link>
            <Link to="/empl-attribute">
                <p className="headerElement">Атрибуты персонала</p>
            </Link>

            <Link to="/engineer">
                <p className="headerElement">Инженерно-технический персонал</p>
            </Link>
            <Link to="/brigade">
                <p className="headerElement">Бригады</p>
            </Link>
            <Link to="/worker">
                <p className="headerElement">Рабочие</p>
            </Link>
            <Link to="/test-equipment">
                <p className="headerElement">Оборудование</p>
            </Link>
            <Link to="/product-category">
                <p className="headerElement">Категории продуктов</p>
            </Link>
            <Link to="/product-attribute">
                <p className="headerElement">Атрибуты продуктов</p>
            </Link>
            <Link to="/product-type">
                <p className="headerElement">Типы продуктов</p>
            </Link>

        </header>
    );
};

export default Header;