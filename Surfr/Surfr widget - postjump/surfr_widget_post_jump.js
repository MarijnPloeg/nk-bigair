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

  const heightDataElement = document.querySelector('.heightData');
  const distanceDataElement = document.querySelector('.distanceData');
  const riderNameElement = document.querySelector('.riderName');

  heightDataElement.textContent = mostRecentJump.lastJumpHeight.toFixed(2) + ' m';
  distanceDataElement.textContent = mostRecentJump.lastJumpDistance.toFixed(0) + ' m';
  riderNameElement.textContent = mostRecentJump.riderName;
}
