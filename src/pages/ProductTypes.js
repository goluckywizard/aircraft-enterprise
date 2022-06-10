import React, {useEffect, useState} from 'react';
import '../style/style.css';
import Aside from "../components/Aside";
import Department from "../components/Department";
import ProdCategory from "../components/ProdCategory";
import ProdType from "../components/ProdType";
import {RemoveAuth} from "./LoginPage";
import Header from "../components/Header";

const ProductTypes = () => {
    const [name, setName] = useState('')
    const [categoryId, setCategoryId] = useState(0)
    const [types, setTypes] = useState([])
    const [categories, setCategories] = useState([])

    async function getCategories() {
        let token = localStorage.getItem('token')
        const response = await fetch('http://localhost:8080/product-category', {
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
    async function getTypes() {
        let token = localStorage.getItem('token')
        const response = await fetch('http://localhost:8080/product-type', {
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            }
        })
        if (response.status === 401) {
            RemoveAuth()
        }
        let data = await response.json()
        setTypes(data)
        console.log(data)
    }
    async function addType(event) {
        let token = localStorage.getItem('token')
        const response = await fetch('http://localhost:8080/product-type', {
            method: 'POST',
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'name': name, 'category_id': categoryId})
        })
        if (response.status === 401) {
            RemoveAuth()
        }
        //console.log(response.data)
    }
    useEffect(() => {
        getTypes()
        getCategories()
        console.log(categories)
        console.log(types)
    }, [])
    return (
        <div className="App">
            <Header/>
            <Aside/>
            <div>
                <main className="content">
                    <div className="main-form2">
                        <form className="add" onSubmit={addType}>
                            <p>Добавить тип продукта: </p>
                            <input type="text" size="15" onChange={(e) => setName(e.target.value)}/>
                            <select onChange={(e) => setCategoryId(e.target.value)}>
                                {categories?.map((category) => {
                                    return <option value={category.id}>{category.name}</option>
                                })}
                            </select>
                        </form>
                        {types?.map((props) => <ProdType props={props} categories={categories}/>)}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ProductTypes;