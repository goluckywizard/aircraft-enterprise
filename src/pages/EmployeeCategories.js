import React, {useEffect, useState} from 'react';
import '../style/style.css';
import Header from "../components/Header";
import Manufacture from "../components/Manufacture";
import EmplCategory from "../components/EmplCategory";

const EmployeeCategories = () => {
    const [name, setName] = useState('')
    const [categories, setCategories] = useState([])
    async function getCategories() {
        const response = await fetch('http://localhost:8080/employee-category', {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        let data = await response.json()
        setCategories(data)
        console.log(data)
    }
    async function addCategory(event) {
        const response = await fetch('http://localhost:8080/employee-category', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'name': name})
        })
        console.log(response.data)
    }
    useEffect(() => {
        getCategories()
        console.log(categories)
    }, [])

    return (
        <div>
            <Header/>
            <form onSubmit={addCategory}>
                <p>Добавить категорию: </p>
                <input type="text" size="15" onChange={(e) => setName(e.target.value)}/>
            </form>
            <div className="main">
                {categories?.map((props) => <div>
                    <EmplCategory props={props}/>
                </div>)}
            </div>
        </div>
    );
};

export default EmployeeCategories;