import React, {useEffect, useState} from 'react';
import '../style/style.css';
import Manufacture from "../components/Manufacture";
import Aside from "../components/Aside";
import {RemoveAuth} from "./LoginPage";
import Header from "../components/Header";

const Manufactures = () => {
    const [name, setName] = useState('')
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
            console.log('a')
            RemoveAuth()
        }
        let data = await response.json()
        setManufactures(data)
        console.log(data)

    }
    async function addManufacture(event) {
        event.preventDefault()
        let token = localStorage.getItem('token')
        const response = await fetch('http://localhost:8080/manufacture', {
            method: 'POST',
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'name': name})
        })
        console.log(response.data)
    }
    useEffect(() => {
        getManufactures()
        console.log(manufactures)
    }, [])
    return (
        <div className="App">
            <Header/>
            <Aside/>
            <div className="m">
            <main className="content">
            <div className="main-form2">
                <form className="add" onSubmit={addManufacture}>
                    <p>Добавить цех: </p>
                    <input type="text" size="15" onChange={(e) => setName(e.target.value)}/>
                </form>
                {manufactures?.map((props) => <Manufacture props={props}/>)}
            </div>
            </main>
            </div>
        </div>
    );
};

export default Manufactures;