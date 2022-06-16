import React from 'react';
import Header from "../components/Header";
import Aside from "../components/Aside";
import Work from "../components/Work";
import {RemoveAuth} from "./LoginPage";
import {useEffect, useState} from "react";
import Product from "../components/Product";

const ProductToWorkPage = () => {
    const [workId, setWorkId] = useState(-1)
    const [productId, setProductId] = useState(-1)

    function handleOptionChange (changeEvent) {
        console.log(changeEvent.target.value)
        setProductId(changeEvent.target.value)
    }
    function handleWorkChange(changeEvent) {
        setWorkId(changeEvent.target.value)
    }

    const [page, setPage] = useState(0)
    const [works, setWorks] = useState([])
    const [products, setProducts] = useState([])
    const count = 10
    function incrementPage() {
        getProducts(page+1)
        setPage(page+1)
    }
    function decrementPage() {
        getProducts(page-1)
        setPage(page-1)
    }
    async function addProductToWork() {
            let token = localStorage.getItem('token')
            //event.preventDefault()
            const response = await fetch('http://localhost:8080/work/'+workId+'/'+productId, {
                method: 'POST',
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json'
                }
            })
            if (response.status === 401) {
                RemoveAuth()
            }
            console.log(response.data)
    }
    async function getWorks() {
        let token = localStorage.getItem('token')
        const response = await fetch('http://localhost:8080/work', {
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            }
        })
        if (response.status === 401) {
            RemoveAuth()
        }
        let data = await response.json()
        setWorks(data)
        console.log(data)
    }
    async function getProducts(page) {
        let token = localStorage.getItem('token')
        const response = await fetch('http://localhost:8080/product/all/'+page+'/'+count, {
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
    useEffect(() => {
        getWorks()
        getProducts(page)
    }, [])
    return (
        <div className="App">
            <Header/>
            <Aside/>
            <main className="content">
                <p>ID выбранной работы: {workId}</p>
                <p>ID выбранной продукта: {productId}</p>
                <button className="btn2" onClick={addProductToWork}>Добавить</button>
                <div className="main-form2">
                    <p>Работы: </p>
                    {works?.map((props) => <div className="radio-div">
                        <Work key={props.id} props={props}/>
                        <input type="radio" checked={props.id === productId} value={props.id} onChange={handleWorkChange}/>
                    </div>)}
                </div>
                <form>
                    <div className="main-form2">
                        <p>Продукты: </p>
                        {products?.map((props) => <div className="radio-div">
                            <Product key={props.id} props={props}/>
                            <input type="radio" checked={props.id === productId} value={props.id} onChange={handleOptionChange}/>
                        </div>)}
                        <p>Страница: {page}</p>
                        {page !== 0 ? <button className="btn2" onClick={decrementPage}>Предыдущая</button> : <div/>}
                        <button className="btn2" onClick={incrementPage}>Следующая</button>
                    </div>
                </form>

            </main>
        </div>
    );
};

export default ProductToWorkPage;