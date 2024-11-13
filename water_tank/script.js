let container = document.getElementById('container');
let graph = document.getElementById('graph-container');

function handleSubmit() {
    let userInput = document.getElementById('userInput');
    let inputArr = userInput.value.split(/[\s, ]+/).map(Number);
    validation(inputArr);
}

function validation(arr) {
    let validation = document.getElementById('input-validation');
    let p = document.getElementById('error') || document.createElement('p');
    
    let filterArr = arr.some(isNaN);
    

    if (filterArr) {
        p.innerText = "Error: Invalid Input";
    } else {
        p.innerText = "";
        graph.innerHTML = ""; // Clear previous graph
        
        let res = createGraph(arr, true);
        p.innerText = `Trapped Water: ${res} Units`;
        createGraph(arr, false)
    }
    validation.append(p);
}

function createGraph(arr, showWalls) {
    let dimension = 300;
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", dimension);
    svg.setAttribute("height", dimension);
    svg.style.border = "1px solid #111";
    graph.append(svg);
    
    let left = 0, right = arr.length - 1;
    let leftMax = -1, rightMax = -1;
    let water = 0;

    while (left <= right) 
    {
        leftMax = Math.max(leftMax, arr[left]);
        rightMax = Math.max(rightMax, arr[right]);

        if (leftMax > rightMax) 
        {
            water += Math.max(0, rightMax - arr[right]);
            populateGraph(arr, Math.max(0, rightMax - arr[right]), right, 'water', svg);
            if (showWalls && arr[right] > 0) 
            {
                populateGraph(arr, arr[right], right, 'wall', svg);
            }
            right--;
        } else 
        {
            water += Math.max(0, leftMax - arr[left]);
            populateGraph(arr, Math.max(0, leftMax - arr[left]), left, 'water', svg);
            if (showWalls && arr[left] > 0) 
            {
                populateGraph(arr, arr[left], left, 'wall', svg);
            }
            left++;
        }
    }

    addGridLines(svg, arr.length, dimension);

    return water;
}

function populateGraph(arr, box, index, contain, svg) 
{
    let color = contain === 'water' ? 'rgb(97, 231, 255)' : 'rgb(255, 252, 60)';
    let dimension = 300;
    let width = dimension / arr.length;
    let boxHeight = box * 30; // Adjusted scaling factor

    // Calculate y position based on whether it's water or wall
    let yPosition;
    if (contain === 'water') 
    {
        let wallHeight = arr[index] * 30;
        yPosition = dimension - wallHeight - boxHeight;
    } else 
    {
        yPosition = dimension - boxHeight;
    }

    // Create the rectangle element
    let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", index * width);
    rect.setAttribute("y", yPosition);
    rect.setAttribute("width", width);
    rect.setAttribute("height", boxHeight);
    rect.setAttribute("fill", color);
    svg.append(rect);
}


function addGridLines(svg, numCols, dimension) {
    let numRows = 10;
    let cellWidth = dimension / numCols;
    let cellHeight = dimension / numRows;

    // Draw horizontal grid lines
    for (let i = 0; i <= numRows; i++) {
        let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", 0);
        line.setAttribute("y1", i * cellHeight);
        line.setAttribute("x2", dimension);
        line.setAttribute("y2", i * cellHeight);
        line.setAttribute("stroke", "#111");
        line.setAttribute("stroke-width", 0.5);
        svg.appendChild(line); // Append grid line to SVG
    }

    // Draw vertical grid lines
    for (let i = 0; i <= numCols; i++) {
        let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", i * cellWidth);
        line.setAttribute("y1", 0);
        line.setAttribute("x2", i * cellWidth);
        line.setAttribute("y2", dimension);
        line.setAttribute("stroke", "#111");
        line.setAttribute("stroke-width", 0.5);
        svg.appendChild(line); // Append grid line to SVG
    }
}