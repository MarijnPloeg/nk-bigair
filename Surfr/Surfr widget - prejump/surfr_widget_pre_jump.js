document.addEventListener('DOMContentLoaded', function() {
  const allOriginsProxyUrl = 'https://api.allorigins.win/raw?url=';
  const targetUrl = 'https://kiter-271715.appspot.com/competition/livedata/14744'; // Your Surfr API URL
  const apiUrl = allOriginsProxyUrl + encodeURIComponent(targetUrl);

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      displayJumpData(data); // Function to display jump data
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
});

function displayJumpData(data) {
  const mostRecentJump = data.riders.reduce((prevRider, currentRider) => {
    return (currentRider.lastJumpEpoch > prevRider.lastJumpEpoch) ? currentRider : prevRider;
  }, data.riders[0]);

  const speedDataElement = document.querySelector('.speedData');
  const heartRateDataElement = document.querySelector('.heartRateData');
  const riderNameElement = document.querySelector('.riderName');

  speedDataElement.textContent = mostRecentJump.currentSpeed.toFixed(0);
  heartRateDataElement.textContent = mostRecentJump.currentHeartRate.toFixed(0);
  riderNameElement.textContent = mostRecentJump.riderName;
}
