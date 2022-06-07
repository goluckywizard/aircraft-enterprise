import React from 'react';

const EmplAttribute = (props) => {
    return (
        <div className="container">
            <p>{props.props.attribute}</p>
            <p>{props.props.value}</p>
        </div>
    );
};

export default EmplAttribute;