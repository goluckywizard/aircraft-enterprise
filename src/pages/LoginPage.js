import React, {useEffect, useState} from 'react';
import '../style/style.css';
import history from '../components/history'
import {Link, useNavigate} from "react-router-dom";
import Header from "../components/Header";
import Aside from "../components/Aside";
const LoginPage = () => {
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    async function authorize(event) {
        event.preventDefault()
        const response = await fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                mail,
                password,
            }),
        })
        const data = await response.json()
        console.log(data.token)
        if (data) {
            localStorage.setItem('token', data.token)
            localStorage.setItem('email', mail)
            alert('Login successful')
            window.location.href = '/manufacture'
            console.log({
                mail: data.get('mail'),
                password: data.get('password'),
            });
        } else {
            alert('Please check your username and password')
        }
    }

    return (
        <div className="App">
            <Header/>
            <Aside/>
        <main className="main-content">
            <form className="main-form" onSubmit={(e) => authorize(e)}>
                <h1>Please, login or create yor account</h1>
                <input className="reg-input" type="text" size="15" onChange={(e)=>setMail(e.target.value)}/>
                <input className="reg-input" type="password" size="15" onChange={(e)=>setPassword(e.target.value)}/>
                {/*<input type="password" size="15" onChange={(e)=>setPasswordConfirm(e.target.value)}/>*/}
                <button className="btn" type="submit">Login</button>
                <Link to="/registration">
                    <p className="btn-sign">Sign in</p>
                </Link>
                <line className="line"></line>
            </form>
        </main>
        </div>
    );
};

export default LoginPage;

export const RemoveAuth = () => {
    localStorage.clear();
    history.push('/login')
    history.go('/login')
    /*let navigate = useNavigate();
    navigate("/login")*/
}