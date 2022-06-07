import React, {useEffect, useState} from 'react';
import '../style/style.css';
import Header from "../components/Header";
import TestField from "../components/TestField";
import Department from "../components/Department";

const Departments = () => {
    const [name, setName] = useState('')
    const [manufactureId, setManufactureId] = useState(0)
    const [departments, setDepartments] = useState([])
    const [manufactures, setManufactures] = useState([])

    async function getManufactures() {
        const response = await fetch('http://localhost:8080/manufacture', {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        let data = await response.json()
        setManufactures(data)
        console.log(data)
    }
    async function getDepartments() {
        const response = await fetch('http://localhost:8080/department', {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        let data = await response.json()
        setDepartments(data)
        console.log(data)
    }
    async function addDepartment(event) {
        event.preventDefault()
        const response = await fetch('http://localhost:8080/department', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'name': name, 'manufacture_id': manufactureId})
        })
        //console.log(response.data)
    }
    useEffect(() => {
        getDepartments()
        getManufactures()
        console.log(manufactures)
        console.log(departments)
    }, [])
    return (
        <div>
            <Header/>
            <div>
                <form className="form" onSubmit={addDepartment}>
                    <p>Добавить участок: </p>
                    <input type="text" size="15" onChange={(e) => setName(e.target.value)}/>
                    <select onChange={(e) => setManufactureId(e.target.value)}>
                        {manufactures?.map((manufacture) => {
                            return <option value={manufacture.id}>{manufacture.name}</option>
                        })}
                    </select>
                </form>
                <div className="main">
                    {departments?.map((props) => <Department props={props}/>)}
                </div>
            </div>
        </div>
    );
};

export default Departments;