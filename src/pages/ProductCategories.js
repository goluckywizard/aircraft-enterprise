import React, {useEffect, useState} from 'react';
import '../style/style.css';
import Aside from "../components/Aside";
import Department from "../components/Department";
import EmplAttribute from "../components/EmplAttribute";
import EmplCategory from "../components/EmplCategory";
import ProdCategory from "../components/ProdCategory";
import {RemoveAuth} from "./LoginPage";
import Header from "../components/Header";

const ProductCategories = () => {
    const [name, setName] = useState('')
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
    async function addCategory(event) {
        let token = localStorage.getItem('token')
        const response = await fetch('http://localhost:8080/product-category', {
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
        console.log(response.data)
    }
    useEffect(() => {
        getCategories()
        console.log(categories)
    }, [])

    return (
        <div className="App">
            <Header/>
            <Aside/>
            <div>
            <main className="content">
                <div className="main-form2">
                    <form className="add" onSubmit={addCategory}>
                        <p>Добавить категорию: </p>
                        <input type="text" size="15" onChange={(e) => setName(e.target.value)}/>
                    </form>
                    {categories?.map((props) => <ProdCategory props={props}/>)}
                </div>
            </main>
                </div>
            {/*<div className="main">*/}
            {/*    {categories?.map((props) => <ProdCategory props={props}/>)}*/}
            {/*</div>*/}
        </div>
    );
};

export default ProductCategories;