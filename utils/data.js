// Initial resources
export const initialResources = {
    coin: 0,
    supply: 0,
};

// Building data
export const buildingTypes = {
    residential: [
        {
            name: 'Roof Tile House',
            coinCost: 2500,
            population: 50,
            coinProduction: 6250,
            productionInterval: 1, // in hours
        },
        {
            name: 'Cottage',
            coinCost: 6250,
            supplyCost: 25000,
            population: 100,
            coinProduction: 12500,
            productionInterval: 1,
        },
        {
            name: 'Villa',
            coinCost: 25000,
            supplyCost: 100000,
            population: 150,
            coinProduction: 25000,
            productionInterval: 1,
        },
    ],
    production: [
        {
            name: 'Butcher',
            coinCost: 2500,
            supplyProduction: 6250,
            productionInterval: 1,
        },
        {
            name: 'Tailor',
            coinCost: 6250,
            supplyCost: 25000,
            supplyProduction: 12500,
            productionInterval: 1,
        },
        {
            name: 'Goat Farm',
            coinCost: 200000,
            supplyCost: 50000,
            supplyProduction: 43750,
            productionInterval: 1,
        },
    ],
};