document.addEventListener('DOMContentLoaded', function() {
  const allOriginsProxyUrl = 'https://api.allorigins.win/raw?url=';
  const targetUrl = 'https://spacex.heatscoring.com/json/current-heat';
  const apiUrl = allOriginsProxyUrl + encodeURIComponent(targetUrl);

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      displayHeat(data);
      displayRankings(data);
      startCountdown(data);
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

  riders.sort((a, b) => b.previoustotal - a.previoustotal);

  riders.forEach((rider, index) => {
    const row = document.createElement('tr');
    const positionCell = document.createElement('td');
    const nameCell = document.createElement('td');
    const scoreCell = document.createElement('td');

    positionCell.textContent = index + 1;
    nameCell.textContent = rider.fullname;
    scoreCell.textContent = (index === 0) ? 'Leading' : rider.previoustotal.toFixed(2);

    row.appendChild(positionCell);
    row.appendChild(nameCell);
    row.appendChild(scoreCell);
    rankingsContainer.appendChild(row);
  });
}

function startCountdown(data) {
  const currentTime = Date.now();
  const endTime = data[0].heatend;
  let time = Math.max(0, Math.ceil((endTime - currentTime) / 1000)); // Countdown time in seconds

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
