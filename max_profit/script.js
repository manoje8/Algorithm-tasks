let inputUnit = document.getElementById('unit')
let result = document.getElementById('result')
let error = document.createElement('p');

let building = [5, 4, 10]
let earningsPerUnit  = [1500, 1000, 3000]

function handleClick() {
    result.style.backgroundColor = "cornflowerblue";
    let timeUnit = +inputUnit.value;
    let validation = inputValidation(timeUnit);

    if (!validation) {
        return;
    }

    // Clear previous results
    error.innerHTML = "";
    result.innerHTML = "";

    let data = findMax(timeUnit);
    displayResult(data);

    // Reset input fields
    inputUnit.value = '';
}

function findMax(unit) {
    let data = [
        { name: 'T', counts: 0, totalEarnings: 0 },
        { name: 'P', counts: 0, totalEarnings: 0 },
        { name: 'C', counts: 0, totalEarnings: 0 },
    ];

    for (let i = 0; i < building.length; i++) {
        let remainingUnits = unit;

        while (remainingUnits >= building[i]) {
            remainingUnits -= building[i];
            data[i].counts++;
            data[i].totalEarnings += earningsPerUnit[i] * remainingUnits;
        }
        
    }

    return data;
}

function displayResult(data) {
    let maxVal = data.reduce((acc, val) => Math.max(acc, val.totalEarnings), 0);

    let maxEarningText = `Earnings $${maxVal}`;
    let maxEarning = document.createElement("strong");
    maxEarning.innerHTML = maxEarningText;
    result.append(maxEarning);

    data.forEach(val => {
        if (val.totalEarnings === maxVal) {
            let temp = `T: ${val.name === 'T' ? val.counts : 0} P: ${val.name === 'P' ? val.counts : 0} C: ${val.name === 'C' ? val.counts : 0}`;
            let p = document.createElement('p');
            p.innerHTML = temp;
            result.appendChild(p);
        }
    });
}

function inputValidation(unit) {
    if (!unit || isNaN(unit)) {
        error.innerHTML = "Please enter a valid input";
        result.append(error);
        return false;
    }
    return true;
}
