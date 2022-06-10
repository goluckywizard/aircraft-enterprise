import React from 'react';
import {RemoveAuth} from "../pages/LoginPage";

const Product = (props) => {
    async function deleteProduct() {
        let token = localStorage.getItem('token')
        const response = await fetch('http://localhost:8080/product', {
            method: 'DELETE',
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
            body: props.props.id
        })
        if (response.status === 401) {
            RemoveAuth()
        }
        console.log(response.data)
    }
    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" }
        const timestamp = new Date(dateString)
        return (new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp))
    }
    const formatTime = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" }
    }
    return (
        <div className="container">
            <p>{props.props.id}</p>
            <p>{props.props.type.name}</p>
            <p>{props.props.category.name}</p>
            <p>{formatDate(props.props.date)}</p>
            {/*<p>Категория: {props.props.category_name}</p>*/}
            <button className="btn2" onClick={deleteProduct}>Удалить</button>
        </div>
    );
};

export default Product;