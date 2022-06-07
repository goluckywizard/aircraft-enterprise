import React from 'react';

const ProdAttribute = (props) => {
    return (
        <div className="container">
            <p>{props.props.attribute}</p>
            <p>{props.props.value}</p>
        </div>
    );
};

export default ProdAttribute;