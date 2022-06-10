import React from 'react';
import {RemoveAuth} from "../pages/LoginPage";
import {useState} from "react";

const ProdAttribute = (props) => {
    const [attribute, setAttribute] = useState(props.props.attribute)
    const [value, setValue] = useState(props.props.value)
    const [categoryId, setCategoryId] = useState(props.props.category_id)
    const [categories, setCategories] = useState(props.categories)
    const [isShown, setIsShown] = useState(false);
    const handleClick = (event) => {
        setIsShown(current => !current);
    }
    async function updateAttribute(event) {
        //event.preventDefault()
        let token = localStorage.getItem('token')
        const response = await fetch('http://localhost:8080/product-attribute', {
            method: 'PUT',
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'attribute': attribute, 'category_id': categoryId, 'value': value})
        })
        if (response.status === 401) {
            RemoveAuth()
        }
        //console.log(response.data)
    }
    async function deleteAttribute() {
        let token = localStorage.getItem('token')
        const response = await fetch('http://localhost:8080/product-attribute', {
            method: 'DELETE',
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'categoryId': props.props.category_id, 'attribute': props.props.attribute})
        })
        if (response.status === 401) {
            RemoveAuth()
        }
        console.log(response.data)
    }
    return (
        <div>
            <div className="container">
                <p>{props.props.attribute}</p>
                <p>{props.props.value}</p>
                <button className="btn2" onClick={handleClick}>Изменить</button>
                <button className="btn2" onClick={deleteAttribute}>Удалить</button>
            </div>
            {isShown && (
                <form className="formUpdate" onSubmit={updateAttribute}>
                    <p>Изменить атрибут: </p>
                    <input type="text" size="15" defaultValue={value} onChange={(e) => setValue(e.target.value)}/>
                    <button className="btn2" type="submit">Сохранить</button>
                </form>
            )}
        </div>

    );
};

export default ProdAttribute;