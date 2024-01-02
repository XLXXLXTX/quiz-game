
const questionsScores = { 'correctEasy': 1, 'correctMedium': 3, 'correctHard': 5 };


document.addEventListener('DOMContentLoaded', async () => {

    const response = await fetch('scoreboard/scoresdb')

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const scores = await response.json();

    const table = document.getElementById('table-scoreboard');

    // add data rows to table
    scores.forEach((scoreData, index) => {

        const row = table.insertRow(index + 1); // add row after header row, 0 + 1 = row 1
        const rank = row.insertCell(0);
        const username = row.insertCell(1);

        const eq = row.insertCell(2);
        const mq = row.insertCell(3);
        const hq = row.insertCell(4);

        const score = row.insertCell(5);

        rank.innerHTML = index + 1; // index starts at 0, so rank 1, 2, 3, etc
        username.innerHTML = scoreData.username;

        eq.innerHTML = scoreData.correctEasy;
        mq.innerHTML = scoreData.correctMedium;
        hq.innerHTML = scoreData.correctHard;

        // calculate total score using reduce method
        const total = Object.keys(questionsScores).reduce((acc, key) => acc + scoreData[key] * questionsScores[key], 0);
        //score.innerHTML = score.correctEasy * questionScore['correctEasy'] + score.correctMedium * questionScore['correctMedium'] + score.correctHard * questionScore['correctHard'];

        score.innerHTML = total;
    });

});