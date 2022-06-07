import React from 'react';
import '../style/style.css';

const Brigade = (props) => {
    console.log(props)
    return (
        <div className="container">
            <p>{props.props.id}</p>
            <p>{props.props.name}</p>
        </div>
    );
};

export default Brigade;