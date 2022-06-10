import React from 'react';
import {RemoveAuth} from "../pages/LoginPage";
import {useState} from "react";

const ProdType = (props) => {
    const [name, setName] = useState(props.props.name)
    const [categoryId, setCategoryId] = useState(props.props.category_id)
    const [categories, setCategories] = useState(props.categories)
    const [isShown, setIsShown] = useState(false);
    const handleClick = (event) => {
        setIsShown(current => !current);
    };

    async function updateType(event) {
        let token = localStorage.getItem('token')
        const response = await fetch('http://localhost:8080/product-type', {
            method: 'PUT',
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'name': name, 'category_id': categoryId})
        })
        if (response.status === 401) {
            RemoveAuth()
        }
        //console.log(response.data)
    }
    async function deleteType() {
        let token = localStorage.getItem('token')
        const response = await fetch('http://localhost:8080/product-type', {
            method: 'DELETE',
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
            body: props.props.id
        })
        if (response.status === 401) {
            RemoveAuth()
        }
        console.log(response.data)
    }
    return (
        <div>
            <div className="container">
                <p>{props.props.id}</p>
                <p>{props.props.name}</p>
                <p>Категория: {props.props.category_name}</p>
                <button className="btn2" onClick={handleClick}>Изменить</button>
                <button className="btn2" onClick={deleteType}>Удалить</button>
            </div>
            {isShown && (
                <form className="formUpdate" onSubmit={updateType}>
                    <input defaultValue={name} type="text" size="15" onChange={(e) => setName(e.target.value)}/>
                    <select onChange={(e) => setCategoryId(e.target.value)}>
                        {categories?.map((category) => {
                            return <option value={category.id}>{category.name}</option>
                        })}
                    </select>
                    <button className="btn2" type="submit">Сохранить</button>
                </form>
            )}
        </div>

    );
};

export default ProdType;