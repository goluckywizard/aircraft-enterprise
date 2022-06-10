import React from 'react';
import '../style/style.css';
import {RemoveAuth} from "../pages/LoginPage";
import {useState} from "react";

const TestEquip = (props) => {
    const [name, setName] = useState(props.props.name)
    const [fieldId, setFieldId] = useState(props.props.field.id)
    const [fields, setFields] = useState(props.fields)
    const [isShown, setIsShown] = useState(false);
    const handleClick = (event) => {
        setIsShown(current => !current);
    };
    async function deleteEquipment() {
        let token = localStorage.getItem('token')
        const response = await fetch('http://localhost:8080/test-equipment', {
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
    async function updateEquipment(event) {
        let token = localStorage.getItem('token')
        const response = await fetch('http://localhost:8080/test-equipment', {
            method: 'PUT',
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'id': props.props.id, 'name': name, 'testFieldId': fieldId})
        })
        if (response.status === 401) {
            RemoveAuth()
        }
        //console.log(response.data)
    }
    return (
        <div>
            <div className="container">
                <p>{props.props.id}</p>
                <p>{props.props.name}</p>
                <p>Полигон: {props.props.field.name}</p>
                <button className="btn2" onClick={handleClick}>Изменить</button>
                <button className="btn2" onClick={deleteEquipment}>Удалить</button>
            </div>
            {isShown && (
                <form className="formUpdate" onSubmit={updateEquipment}>
                    <input defaultValue={name} type="text" size="15" onChange={(e) => setName(e.target.value)}/>

                    <button className="btn2" type="submit">Сохранить</button>
                </form>
            )}
        </div>

    );
};

export default TestEquip;