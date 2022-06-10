import React from 'react';
import '../style/style.css';
import {RemoveAuth} from "../pages/LoginPage";
import {useState} from "react";

const Department = (props) => {
    console.log(props)
    const [id, setId] = useState(props.props.id)
    const [name, setName] = useState(props.props.name)
    const [manufactureId, setManufactureId] = useState(props.props.manufactureId)
    const [manufactures, setManufactures] = useState(props.manufactures)
    const [isShown, setIsShown] = useState(false);
    const handleClick = (event) => {
        setIsShown(current => !current);
    };

    async function deleteDepartment() {
        let token = localStorage.getItem('token')
        const response = await fetch('http://localhost:8080/department', {
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
    async function updateDepartment(event) {
        let token = localStorage.getItem('token')
        const response = await fetch('http://localhost:8080/department', {
            method: 'PUT',
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'id': id, 'name': name})
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
                <p>Мануфактура: {props.props.manufactureName}</p>
                <button className="btn2" onClick={handleClick}>Изменить</button>
                <button className="btn2" onClick={deleteDepartment}>Удалить</button>
            </div>
            {isShown && (
                <form className="formUpdate" onSubmit={updateDepartment}>
                    <input defaultValue={name} type="text" size="15" onChange={(e) => setName(e.target.value)}/>
                    <select onChange={(e) => setManufactureId(e.target.value)}>
                        {manufactures?.map((manufacture) => {
                            return <option value={manufacture.id}>{manufacture.name}</option>
                        })}
                    </select>
                    <button className="btn2" type="submit">Сохранить</button>
                </form>
            )}
        </div>

    );
};

export default Department;