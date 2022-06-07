import React, {useEffect, useState} from 'react';
import Stage from "../components/Stage";
import '../style/style.css';
import Header from "../components/Header";

const Stages = () => {
    const [name, setName] = useState('')
    const [stages, setStages] = useState([])
    async function getStages() {
        const response = await fetch('http://localhost:8080/stage', {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        let data = await response.json()
        setStages(data)
        console.log(data)
    }
    async function addStage(event) {
        const response = await fetch('http://localhost:8080/stage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'name': name})
        })
        console.log(response.data)
    }
    useEffect(() => {
        getStages()
        console.log(stages)
    }, [])
    return (
        <div>
            <div className="main">
                <Header/>
                <form onSubmit={addStage} className='form'>
                    <p>Добавить стадию: </p>
                    <input type="text" size="15" onChange={(e) => setName(e.target.value)}/>
                </form>
            </div>
            {stages?.map((stage) => <Stage stage={stage}/>)}
        </div>
    );
};

export default Stages;