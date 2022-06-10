import React, {useEffect, useState} from 'react';
import '../style/style.css';
import Aside from "../components/Aside";
import Engineer from "../components/Engineer";
import Product from "../components/Product";
import Work from "../components/Work";
import {RemoveAuth} from "./LoginPage";
import Header from "../components/Header";

const Works = () => {
    const [stageId, setStageId] = useState(0)
    const [departmentId, setDepartmentId] = useState(0)
    const [brigadeId, setBrigadeId] = useState(0)
    const [stages, setStages] = useState([])
    const [departments, setDepartments] = useState([])
    const [works, setWorks] = useState([])
    const [brigades, setBrigades] = useState([])

    async function getDepartments() {
        let token = localStorage.getItem('token')
        const response = await fetch('http://localhost:8080/department', {
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            }
        })
        if (response.status === 401) {
            RemoveAuth()
        }
        let data = await response.json()
        setDepartments(data)
        console.log(data)
    }
    async function getStages() {
        let token = localStorage.getItem('token')
        const response = await fetch('http://localhost:8080/stage', {
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            }
        })
        if (response.status === 401) {
            RemoveAuth()
        }
        let data = await response.json()
        setStages(data)
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
    async function getWorks() {
        let token = localStorage.getItem('token')
        const response = await fetch('http://localhost:8080/work', {
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            }
        })
        if (response.status === 401) {
            RemoveAuth()
        }
        let data = await response.json()
        setWorks(data)
        console.log(data)
    }
    async function addWork(event) {
        let token = localStorage.getItem('token')
        //event.preventDefault()
        const response = await fetch('http://localhost:8080/work', {
            method: 'POST',
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'departmentId': departmentId, 'stage_id': stageId, 'brigade_id': brigadeId})
        })
        if (response.status === 401) {
            RemoveAuth()
        }
        console.log(response.data)
    }
    useEffect(() => {
        getDepartments()
        getStages()
        getBrigades()
        getWorks()
        console.log(departments)
        console.log(stages)
    }, [])
    return (
        <div className="App">
            <Header/>
            <Aside/>
            <div>
            <main className="content">
                <div className="main-form2">
                    <form className="add" onSubmit={addWork}>
                        <p>Добавить работу: </p>
                        <select defaultValue="DEFAULT" id="mySelect2" onChange={(e) => {
                            setDepartmentId(e.target.value)
                        }}>
                            <option value="DEFAULT" disabled>Choose a category</option>
                            {departments?.map((category) => {
                                return <option value={category.id}>{category.name}</option>
                            })}
                        </select>
                        <select defaultValue={'DEFAULT'}  onChange={(e) => {
                            setStageId(e.target.value)
                        }}>
                            <option value="DEFAULT" disabled>Choose a type</option>
                            {stages?.map((type) => <option value={type.id}>{type.name}</option>)}
                        </select>
                        <select defaultValue={'DEFAULT'}  onChange={(e) => {
                            setBrigadeId(e.target.value)
                        }}>
                            <option value="DEFAULT" disabled>Choose a type</option>
                            {brigades?.map((type) => <option value={type.id}>{type.name}</option>)}
                        </select>
                        <button className="btn2" type="submit">Добавить</button>
                    </form>
                    {works?.map((props) => <Work props={props}/>)}
                </div>
            </main>
            </div>
        </div>
    );
};

export default Works;