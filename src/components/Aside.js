import React from 'react';
import {Link} from "react-router-dom";
import '../style/aside.css';

const Aside = () => {
    return (
        <aside className="headerContainer">
            {/*<div className="cont">*/}
                <Link className="link" to="/manufacture">
                    <p className="headerElement">Цеха</p>
                </Link>
                <Link className="link" to="/department">
                    <p className="headerElement">Участки</p>
                </Link>
                <Link className="link" to="/testfield">
                    <p className="headerElement">Полигоны</p>
                </Link>
                <Link className="link" to="/stages">
                    <p className="headerElement">Стадии</p>
                </Link>
                <Link className="link" to="/empl-category">
                    <p className="headerElement">Категории персонала</p>
                </Link>
                <Link className="link" to="/empl-attribute">
                    <p className="headerElement">Атрибуты персонала</p>
                </Link>
                <Link className="link" to="/engineer">
                    <p className="headerElement">Инженеры</p>
                </Link>
            {/*</div>*/}
            {/*<div className="cont">*/}
                <Link className="link" to="/brigade">
                    <p className="headerElement">Бригады</p>
                </Link>
                <Link className="link" to="/worker">
                    <p className="headerElement">Рабочие</p>
                </Link>
                <Link className="link" to="/test-equipment">
                    <p className="headerElement">Оборудование</p>
                </Link>
                <Link className="link" to="/product-category">
                    <p className="headerElement">Категории продуктов</p>
                </Link>
                <Link className="link" to="/product-attribute">
                    <p className="headerElement">Атрибуты продуктов</p>
                </Link>
                <Link className="link" to="/product-type">
                    <p className="headerElement">Типы продуктов</p>
                </Link>
                <Link className="link" to="/product">
                    <p className="headerElement">Продукты</p>
                </Link>
                <Link className="link" to="/work">
                    <p className="headerElement">Работы</p>
                </Link>
                <Link className="link" to="/product-to-work">
                    <p className="headerElement">Начать работу над продуктом</p>
                </Link>
        </aside>
    );
};

export default Aside;