import React from 'react';
import '../style/style.css';

const Stage = (stage) => {
    console.log(stage)
    return (
        <div className="container">
            <p>{stage.stage.id}</p>
            <p>{stage.stage.name}</p>
        </div>
    );
};

export default Stage;