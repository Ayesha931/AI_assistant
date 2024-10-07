let userChoice = '';

function setUserChoice(choice) {
    userChoice = choice;
    document.getElementById('queryInput').style.display = 'block';
}

// async function submitQuery() {
//     const query = document.getElementById('queryInput').value;

//     if (!userChoice || !query) {
//         alert("Please select an option and enter a query.");
//         return;
//     }

//     const response = await fetch('/generate_response', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ choice: userChoice, query: query })
//     });

//     const data = await response.json();
//     document.getElementById('responseContainer').innerText = data.response;
// }

async function submitQuery() {
    const query = document.getElementById('userInput').value;

    if (!selectedTask || !query) {
        alert("Please select a task and enter a query.");
        return;
    }

    // Display processing message
    document.getElementById('responseBox').innerHTML = `<p>Processing your query: ${query}</p>`;

    // Connect with the API
    const response = await fetch('/generate_response', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ choice: selectedTask, query: query })
    });

    const data = await response.json();
    document.getElementById('responseBox').innerHTML = data.response;  // Use innerHTML instead of innerText
}

// async function submitQuery() {
//     const query = document.getElementById('userInput').value;

//     if (!selectedTask || !query) {
//         alert("Please select a task and enter a query.");
//         return;
//     }

//     // Display processing message
//     document.getElementById('responseBox').innerHTML = `<p>Processing your query: ${query}</p>`;

//     // Connect with the API
//     const response = await fetch('/generate_response', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ choice: selectedTask, query: query })
//     });

//     const data = await response.json();
    
//     // Use marked to convert the Markdown to HTML
//     document.getElementById('responseBox').innerHTML = marked(data.response);
// }

