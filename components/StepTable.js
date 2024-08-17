import React from 'react';
import { buildingTypes } from '../utils/data';
import { calculateStepCost, calculateStepProduction } from '../utils/calculations';
import BuildingInput from './BuildingInput';
import ResourceDisplay from './ResourceDisplay';

const StepTable = ({ step, buildingAmounts, onBuildingAmountChange }) => {
    const stepCost = calculateStepCost(buildingAmounts);
    const stepProduction = calculateStepProduction(buildingAmounts);

    const handleBuildingChange = (buildingType, buildingIndex, amount) => {
        onBuildingAmountChange(step - 1, buildingType, buildingIndex, amount);
    };

    return (
        <div>
            <h3>Step {step}</h3>
            <div>
                {Object.entries(buildingTypes).map(([type, buildings]) => (
                    <div key={type}>
                        <h4>{type}</h4>
                        {buildings.map((building, index) => (
                            <BuildingInput
                                key={building.name}
                                building={building}
                                amount={buildingAmounts[type]?.[index] || 0}
                                onChange={(building, amount) =>
                                    handleBuildingChange(type, index, amount)
                                }
                            />
                        ))}
                    </div>
                ))}
            </div>
            <div>
                <ResourceDisplay label="Step Cost" value={`Coin: ${stepCost.coin}, Supply: ${stepCost.supply}`} />
                <ResourceDisplay
                    label="Step Production"
                    value={`Coin: ${stepProduction.coin}, Supply: ${stepProduction.supply}`}
                />
            </div>
        </div>
    );
};

export default StepTable;