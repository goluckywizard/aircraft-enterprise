import React from 'react';
import '../style/style.css';
import {RemoveAuth} from "../pages/LoginPage";
import {useState} from 'react';

const Brigade = (props) => {
    const [id, setId] = useState(props.props.id)
    const [name, setName] = useState(props.props.name)
    const [brigades, setBrigades] = useState(props.props.brigades)
    const [isShown, setIsShown] = useState(false);
    const handleClick = (event) => {
        setIsShown(current => !current);
    };

    async function deleteBrigade() {
        let token = localStorage.getItem('token')
        const response = await fetch('http://localhost:8080/brigade', {
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
    async function updateBrigade(event) {
        let token = localStorage.getItem('token')
        const response = await fetch('http://localhost:8080/brigade', {
            method: 'PUT',
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'id': id})
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
                <button className="btn2" onClick={deleteBrigade}>Удалить</button>
            </div>
            {isShown && (
                <form className="formUpdate" onSubmit={updateBrigade}>
                    <input defaultValue={name} type="text" size="15" onChange={(e) => setName(e.target.value)}/>
                    <button className="btn2" type="submit">Сохранить</button>
                </form>
            )}
        </div>

    );
};

export default Brigade;