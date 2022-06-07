import React from 'react';
import '../style/style.css';

const TestEquip = (props) => {
    return (
        <div className="container">
            <p>{props.props.id}</p>
            <p>{props.props.name}</p>
            <p>Полигон: {props.props.field.name}</p>
        </div>
    );
};

export default TestEquip;