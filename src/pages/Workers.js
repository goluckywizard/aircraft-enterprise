import React, {useEffect, useState} from 'react';
import '../style/style.css';
import Header from "../components/Header";
import Engineer from "../components/Engineer";
import Worker from "../components/Worker";

const Workers = () => {
    const [lastName, setLastName] = useState('')
    const [firstName, setFirstName] = useState('')
    const [patronymic, setPatronymic] = useState('')

    const [categoryId, setCategoryId] = useState(0)
    const [brigadeId, setBrigadeId] = useState(0)
    const [workers, setWorkers] = useState([])
    const [categories, setCategories] = useState([])
    const [brigades, setBrigades] = useState([])

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
    async function getWorkers() {
        const response = await fetch('http://localhost:8080/worker', {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        let data = await response.json()
        setWorkers(data)
        console.log(data)
    }
    async function addWorker(event) {
        const response = await fetch('http://localhost:8080/worker', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'lastName': lastName, 'firstName': firstName, 'patronymic': patronymic, 'category_id': categoryId, 'brigade_id': brigadeId})
        })
        console.log(response.data)
    }
    useEffect(() => {
        getWorkers()
        getCategories()
        getBrigades()
        console.log(categories)
        console.log(workers)
    }, [])
    return (
        <div>
            <Header/>
            <div>
                <form className="form" onSubmit={addWorker}>
                    <p>Добавить работника: </p>
                    <input type="text" size="15" placeholder="Введите фамилию" onChange={(e) => setLastName(e.target.value)}/>
                    <input type="text" size="15" placeholder="Введите имя" onChange={(e) => setFirstName(e.target.value)}/>
                    <input type="text" size="15" placeholder="Введите отчество" onChange={(e) => setPatronymic(e.target.value)}/>
                    <select onChange={(e) => setCategoryId(e.target.value)}>
                        {categories?.map((category) => {
                            return <option value={category.id}>{category.name}</option>
                        })}
                    </select>
                    <select onChange={(e) => setBrigadeId(e.target.value)}>
                        {brigades?.map((brigade) => {
                            return <option value={brigade.id}>{brigade.name}</option>
                        })}
                    </select>
                    <button type="submit">Submit</button>
                </form>
                {workers?.map((props) => <Worker props={props}/>)}
            </div>
        </div>
    );
};

export default Workers;