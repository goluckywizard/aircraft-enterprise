import React from 'react';
import {Link} from "react-router-dom";
import {useState} from "react";

const ResetPassword = () => {
    const [password, setPassword] = useState('')
    const [token, setToken] = useState('')
    const [mail, setMail] = useState('')

    async function recover(event) {
        event.preventDefault()
        const response = await fetch('http://localhost:8080/resetPassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: mail,
        })
        if (response.status === 200) {
            alert('Sent message on your mail')
        } else {
            alert('Please check your username')
        }
    }

    async function change(event) {
        console.log({"token": token, "password": password})
        event.preventDefault()
        const response = await fetch('http://localhost:8080/resetPassword/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'token': token, 'password': password}),
        })
        if (response.status === 200) {
            alert('Password changed')
            window.location.href = '/login'
        } else {
            alert('Incorrect data')
        }
    }
    return (
        <div>
            <main className="main-content">
                <form className="main-form" onSubmit={(e) => change(e)}>
                    <input className="reg-input" type="text" size="15" onChange={(e)=>setMail(e.target.value)}/>
                    <button className="btn" onClick={recover}>Recover password</button>
                    <input className="reg-input" type="password" size="15" onChange={(e)=>setPassword(e.target.value)}/>
                    <input className="reg-input" placeholder="Вставьте токен из почты" type="text" size="15" onChange={(e)=>setToken(e.target.value)}/>
                    <button className="btn" type="submit">Change password</button>
                </form>
            </main>
        </div>
    );
};

export default ResetPassword;