import React from 'react';

const EmplCategory = (props) => {
    return (
        <div className="container">
            <p>{props.props.id}</p>
            <p>{props.props.name}</p>
        </div>
    );
};

export default EmplCategory;