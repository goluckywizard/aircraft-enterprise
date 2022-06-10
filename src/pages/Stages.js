import React, {useEffect, useState} from 'react';
import Stage from "../components/Stage";
import '../style/style.css';
import Aside from "../components/Aside";
import {RemoveAuth} from "./LoginPage";
import Header from "../components/Header";

const Stages = () => {
    const [name, setName] = useState('')
    const [stages, setStages] = useState([])
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
    async function addStage(event) {
        let token = localStorage.getItem('token')
        const response = await fetch('http://localhost:8080/stage', {
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
        getStages()
        console.log(stages)
    }, [])
    return (
        <div className="App">
            <Header/>
            <Aside/>
            <div>
            <main className="content">
                <div className="main-form2">
                    <form onSubmit={addStage} className="add">
                        <p>Добавить стадию: </p>
                        <input type="text" size="15" onChange={(e) => setName(e.target.value)}/>
                    </form>
                    {stages?.map((stage) => <Stage props={stage}/>)}
                </div>
            </main>
            </div>
                {/*{stages?.map((stage) => <Stage props={stage}/>)}*/}
            {/*<div className="main">*/}
            {/*    */}
            {/*</div>*/}

        </div>
    );
};

export default Stages;