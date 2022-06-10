import React, {useEffect, useState} from 'react';
import '../style/style.css';
import { useHistory } from "react-router-dom"
import Aside from "../components/Aside";
import TestField from "../components/TestField";
import Department from "../components/Department";
import {RemoveAuth} from "./LoginPage";
import Header from "../components/Header";

const Departments = () => {
    const [name, setName] = useState('')
    const [manufactureId, setManufactureId] = useState(0)
    const [departments, setDepartments] = useState([])
    const [manufactures, setManufactures] = useState([])

    async function getManufactures() {
        let token = localStorage.getItem('token')
        const response = await fetch('http://localhost:8080/manufacture', {
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            }
        })
        if (response.status === 401) {
            RemoveAuth()
        }
        let data = await response.json()
        setManufactures(data)
        console.log(data)
    }
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
        console.log(response)
        let data = await response.json()
        setDepartments(data)
        console.log(data)
    }
    async function addDepartment(event) {
        let token = localStorage.getItem('token')
        const response = await fetch('http://localhost:8080/department', {
            method: 'POST',
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'name': name, 'manufacture_id': manufactureId})
        })
        if (response.status === 401) {
            RemoveAuth()
        }
        console.log(response.data)
    }
    useEffect(() => {
        getDepartments()
        getManufactures()
        console.log(manufactures)
        console.log(departments)
    }, [])
    return (
        <div className="App">
            <Header/>
            <Aside/>
            <div>
                <main className="content">
                    <div className="main-form2">
                        <form className="add" onSubmit={addDepartment}>
                            <p>Добавить участок: </p>
                            <input type="text" size="15" onChange={(e) => setName(e.target.value)}/>
                            <select onChange={(e) => setManufactureId(e.target.value)}>
                                {manufactures?.map((manufacture) => {
                                    return <option value={manufacture.id}>{manufacture.name}</option>
                                })}
                            </select>
                        </form>
                        {departments?.map((props) => <Department props={props} manufactures={manufactures}/>)}
                    </div>
                </main>
                {/*<div className="main">*/}
                {/*    {departments?.map((props) => <Department props={props} manufactures={manufactures}/>)}*/}
                {/*</div>*/}
            </div>
        </div>
    );
};

export default Departments;