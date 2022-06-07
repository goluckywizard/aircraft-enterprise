import React, {useEffect, useState} from 'react';
import Header from "../components/Header";
import TestField from "../components/TestField";
import Engineer from "../components/Engineer";

const Engineers = () => {
    const [lastName, setLastName] = useState('')
    const [firstName, setFirstName] = useState('')
    const [patronymic, setPatronymic] = useState('')

    const [categoryId, setCategoryId] = useState(0)
    const [engineers, setEngineers] = useState([])
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
    async function getEngineers() {
        const response = await fetch('http://localhost:8080/engineer', {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        let data = await response.json()
        setEngineers(data)
        console.log(data)
    }
    async function addEngineer(event) {
        const response = await fetch('http://localhost:8080/engineer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'lastName': lastName, 'firstName': firstName, 'patronymic': patronymic, 'category_id': categoryId})
        })
        console.log(response.data)
    }
    useEffect(() => {
        getEngineers()
        getCategories()
        console.log(categories)
        console.log(engineers)
    }, [])
    return (
        <div>
            <Header/>
            <div>
                <form className="form" onSubmit={addEngineer}>
                    <p>Добавить работника: </p>
                    <input type="text" size="15" placeholder="Введите фамилию" onChange={(e) => setLastName(e.target.value)}/>
                    <input type="text" size="15" placeholder="Введите имя" onChange={(e) => setFirstName(e.target.value)}/>
                    <input type="text" size="15" placeholder="Введите отчество" onChange={(e) => setPatronymic(e.target.value)}/>
                    <select onChange={(e) => setCategoryId(e.target.value)}>
                        {categories?.map((category) => {
                            return <option value={category.id}>{category.name}</option>
                        })}
                    </select>
                    <button type="submit">Submit</button>
                </form>
                {engineers?.map((props) => <Engineer props={props}/>)}
            </div>
        </div>
    );
};

export default Engineers;