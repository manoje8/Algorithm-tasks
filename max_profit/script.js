let inputUnit = document.getElementById('unit')
let result = document.getElementById('result')
let error = document.createElement('p');

let building = [5, 4, 10 ]
let earnings  = [ 1500, 1000, 3000 ]


/**
 * Recursively find all possible combinations of buildings that maximize the profit.
 * @param {number} index - Current building index in the array
 * @param {number[]} buildings - Array of building sizes
 * @param {number[]} earnings - Array of earnings per unit for each building
 * @param {number} remainingUnits - Time units to be filled
 * @param {number[]} earningsResult - Array to hold the calculated earnings for each combination
 * @param {number[]} currentEarning - Tempoary Array to hold the each combination of earnings
 * @param {number[]} resultCombination - Array to store valid combinations
 * @param {number[]} currentCombination - Temporary array holding current building combination
 */

function findMaxProfit(index, buildings, earnings, remainingUnits, earningsResult, currentEarning, resultCombination, currentCombination)
{
    if(index === building.length)
    {
        resultCombination.push([...currentCombination]);
        earningsResult.push([...currentEarning])
        return;
    }

    if(buildings[index] <= remainingUnits)
    {
        currentCombination.push(buildings[index])
        let remaining   = remainingUnits-buildings[index]
        currentEarning.push(remaining *earnings[index])
        findMaxProfit(index, building, earnings, remaining , earningsResult, currentEarning, resultCombination, currentCombination)  
        currentEarning.pop()
        currentCombination.pop()
    }

    findMaxProfit(index+1, buildings, earnings, remainingUnits, earningsResult, currentEarning, resultCombination, currentCombination)
}


// Get the building type counts for each valid combination.
function getBuildingCounts(combinations)
{
    return combinations.map(combination => {
        let counts = { T: 0, P: 0, C: 0 };

        combination.forEach(building => {
            if (building === 5) counts.T++;
            else if (building === 4) counts.P++;
            else if (building === 10) counts.C++;
        })
        return counts;
    })
}


// Calculate total earnings for each combination.
function calculateTotalEarnings(earningsResults)
{
    return earningsResults.map(earnings => earnings.reduce((total, earnings) => total += earnings, 0))
}



// Find the index(es) of the maximum earnings.
function findMaxIndex(arr) {
    const maxValue = Math.max(...arr);

    createHeading(`Earning: $${maxValue}`)

    let dupIndex = []

    arr.forEach((val, i) => {
        if(val === maxValue)
        {
            dupIndex.push(i)
        }
    })

    return dupIndex; 
}


//Output the result
function displayResult(maxIndexes, buildingCount)
{
    maxIndexes.forEach(val => {
        let p = document.createElement('p');
        p.innerHTML = `T:${buildingCount[val].T} P:${buildingCount[val].P} C:${buildingCount[val].C}`;
        result.appendChild(p);
    })
}

// Input Validation
function inputValidation(unit) {
    if (!unit || isNaN(unit)) {
        result.innerHTML = ""
        error.innerHTML = "Please enter a valid input";
        result.append(error);
        return false;
    }
    return true;
}


// To create HTML (h3)heading
function createHeading(heading)
{
    let h3 = document.createElement('h3');
    h3.innerHTML = heading
    result.append(h3)
}


function handleClick() {
    result.style.backgroundColor = "rgb(43, 50, 56)";
    let timeUnit = +inputUnit.value;
    let validation = inputValidation(timeUnit);

    if (!validation) return;

    // Clear previous results
    error.innerHTML = "";
    result.innerHTML = "";
    
    createHeading(`Time unit: ${timeUnit}`)

    let allEarnings  = [];
    let allCombinations  = [];

    // Find all valid combinations and their earnings
    findMaxProfit(0, building, earnings, timeUnit, allEarnings, [], allCombinations, [])
    // Get the building type counts for the combinations
    const buildingCountForMax = getBuildingCounts(allCombinations)
    // Find the indices with the maximum profit
    let maxIndexes = findMaxIndex(calculateTotalEarnings(allEarnings));
    // Output the result
    displayResult(maxIndexes, buildingCountForMax)
    
    // Reset input fields
    inputUnit.value = '';
}