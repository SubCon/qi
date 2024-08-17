import React from 'react';

const ResourceDisplay = ({ label, value }) => {
    return (
        <div>
            <span>{label}:</span>
            <span>{value}</span>
        </div>
    );
};

export default ResourceDisplay;