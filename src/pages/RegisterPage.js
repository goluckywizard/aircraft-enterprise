import React, {useEffect, useState} from 'react';
import '../style/style.css';
import {Link} from "react-router-dom";

const RegisterPage = () => {
    const [passwordConfirm, setpasswordConfirm] = useState('')
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')

    async function registerUser(event) {
        event.preventDefault()

        const response = await fetch('http://localhost:8080/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                mail,
                password,
                passwordConfirm,
            }),
        })
        console.log(response)
        const data = response.status

        if (data === 200) {
            alert('Registration successful')
            window.location.href = '/login'
        } else {
            alert('Некорректные данные')
        }
    }

    return (
        <div className="main-content">
            <form className="main-form" onSubmit={registerUser}>
                <div>
                    <div className="block">
                        <p>Почта:</p>
                        <input type="text" size="15" value={mail} placeholder="Mail"
                               onChange={(e) => setMail(e.target.value)}></input>
                    </div>
                    <div className="block">
                        <p>Пароль:</p>
                        <input type="password" size="16" placeholder="Password" value={password}
                               onChange={(e) => setPassword(e.target.value)}></input>
                    </div>
                    <div className="block">
                        <p>Повторите пароль:</p>
                        <input type="password" size="16" placeholder="Password" value={passwordConfirm}
                               onChange={(e) => setpasswordConfirm(e.target.value)}></input>
                    </div>
                    <div className="block">
                        <div className="reg-block">
                        <button className="btn" type="submit">Зарегистрироваться</button>
                        <Link to="/login" className="fon_window_center">
                            <a className="button_in3" href="/">Назад</a>
                        </Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;