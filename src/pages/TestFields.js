import React, {useEffect, useState} from 'react';
import TestField from "../components/TestField";
import '../style/style.css';
import Aside from "../components/Aside";
import {RemoveAuth} from "./LoginPage";
import Header from "../components/Header";

const TestFields = () => {
    const [name, setName] = useState('')
    const [testfield, setTestfield] = useState([])
    async function getTestfields() {
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
        setTestfield(data)
        //console.log(data)
    }
    async function addTestfield(event) {
        let token = localStorage.getItem('token')
        const response = await fetch('http://localhost:8080/testfield', {
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
        //console.log(response.data)
    }
    useEffect(() => {
        getTestfields()
        console.log(testfield)
    }, [])
    return (
        <div className="App">
            <Header/>
            <Aside/>
            <div>
            <main className="content">
                <div className="main-form2">
                    <form className="add" onSubmit={addTestfield}>
                        <p>Добавить полигон: </p>
                        <input type="text" size="15" onChange={(e) => setName(e.target.value)}/>
                    </form>
                    {testfield?.map((props) => <div>
                        <TestField props={props}/>
                    </div>)}
                </div>
            </main>
            </div>
            {/*<div className="main">*/}
            {/*    {testfield?.map((props) => <div>*/}
            {/*        <TestField props={props}/>*/}
            {/*    </div>)}*/}
            {/*</div>*/}

        </div>
    );
};

export default TestFields;