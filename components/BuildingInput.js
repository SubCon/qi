import React from 'react';

const BuildingInput = ({ building, amount, onChange }) => {
    const handleChange = (event) => {
        const newAmount = parseInt(event.target.value, 10) || 0;
        onChange(building, newAmount);
    };

    const handleIncrement = () => {
        onChange(building, amount + 1);
    };

    const handleDecrement = () => {
        onChange(building, Math.max(amount - 1, 0));
    };

    return (
        <div>
            <button onClick={handleDecrement}>-</button>
            <input
                type="number"
                value={amount}
                onChange={handleChange}
                min={0}
            />
            <button onClick={handleIncrement}>+</button>
            <span>{building.name}</span>
        </div>
    );
};

export default BuildingInput;