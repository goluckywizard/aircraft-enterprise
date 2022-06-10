import React, {useEffect, useState} from 'react';
import '../style/style.css';
import Aside from "../components/Aside";
import Engineer from "../components/Engineer";
import Worker from "../components/Worker";
import {RemoveAuth} from "./LoginPage";
import Header from "../components/Header";

const Workers = () => {
    const [lastName, setLastName] = useState('')
    const [firstName, setFirstName] = useState('')
    const [patronymic, setPatronymic] = useState('')

    const [categoryId, setCategoryId] = useState(0)
    const [brigadeId, setBrigadeId] = useState(0)
    const [workers, setWorkers] = useState([])
    const [categories, setCategories] = useState([])
    const [brigades, setBrigades] = useState([])

    async function getCategories() {
        let token = localStorage.getItem('token')
        const response = await fetch('http://localhost:8080/employee-category', {
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            }
        })
        if (response.status === 401) {
            RemoveAuth()
        }
        let data = await response.json()
        setCategories(data)
        console.log(data)
    }
    async function getBrigades() {
        let token = localStorage.getItem('token')
        const response = await fetch('http://localhost:8080/brigade', {
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            }
        })
        if (response.status === 401) {
            RemoveAuth()
        }
        let data = await response.json()
        setBrigades(data)
        console.log(data)
    }
    async function getWorkers() {
        let token = localStorage.getItem('token')
        const response = await fetch('http://localhost:8080/worker', {
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            }
        })
        if (response.status === 401) {
            RemoveAuth()
        }
        let data = await response.json()
        setWorkers(data)
        console.log(data)
    }
    async function addWorker(event) {
        let token = localStorage.getItem('token')
        const response = await fetch('http://localhost:8080/worker', {
            method: 'POST',
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'lastName': lastName, 'firstName': firstName, 'patronymic': patronymic, 'category_id': categoryId, 'brigade_id': brigadeId})
        })
        if (response.status === 401) {
            RemoveAuth()
        }
        console.log(response.data)
    }
    useEffect(() => {
        getWorkers()
        getCategories()
        getBrigades()
        console.log(categories)
        console.log(workers)
    }, [])
    console.log(...categories)
    return (
        <div className="App">
            <Header/>
            <Aside/>
            <div>
                <main className="content">
                    <div className="main-form2">
                        <form className="add" onSubmit={addWorker}>
                            <p>Добавить работника: </p>
                            <input type="text" size="15" placeholder="Введите фамилию" onChange={(e) => setLastName(e.target.value)}/>
                            <input type="text" size="15" placeholder="Введите имя" onChange={(e) => setFirstName(e.target.value)}/>
                            <input type="text" size="15" placeholder="Введите отчество" onChange={(e) => setPatronymic(e.target.value)}/>
                            <select onChange={(e) => setCategoryId(e.target.value)}>
                                {categories?.map((category) => {
                                    return <option value={category.id}>{category.name}</option>
                                })}
                            </select>
                            <select onChange={(e) => setBrigadeId(e.target.value)}>
                                {brigades?.map((brigade) => {
                                    return <option value={brigade.id}>{brigade.name}</option>
                                })}
                            </select>
                            <button className="btn2" type="submit">Добавить</button>
                        </form>
                        {workers?.map((props) => <Worker props={props} categories={categories} brigades={[...brigades]}/>)}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Workers;