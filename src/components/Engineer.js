import React from 'react';
import '../style/style.css';
import {RemoveAuth} from "../pages/LoginPage";
import {useState} from "react";

const Engineer = (props) => {
    const [lastName, setLastName] = useState(props.props.lastName)
    const [firstName, setFirstName] = useState(props.props.firstName)
    const [patronymic, setPatronymic] = useState(props.props.patronymic)

    const [categoryId, setCategoryId] = useState(props.props.category_id)
    const [categories, setCategories] = useState(props.categories)
    const [isShown, setIsShown] = useState(false);
    const handleClick = (event) => {
        setIsShown(current => !current);
    };

    async function deleteEngineer() {
        let token = localStorage.getItem('token')
        const response = await fetch('http://localhost:8080/engineer', {
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
    async function updateEngineer(event) {
        let token = localStorage.getItem('token')
        const response = await fetch('http://localhost:8080/engineer', {
            method: 'PUT',
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'id': props.props.id, 'lastName': lastName, 'firstName': firstName, 'patronymic': patronymic, 'category_id': categoryId})
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
                <p>{props.props.lastName}</p>
                <p>{props.props.firstName}</p>
                <p>{props.props.patronymic}</p>
                <p>Категория: {props.props.category_name}</p>
                <button className="btn2" onClick={handleClick}>Изменить</button>
                <button className="btn2" onClick={deleteEngineer}>Удалить</button>
            </div>
            {isShown && (
            <form className="formUpdate" onSubmit={updateEngineer}>
                <input type="text" size="15" defaultValue={lastName} onChange={(e) => setLastName(e.target.value)}/>
                <input type="text" size="15" defaultValue={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                <input type="text" size="15" defaultValue={patronymic} onChange={(e) => setPatronymic(e.target.value)}/>
                <select onChange={(e) => setCategoryId(e.target.value)}>
                    {categories?.map((category) => {
                        return <option value={category.id}>{category.name}</option>
                    })}
                </select>
                <button className="btn2" type="submit">Сохранить</button>
            </form>)}
        </div>

    );
};

export default Engineer;