import React from 'react';

const ProdType = (props) => {
    return (
        <div className="container">
            <p>{props.props.id}</p>
            <p>{props.props.name}</p>
            <p>Категория: {props.props.category_name}</p>
        </div>
    );
};

export default ProdType;