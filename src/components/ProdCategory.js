import React from 'react';
import {RemoveAuth} from "../pages/LoginPage";
import {useState} from "react";

const ProdCategory = (props) => {

    const [name, setName] = useState(props.props.name)
    const [isShown, setIsShown] = useState(false);
    const handleClick = (event) => {
        setIsShown(current => !current);
    };
    async function deleteCategory() {
        let token = localStorage.getItem('token')
        const response = await fetch('http://localhost:8080/product-category', {
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
    async function updateCategory(event) {
        let token = localStorage.getItem('token')
        const response = await fetch('http://localhost:8080/product-category', {
            method: 'PUT',
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'id': props.props.id, 'name': name})
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
                <button className="btn2" onClick={handleClick}>Изменить</button>
                <button className="btn2" onClick={deleteCategory}>Удалить</button>
            </div>
            {isShown && (
                <form className="formUpdate" onSubmit={updateCategory}>
                    <input defaultValue={name} type="text" size="15" onChange={(e) => setName(e.target.value)}/>
                    <button className="btn2" type="submit">Сохранить</button>
                </form>
            )}
        </div>

    );
};

export default ProdCategory;