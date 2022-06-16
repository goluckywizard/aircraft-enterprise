import React from 'react';
import {RemoveAuth} from "../pages/LoginPage";

const Work = (props) => {
    console.log(props)
    async function deleteWork() {
        let token = localStorage.getItem('token')
        const response = await fetch('http://localhost:8080/work', {
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
        <div className="container">
            <p>{props.props.id}</p>
            <p>{props.props.name}</p>
            <p>{props.props.department.name}</p>
            <p>{props.props.stage.name}</p>
            <p>{props.props.brigade.name}</p>
            <div className="column-list">
                {props.props.products?.map((a) => <p>ID: {a.id} Тип:{a.type.name}</p>)}
            </div>
            <button className="btn2" onClick={deleteWork}>Удалить</button>
        </div>
    );
};

export default Work;