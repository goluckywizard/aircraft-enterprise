import React, {useEffect, useState} from 'react';
import '../style/style.css';
import Aside from "../components/Aside";
import Department from "../components/Department";
import EmplAttribute from "../components/EmplAttribute";
import {RemoveAuth} from "./LoginPage";
import Header from "../components/Header";

const EmployeeAttributes = () => {
    const [attribute, setAttribute] = useState('')
    const [value, setValue] = useState('')
    const [categoryId, setCategoryId] = useState(0)
    const [attributes, setAttributes] = useState([])
    const [categories, setCategories] = useState([])

    async function getCategories() {
        let token = localStorage.getItem('token')
        const response = await fetch('http://localhost:8080/employee-category', {
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            }
        })
        if (response.status === 401) {
            RemoveAuth()
        }
        let data = await response.json()
        setCategories(data)
        console.log(data)
    }
    async function getAttributes(id) {
        let token = localStorage.getItem('token')
        const response = await fetch('http://localhost:8080/employee-attribute/'+id, {
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            }
        })
        if (response.status === 401) {
            RemoveAuth()
        }
        let data = await response.json()
        setAttributes(data)
        console.log(data)
    }
    async function addAttribute(event) {
        let token = localStorage.getItem('token')
        const response = await fetch('http://localhost:8080/employee-attribute', {
            method: 'POST',
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'attribute': attribute, 'category_id': categoryId, 'value': value})
        })
        if (response.status === 401) {
            RemoveAuth()
        }
        //console.log(response.data)
    }
    useEffect(() => {
        getCategories()
        console.log(categories)
        console.log(attributes)
    }, [])
    return (
        <div className="App">
            <Header/>
            <Aside/>
            <div>
                <main className="content">
                    <div className="main-form2">
                        <form className="add" onSubmit={addAttribute}>
                            <p>Добавить атрибут: </p>
                            <input type="text" size="15" placeholder="attribute" onChange={(e) => setAttribute(e.target.value)}/>
                            <input type="text" size="15" placeholder="value" onChange={(e) => setValue(e.target.value)}/>
                            <select id="categories" defaultValue="Select category" value={categoryId} onChange={(e) => {
                                setCategoryId(e.target.value)
                                /*console.log(e.target)
                                console.log(e.target.value)*/
                                getAttributes(e.target.value)
                            }}>
                                {categories?.map((category) => {
                                    return <option value={category.id}>{category.name}</option>
                                })}
                            </select>
                            <button className="btn2" type="submit">Добавить</button>
                        </form>
                        {attributes?.map((props) => <EmplAttribute props={props} categories={categories}/>)}
                    </div>
                </main>
                {/*{attributes?.map((props) => <EmplAttribute props={props} categories={categories}/>)}*/}
            </div>
        </div>
    );
};

export default EmployeeAttributes;