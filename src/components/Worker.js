import React, {useState} from 'react';
import '../style/style.css';
import {RemoveAuth} from "../pages/LoginPage";

const Worker = (props) => {
    const [id, setId] = useState(parseInt(props.props.id))
    const [lastName, setLastName] = useState(props.props.lastName)
    const [firstName, setFirstName] = useState(props.props.firstName)
    const [patronymic, setPatronymic] = useState(props.props.patronymic)
    const [categoryId, setCategoryId] = useState(props.props.category_id)
    const [brigadeId, setBrigadeId] = useState(props.props.brigade)

    const [isShown, setIsShown] = useState(false);
    const handleClick = (event) => {
        setIsShown(current => !current);
    };
    async function deleteWorker() {
        let token = localStorage.getItem('token')
        const response = await fetch('http://localhost:8080/worker', {
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
    async function updateWorker(event) {
        let token = localStorage.getItem('token')
        const response = await fetch('http://localhost:8080/worker', {
            method: 'PUT',
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'id': id, 'lastName': lastName, 'firstName': firstName, 'patronymic': patronymic, 'category_id': categoryId, 'brigade_id': brigadeId})
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
                <p>Бригада: {props.props.brigade_name}</p>
                <button className="btn2" onClick={deleteWorker}>Удалить</button>
                <button className="btn2" onClick={handleClick}>Изменить</button>
            </div>
            {isShown && (
                <form className="formUpdate" onSubmit={updateWorker}>
                    <input type="text" size="15" defaultValue={props.props.lastName} onChange={(e) => setLastName(e.target.value)}/>
                    <input type="text" size="15" defaultValue={props.props.firstName} onChange={(e) => setFirstName(e.target.value)}/>
                    <input type="text" size="15" defaultValue={props.props.patronymic} onChange={(e) => setPatronymic(e.target.value)}/>
                    <select onChange={(e) => setCategoryId(e.target.value)}>
                        {props.categories?.map((category) => {
                            return <option value={category.id}>{category.name}</option>
                        })}
                    </select>
                    <select onChange={(e) => setBrigadeId(e.target.value)}>
                        {props.brigades?.map((brigade) => {
                            return <option value={brigade.id}>{brigade.name}</option>
                        })}
                    </select>
                    <button className="btn2" type="submit">Сохранить</button>
                </form>
            )}
        </div>

    );
};

export default Worker;