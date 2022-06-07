import React from 'react';
import '../style/style.css';

const Department = (props) => {
    return (
        <div className="container">
            <p>{props.props.id}</p>
            <p>{props.props.name}</p>
            <p>Мануфактура: {props.props.manufactureName}</p>
        </div>
    );
};

export default Department;