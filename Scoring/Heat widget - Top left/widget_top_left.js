document.addEventListener('DOMContentLoaded', function() {
    fetch('scores.json')
      .then(response => response.json())
      .then(data => {
        displayHeat(data);
        displayRankings(data);
        startCountdown();
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  });
  
  function displayHeat(data) {
    const currentHeat = data[0].heatname;
    const heatNameElement = document.getElementById('heat-name');
    heatNameElement.textContent = currentHeat;
  }
  
  function displayRankings(data) {
    const rankingsContainer = document.getElementById('rankings');
    rankingsContainer.innerHTML = '';
  
    const riders = data.slice(1); // Exclude the heat data
  
    riders.sort((a, b) => b.totalscore - a.totalscore);
  
    riders.forEach((rider, index) => {
      const row = document.createElement('tr');
      const positionCell = document.createElement('td');
      const nameCell = document.createElement('td');
      const scoreCell = document.createElement('td');
  
      positionCell.textContent = index + 1;
      nameCell.textContent = rider.name.split(' ').pop();
      scoreCell.textContent = (index === 0) ? 'Leading' : rider.totalscore.toFixed(2);
  
      row.appendChild(positionCell);
      row.appendChild(nameCell);
      row.appendChild(scoreCell);
      rankingsContainer.appendChild(row);
    });
  }
  
  function startCountdown() {
    let time = 30; // Countdown time in seconds
  
    const countdownElement = document.getElementById('countdown');
  
    const countdownInterval = setInterval(() => {
      countdownElement.textContent = time.toFixed(0);
      time--;
  
      if (time < 0) {
        countdownElement.style.display = 'none'; // Hide the countdown element
        clearInterval(countdownInterval); // Clear the countdown interval
      }
    }, 1000);
  }