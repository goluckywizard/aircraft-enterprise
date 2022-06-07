import React, {useEffect, useState} from 'react';
import '../style/style.css';
import Header from "../components/Header";
import Department from "../components/Department";
import EmplAttribute from "../components/EmplAttribute";
import ProdAttribute from "../components/ProdAttribute";

const ProductAttributes = () => {
    const [attribute, setAttribute] = useState('')
    const [value, setValue] = useState('')
    const [categoryId, setCategoryId] = useState(0)
    const [attributes, setAttributes] = useState([])
    const [categories, setCategories] = useState([])

    async function getCategories() {
        const response = await fetch('http://localhost:8080/product-category', {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        let data = await response.json()
        setCategories(data)
        console.log(data)
    }
    async function getAttributes(id) {
        const response = await fetch('http://localhost:8080/product-attribute/'+id, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        let data = await response.json()
        setAttributes(data)
        console.log(data)
    }
    async function addAttribute(event) {
        const response = await fetch('http://localhost:8080/product-attribute', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'attribute': attribute, 'category_id': categoryId, 'value': value})
        })
        //console.log(response.data)
    }
    useEffect(() => {
        getCategories()
        console.log(categories)
        console.log(attributes)
    }, [])
    return (
        <div>
            <Header/>
            <div>
                <form className="form" onSubmit={addAttribute}>
                    <p>Добавить участок: </p>
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
                    <button type="submit">Submit</button>
                </form>
                {attributes?.map((props) => <ProdAttribute props={props}/>)}
            </div>
        </div>
    );
};

export default ProductAttributes;