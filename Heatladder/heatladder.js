// Function to generate the table for each heat
function generateTable(data) {
    const tableContainer = document.getElementById('tableContainer');
  
    for (const round in data) {
      const roundData = data[round];
      const roundContainer = document.createElement('div');
      roundContainer.classList.add('round');
  
      const roundHeader = document.createElement('h2');
      roundHeader.textContent = round;
      roundContainer.appendChild(roundHeader);
  
      roundData.forEach(heat => {
        const heatNumber = Object.keys(heat)[0];
        const seeds = heat[heatNumber];
  
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');
  
        // Generate table header
        const headerRow = document.createElement('tr');
        const headers = [heatNumber, 'Score']; // Include 'Score' header
        headers.forEach(headerText => {
          const th = document.createElement('th');
          th.textContent = headerText;
          headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);
  
        // Generate table rows with scores
        seeds.forEach(seed => {
          const row = document.createElement('tr');
          const seedCell = document.createElement('td');
          seedCell.textContent = seed.Seed; // Access seed value from the object
          row.appendChild(seedCell);
  
          const scoreCell = document.createElement('td');
          scoreCell.textContent = seed.Score; // Access score value from the object
          row.appendChild(scoreCell);
  
          tbody.appendChild(row);
        });
  
        table.appendChild(tbody);
        roundContainer.appendChild(table);
      });
  
      tableContainer.appendChild(roundContainer);
    }
  }
  
  // Fetch the JSON data and generate the table on page load
  window.addEventListener('load', function() {
    fetch('heatladder.json')
      .then(response => response.json())
      .then(data => {
        generateTable(data);
      })
      .catch(error => {
        console.error('Error fetching JSON:', error);
      });
  });
  