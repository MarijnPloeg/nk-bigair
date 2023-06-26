document.addEventListener('DOMContentLoaded', function() {
    fetch('scores.json')
      .then(response => response.json())
      .then(data => {
        displayRankings(data);
      })
      .catch(error => {
        console.error('Error fetching scores:', error);
      });
  });
  
  function displayRankings(data) {
    const rankingsContainer = document.getElementById('rankings');
  
    let rank = 1;
    const riders = data['Round 1'][0]['Heat 1'];
  
    const riderScores = []; // Array to store rider scores
  
    // Calculate total scores for each rider
    for (const riderName in riders) {
      const scores = riders[riderName];
  
      // Calculate total score (top two scores)
      const totalScore = scores
        .sort((a, b) => b - a) // Sort scores in descending order
        .slice(0, 2) // Take the top two scores
        .reduce((sum, score) => sum + score, 0); // Calculate sum
  
      riderScores.push({ name: riderName, score: totalScore });
    }
  
    // Sort riders by total score in descending order
    riderScores.sort((a, b) => b.score - a.score);
  
    // Display rankings and total scores
    for (let i = 0; i < riderScores.length; i++) {
      const row = document.createElement('tr');
      const rankCell = document.createElement('td');
      const nameCell = document.createElement('td');
      const scoreCell = document.createElement('td');
  
      rankCell.textContent = rank;
      nameCell.textContent = riderScores[i].name;
      scoreCell.textContent = riderScores[i].score;
  
      row.appendChild(rankCell);
      row.appendChild(nameCell);
      row.appendChild(scoreCell);
      rankingsContainer.appendChild(row);
  
      rank++;
    }
  }
  