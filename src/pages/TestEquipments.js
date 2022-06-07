import React, {useEffect, useState} from 'react';
import Header from "../components/Header";
import Department from "../components/Department";
import TestEquip from "../components/TestEquip";
import '../style/style.css';

const TestEquipments = () => {
    const [name, setName] = useState('')
    const [fieldId, setFieldId] = useState(0)
    const [equipment, setEquipment] = useState([])
    const [fields, setFields] = useState([])

    async function getFields() {
        const response = await fetch('http://localhost:8080/testfield', {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        let data = await response.json()
        setFields(data)
        console.log(data)
    }
    async function getEquipments() {
        const response = await fetch('http://localhost:8080/test-equipment', {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        let data = await response.json()
        setEquipment(data)
        console.log(data)
    }
    async function addEquipment(event) {
        event.preventDefault()
        const response = await fetch('http://localhost:8080/test-equipment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'name': name, 'testFieldId': fieldId})
        })
        //console.log(response.data)
    }
    useEffect(() => {
        getEquipments()
        getFields()
        console.log(fields)
        console.log(equipment)
    }, [])
    return (
        <div>
            <Header/>
            <div>
                <form className="form" onSubmit={addEquipment}>
                    <p>Добавить оборудование: </p>
                    <input type="text" size="15" onChange={(e) => setName(e.target.value)}/>
                    <select onChange={(e) => setFieldId(e.target.value)}>
                        {fields?.map((field) => {
                            return <option value={field.id}>{field.name}</option>
                        })}
                    </select>
                </form>
                <div className="main">
                    {equipment?.map((props) => <TestEquip props={props}/>)}
                </div>
            </div>
        </div>
    );
};

export default TestEquipments;