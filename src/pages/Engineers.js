import React, {useEffect, useState} from 'react';
import Aside from "../components/Aside";
import TestField from "../components/TestField";
import Engineer from "../components/Engineer";
import {RemoveAuth} from "./LoginPage";
import Header from "../components/Header";

const Engineers = () => {
    const [lastName, setLastName] = useState('')
    const [firstName, setFirstName] = useState('')
    const [patronymic, setPatronymic] = useState('')

    const [categoryId, setCategoryId] = useState(0)
    const [engineers, setEngineers] = useState([])
    const [categories, setCategories] = useState([])

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
    async function getEngineers() {
        let token = localStorage.getItem('token')
        const response = await fetch('http://localhost:8080/engineer', {
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            }
        })
        if (response.status === 401) {
            RemoveAuth()
        }
        let data = await response.json()
        setEngineers(data)
        console.log(data)
    }
    async function addEngineer(event) {
        let token = localStorage.getItem('token')
        const response = await fetch('http://localhost:8080/engineer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'lastName': lastName, 'firstName': firstName, 'patronymic': patronymic, 'category_id': categoryId})
        })
        if (response.status === 401) {
            RemoveAuth()
        }
        console.log(response.data)
    }
    useEffect(() => {
        getEngineers()
        getCategories()
        console.log(categories)
        console.log(engineers)
    }, [])
    return (
        <div className="App"className="App">
            <Header/>
            <Aside/>
            <div>
                <main className="content">
                    <div className="main-form2">
                        <form className="add" onSubmit={addEngineer}>
                            <p>Добавить работника: </p>
                            <input type="text" size="15" placeholder="Введите фамилию" onChange={(e) => setLastName(e.target.value)}/>
                            <input type="text" size="15" placeholder="Введите имя" onChange={(e) => setFirstName(e.target.value)}/>
                            <input type="text" size="15" placeholder="Введите отчество" onChange={(e) => setPatronymic(e.target.value)}/>
                            <select onChange={(e) => setCategoryId(e.target.value)}>
                                {categories?.map((category) => {
                                    return <option value={category.id}>{category.name}</option>
                                })}
                            </select>
                            <button className="btn2" type="submit">Добавить</button>
                        </form>
                        {engineers?.map((props) => <Engineer props={props} categories={categories}/>)}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Engineers;