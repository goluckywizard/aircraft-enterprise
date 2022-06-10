import React from 'react';
import '../style/style.css';
import { useHistory } from "react-router-dom"
import {useState} from "react";
import {RemoveAuth} from "../pages/LoginPage";

const Manufacture = (props) => {
    const [name, setName] = useState(props.props.name)
    const [isShown, setIsShown] = useState(false);
    const handleClick = (event) => {
        setIsShown(current => !current);
    };

    async function deleteManufacture() {
        let token = localStorage.getItem('token')
        const response = await fetch('http://localhost:8080/manufacture', {
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
    async function updateManufacture(event) {
        let token = localStorage.getItem('token')
        const response = await fetch('http://localhost:8080/manufacture', {
            method: 'PUT',
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'id': props.props.id, 'name': name})
        })
        console.log(response.data)
    }
    return (
        <div>
            <div className="container">
                <p>{props.props.id}</p>
                <p>{props.props.name}</p>
                <button className="btn2" onClick={handleClick}>Изменить</button>
                <button className="btn2" onClick={deleteManufacture}>Удалить</button>
            </div>
            {isShown && (
                <form className="formUpdate" onSubmit={updateManufacture}>
                    <input defaultValue={name} type="text" size="15" onChange={(e) => setName(e.target.value)}/>
                    <button className="btn2" type="submit">Сохранить</button>
                </form>
            )}
        </div>

    );
};

export default Manufacture;