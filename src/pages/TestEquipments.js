import React, {useEffect, useState} from 'react';
import Aside from "../components/Aside";
import Department from "../components/Department";
import TestEquip from "../components/TestEquip";
import '../style/style.css';
import {RemoveAuth} from "./LoginPage";
import Header from "../components/Header";

const TestEquipments = () => {
    const [name, setName] = useState('')
    const [fieldId, setFieldId] = useState(0)
    const [equipment, setEquipment] = useState([])
    const [fields, setFields] = useState([])

    async function getFields() {
        let token = localStorage.getItem('token')
        const response = await fetch('http://localhost:8080/testfield', {
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            }
        })
        if (response.status === 401) {
            RemoveAuth()
        }
        let data = await response.json()
        setFields(data)
        console.log(data)
    }
    async function getEquipments() {
        let token = localStorage.getItem('token')
        const response = await fetch('http://localhost:8080/test-equipment', {
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            }
        })
        if (response.status === 401) {
            RemoveAuth()
        }
        let data = await response.json()
        setEquipment(data)
        console.log(data)
    }
    async function addEquipment(event) {
        let token = localStorage.getItem('token')
        event.preventDefault()
        const response = await fetch('http://localhost:8080/test-equipment', {
            method: 'POST',
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'name': name, 'testFieldId': fieldId})
        })
        if (response.status === 401) {
            RemoveAuth()
        }
        //console.log(response.data)
    }
    useEffect(() => {
        getEquipments()
        getFields()
        console.log(fields)
        console.log(equipment)
    }, [])
    return (
        <div className="App">
            <Header/>
            <Aside/>
            <div>
                <main className="content">
                    <div className="main-form2">
                        <form className="add" onSubmit={addEquipment}>
                            <p>Добавить оборудование: </p>
                            <input type="text" size="15" onChange={(e) => setName(e.target.value)}/>
                            <select onChange={(e) => setFieldId(e.target.value)}>
                                {fields?.map((field) => {
                                    return <option value={field.id}>{field.name}</option>
                                })}
                            </select>
                        </form>
                        {equipment?.map((props) => <TestEquip props={props} fields={fields}/>)}
                    </div>
                </main>
                {/*<div className="main">*/}
                {/*    {equipment?.map((props) => <TestEquip props={props} fields={fields}/>)}*/}
                {/*</div>*/}
            </div>
        </div>
    );
};

export default TestEquipments;