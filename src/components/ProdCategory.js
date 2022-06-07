import React from 'react';

const ProdCategory = (props) => {
    return (
        <div className="container">
            <p>{props.props.id}</p>
            <p>{props.props.name}</p>
        </div>
    );
};

export default ProdCategory;