import React, {useEffect, useState} from 'react';
import TestField from "../components/TestField";
import '../style/style.css';
import Header from "../components/Header";

const TestFields = () => {
    const [name, setName] = useState('')
    const [testfield, setTestfield] = useState([])
    async function getTestfields() {
        const response = await fetch('http://localhost:8080/testfield', {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        let data = await response.json()
        setTestfield(data)
        //console.log(data)
    }
    async function addTestfield(event) {
        const response = await fetch('http://localhost:8080/testfield', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'name': name})
        })
        //console.log(response.data)
    }
    useEffect(() => {
        getTestfields()
        console.log(testfield)
    }, [])
    return (
        <div className="main">
            <Header/>
            <form onSubmit={addTestfield}>
                <p>Добавить полигон: </p>
                <input type="text" size="15" onChange={(e) => setName(e.target.value)}/>
            </form>
            <div className="main">
                {testfield?.map((props) => <div>
                    <TestField props={props}/>
                </div>)}
            </div>

        </div>
    );
};

export default TestFields;