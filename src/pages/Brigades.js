import React, {useEffect, useState} from 'react';
import '../style/style.css';
import Header from "../components/Header";
import Manufacture from "../components/Manufacture";
import Brigade from "../components/Brigade";

const Brigades = () => {
    const [name, setName] = useState('')
    const [brigades, setBrigades] = useState([])
    async function getBrigades() {
        const response = await fetch('http://localhost:8080/brigade', {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        let data = await response.json()
        setBrigades(data)
        console.log(data)
    }
    async function addBrigade(event) {
        const response = await fetch('http://localhost:8080/brigade', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'name': name})
        })
        console.log(response.data)
    }
    useEffect(() => {
        getBrigades()
        console.log(brigades)
    }, [])
    return (
        <div className="main">
            <Header/>
            <form onSubmit={addBrigade}>
                <p>Добавить бригаду: </p>
                <input type="text" size="15" onChange={(e) => setName(e.target.value)}/>
                <button type="submit">Submit</button>
            </form>
            {brigades?.map((props) => <Brigade props={props}/>)}

        </div>
    );
};

export default Brigades;