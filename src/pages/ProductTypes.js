import React, {useEffect, useState} from 'react';
import '../style/style.css';
import Header from "../components/Header";
import Department from "../components/Department";
import ProdCategory from "../components/ProdCategory";
import ProdType from "../components/ProdType";

const ProductTypes = () => {
    const [name, setName] = useState('')
    const [categoryId, setCategoryId] = useState(0)
    const [types, setTypes] = useState([])
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
    async function getTypes() {
        const response = await fetch('http://localhost:8080/product-type', {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        let data = await response.json()
        setTypes(data)
        console.log(data)
    }
    async function addType(event) {
        const response = await fetch('http://localhost:8080/product-type', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'name': name, 'category_id': categoryId})
        })
        //console.log(response.data)
    }
    useEffect(() => {
        getTypes()
        getCategories()
        console.log(categories)
        console.log(types)
    }, [])
    return (
        <div>
            <Header/>
            <div>
                <form className="form" onSubmit={addType}>
                    <p>Добавить тип продукта: </p>
                    <input type="text" size="15" onChange={(e) => setName(e.target.value)}/>
                    <select onChange={(e) => setCategoryId(e.target.value)}>
                        {categories?.map((category) => {
                            return <option value={category.id}>{category.name}</option>
                        })}
                    </select>
                </form>
                {types?.map((props) => <ProdType props={props}/>)}
            </div>
        </div>
    );
};

export default ProductTypes;