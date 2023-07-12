document.addEventListener("DOMContentLoaded", function() {
  const container = document.createElement("div");
  container.id = "widget-container";
  document.body.appendChild(container);

  fetch("rider_info.json")
    .then(response => response.json())
    .then(riderData => {
      fetch("heat_info.json")
        .then(response => response.json())
        .then(heatData => {
          const heatScoresDiv = document.createElement("div");
          heatScoresDiv.id = "heat-scores";
          container.appendChild(heatScoresDiv);

          const heatScores = heatData.slice(1);

          heatScores.forEach(score => {
            const riderInfo = riderData.find(rider => rider.riderid === score.riderid);

            const riderDiv = document.createElement("div");
            riderDiv.classList.add("rider-info");
            riderDiv.style.backgroundColor = riderInfo.lycra;

            const riderIcon = document.createElement("img");
            riderIcon.src = riderInfo.picture;
            riderIcon.classList.add("rider-icon");
            riderDiv.appendChild(riderIcon);

            const lastNameInitials = getLastNameInitials(riderInfo.lname);
            const initialsDiv = document.createElement("div");
            initialsDiv.classList.add("rider-initials");
            initialsDiv.textContent = lastNameInitials;
            riderDiv.appendChild(initialsDiv);

            heatScoresDiv.appendChild(riderDiv);

            const trickScoresDiv = document.createElement("div");
            trickScoresDiv.classList.add("trick-scores");
            heatScoresDiv.appendChild(trickScoresDiv);

            const trickScores = [];

            for (let i = 0; i < 5; i++) {
              const trickScore = score["s" + i];
              const trickDiv = document.createElement("div");
              trickDiv.classList.add("trick-score");

              if (trickScore === 0) {
                trickDiv.textContent = "Crash";
                trickDiv.classList.add("crash");
              } else {
                trickDiv.textContent = trickScore;
              }

              trickScores.push({ score: trickScore, div: trickDiv });
              trickScoresDiv.appendChild(trickDiv);
            }

            const sortedScores = [...trickScores].sort((a, b) => b.score - a.score);
            sortedScores[0].div.classList.add("highlight-trick");
            sortedScores[1].div.classList.add("highlight-trick");

            const totalScoreDiv = document.createElement("div");
            totalScoreDiv.classList.add("total-score");
            totalScoreDiv.textContent = score.totalscore;
            heatScoresDiv.appendChild(totalScoreDiv);
          });
        });
    });
});

function getLastNameInitials(lastName) {
  const lastWord = lastName.split(" ").pop();
  const initials = lastWord.slice(0, 3).toUpperCase();
  return initials;
}
