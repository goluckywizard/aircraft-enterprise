import React, {useEffect, useState} from 'react';
import '../style/style.css';
import Aside from "../components/Aside";
import Engineer from "../components/Engineer";
import Product from "../components/Product";
import {RemoveAuth} from "./LoginPage";
import Header from "../components/Header";

const Products = () => {
    const [page, setPage] = useState(0)
    const count = 10
    const [typeId, setTypeId] = useState(0)
    const [categoryId, setCategoryId] = useState(0)
    const [types, setTypes] = useState([])
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    function incrementPage() {
        getProducts(typeId, page+1)
        setPage(page+1)
    }
    function decrementPage() {
        getProducts(typeId, page-1)
        setPage(page-1)
    }

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
    async function getTypes(category) {
        let token = localStorage.getItem('token')
        const response = await fetch('http://localhost:8080/product-type/'+category, {
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
    async function getProducts(type, page) {
        let token = localStorage.getItem('token')
        const response = await fetch('http://localhost:8080/product/type/'+type+'/'+page+'/'+count, {
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            }
        })
        if (response.status === 401) {
            RemoveAuth()
        }
        let data = await response.json()
        setProducts(data)
        console.log(data)
    }
    async function addProduct(event) {
        let token = localStorage.getItem('token')
        event.preventDefault()
        const response = await fetch('http://localhost:8080/product', {
            method: 'POST',
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'type_id': typeId})
        })
        if (response.status === 401) {
            RemoveAuth()
        }
        console.log(response.data)
    }
    async function deleteProduct(id) {
        let token = localStorage.getItem('token')
        const response = await fetch('http://localhost:8080/product', {
            method: 'DELETE',
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
            body: id
        })
        if (response.status === 401) {
            RemoveAuth()
        }

        console.log(response.data)
    }
    useEffect(() => {
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
                        <form className="add" onSubmit={addProduct}>
                            <p>Добавить продукт: </p>
                            <select defaultValue="DEFAULT" id="mySelect2" onChange={(e) => {
                                setCategoryId(e.target.value)
                                getTypes(e.target.value)
                            }}>
                                <option value="DEFAULT" disabled>Choose a category</option>
                                {categories?.map((category) => {
                                    return <option value={category.id}>{category.name}</option>
                                })}
                            </select>
                            <select defaultValue={'DEFAULT'}  onChange={(e) => {
                                setTypeId(e.target.value)
                                setPage(0)
                                getProducts(e.target.value, 0)
                            }}>
                                <option value="DEFAULT" disabled>Choose a type</option>
                                {types?.map((type) => <option value={type.id}>{type.name}</option>)}
                            </select>
                            <button className="btn2" className="btn2" type="submit">Добавить</button>
                        </form>
                        {products?.map((props) => <Product props={props} delete={deleteProduct}/>)}
                    </div>
                    <div>
                        <p>Страница: {page}</p>
                        {page !== 0 ? <button className="btn2" onClick={decrementPage}>Предыдущая</button> : <div/>}

                        <button className="btn2" onClick={incrementPage}>Следующая</button>
                    </div>
                </main>

            </div>
            {/*<div>*/}
            {/*    <p>Страница: {page}</p>*/}
            {/*    {page !== 0 ? <button onClick={decrementPage}>Предыдущая</button> : <div/>}*/}

            {/*    <button onClick={incrementPage}>Следующая</button>*/}
            {/*</div>*/}
        </div>
    );
};

export default Products;