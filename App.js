import React, { useState, useEffect } from 'react';
import { buildingTypes } from './utils/data';
import StepTable from './components/StepTable';
import ResourceDisplay from './components/ResourceDisplay';
import { calculateStepCost, calculateStepProduction } from './utils/calculations';

const App = () => {
    const [resources, setResources] = useState({ coin: 0, supply: 0 });
    const [steps, setSteps] = useState([initializeStepBuildingAmounts()]);
    const [totalResources, setTotalResources] = useState({ coin: 0, supply: 0 });

    // Load data from local storage on component mount
    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem('appData'));
        if (savedData) {
            setResources(savedData.resources);
            setSteps(savedData.steps);
            setTotalResources(savedData.totalResources);
        }
    }, []);

    // Save data to local storage whenever resources, steps, or totalResources change
    useEffect(() => {
        const appData = { resources, steps, totalResources };
        localStorage.setItem('appData', JSON.stringify(appData));
    }, [resources, steps, totalResources]);

    const handleBuildingAmountChange = (stepIndex, buildingType, buildingIndex, amount) => {
        setSteps((prevSteps) => {
            const updatedSteps = [...prevSteps];
            const updatedStep = { ...updatedSteps[stepIndex] };
            updatedStep[buildingType] = updatedStep[buildingType] || [];
            updatedStep[buildingType][buildingIndex] = amount;
            updatedSteps[stepIndex] = updatedStep;

            // Update totalResources based on the changes in this step
            const stepCost = calculateStepCost(updatedStep);
            const stepProduction = calculateStepProduction(updatedStep);
            const newTotalResources = {
                coin: totalResources.coin - stepCost.coin + stepProduction.coin,
                supply: totalResources.supply - stepCost.supply + stepProduction.supply,
            };
            setTotalResources(newTotalResources);

            return updatedSteps;
        });
    };

    const addNewStep = () => {
        setSteps((prevSteps) => [...prevSteps, initializeStepBuildingAmounts()]);
        // Update totalResources based on the new step
        const newStep = initializeStepBuildingAmounts();
        const stepCost = calculateStepCost(newStep);
        const stepProduction = calculateStepProduction(newStep);
        const newTotalResources = {
            coin: totalResources.coin - stepCost.coin + stepProduction.coin,
            supply: totalResources.supply - stepCost.supply + stepProduction.supply,
        };
        setTotalResources(newTotalResources);
    };




    const handleResourceChange = (resourceType, value) => {
        setResources((prevResources) => ({
            ...prevResources,
            [resourceType]: value,
        }));
        setTotalResources((prevTotalResources) => ({
            ...prevTotalResources,
            [resourceType]: value,
        }));
    };

    return (
        <div>
            <div>
                <h3>Initial Resources</h3>
                <div>
                    <input
                        type="number"
                        value={resources.coin}
                        onChange={(e) => handleResourceChange('coin', parseInt(e.target.value, 10))}
                    />
                    <span>Coin</span>
                </div>
                <div>
                    <input
                        type="number"
                        value={resources.supply}
                        onChange={(e) => handleResourceChange('supply', parseInt(e.target.value, 10))}
                    />
                    <span>Supply</span>
                </div>
            </div>
            <div>
                <h3>Total Resources</h3>
                <ResourceDisplay label="Coin" value={totalResources.coin} />
                <ResourceDisplay label="Supply" value={totalResources.supply} />
            </div>
            {steps.map((step, index) => (
                <StepTable
                    key={index}
                    step={index + 1}
                    buildingAmounts={step}
                    onBuildingAmountChange={handleBuildingAmountChange}
                />
            ))}
            <button onClick={addNewStep}>Add New Step</button>
        </div>
    );
};

const initializeStepBuildingAmounts = () => {
    const initialBuildingAmounts = {};
    Object.keys(buildingTypes).forEach((buildingType) => {
        initialBuildingAmounts[buildingType] = buildingTypes[buildingType]
            ? buildingTypes[buildingType].map(() => 0)
            : [];
    });
    return initialBuildingAmounts;
};

export default App;