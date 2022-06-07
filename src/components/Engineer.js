import React from 'react';
import '../style/style.css';

const Engineer = (props) => {
    return (
        <div className="container">
            <p>{props.props.id}</p>
            <p>{props.props.lastName}</p>
            <p>{props.props.firstName}</p>
            <p>{props.props.patronymic}</p>
            <p>Категория: {props.props.category_name}</p>
        </div>
    );
};

export default Engineer;