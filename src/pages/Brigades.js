import React, {useEffect, useState} from 'react';
import '../style/style.css';
import Aside from "../components/Aside";
import Manufacture from "../components/Manufacture";
import Brigade from "../components/Brigade";
import {RemoveAuth} from "./LoginPage";
import Header from "../components/Header";

const Brigades = () => {
    const [name, setName] = useState('')
    const [brigades, setBrigades] = useState([])
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
    async function addBrigade(event) {
        let token = localStorage.getItem('token')
        const response = await fetch('http://localhost:8080/brigade', {
            method: 'POST',
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'name': name})
        })
        if (response.status === 401) {
            RemoveAuth()
        }
        console.log(response.data)
    }
    useEffect(() => {
        getBrigades()
        console.log(brigades)
    }, [])
    return (
        <div className="App">
            <Header/>
            <Aside/>
            <div>
            <main className="content">
                <div className="main-form2">
                    <form className="add" onSubmit={addBrigade}>
                        <p>Добавить бригаду: </p>
                        <input type="text" size="15" onChange={(e) => setName(e.target.value)}/>
                        <button className="btn2" type="submit">Добавить</button>
                    </form>
                    {brigades?.map((props) => <Brigade props={props} brigades={brigades}/>)}
                </div>
            </main>
            </div>
        </div>
    );
};

export default Brigades;