import React, {useEffect, useState} from 'react';
import '../style/style.css';
import Manufacture from "../components/Manufacture";
import Header from "../components/Header";

const Manufactures = () => {
    const [name, setName] = useState('')
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
    async function addManufacture(event) {
        const response = await fetch('http://localhost:8080/manufacture', {
            method: 'POST',
            headers: {
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
        <div className="main">
            <Header/>
            <form onSubmit={addManufacture}>
                <p>Добавить мануфактуру: </p>
                <input type="text" size="15" onChange={(e) => setName(e.target.value)}/>
            </form>
            <div className="main">
                {manufactures?.map((props) => <div>
                    <Manufacture props={props}/>
                </div>)}
            </div>

        </div>
    );
};

export default Manufactures;