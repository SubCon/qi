import { buildingTypes } from './data';

// Calculate the resource cost for a single building
export const calculateBuildingCost = (buildingType, amount) => {
    const { coinCost = 0, supplyCost = 0 } = buildingType;
    return {
        coin: coinCost * amount,
        supply: supplyCost * amount,
    };
};

// Calculate the resource production for a single building
export const calculateBuildingProduction = (buildingType, amount) => {
    const { coinProduction = 0, supplyProduction = 0, productionInterval = 1 } = buildingType;
    return {
        coin: (coinProduction * amount) / productionInterval,
        supply: (supplyProduction * amount) / productionInterval,
    };
};

// Calculate the total resource cost for a step
export const calculateStepCost = (buildingAmounts) => {
    let totalCost = { coin: 0, supply: 0 };

    Object.entries(buildingAmounts).forEach(([buildingType, amounts]) => {
        const buildings = buildingTypes[buildingType];
        buildings.forEach((building, index) => {
            const buildingCost = calculateBuildingCost(building, amounts[index]);
            totalCost.coin += buildingCost.coin;
            totalCost.supply += buildingCost.supply;
        });
    });

    return totalCost;
};

// Calculate the total resource production for a step
export const calculateStepProduction = (buildingAmounts) => {
    let totalProduction = { coin: 0, supply: 0 };

    Object.entries(buildingAmounts).forEach(([buildingType, amounts]) => {
        const buildings = buildingTypes[buildingType];
        buildings.forEach((building, index) => {
            const buildingProduction = calculateBuildingProduction(building, amounts[index]);
            totalProduction.coin += buildingProduction.coin;
            totalProduction.supply += buildingProduction.supply;
        });
    });

    return totalProduction;
};