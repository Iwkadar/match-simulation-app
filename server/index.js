const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();

const teams = {
    0: { id: 0, name: 'Poland', score: 0 },
    1: { id: 1, name: 'Germany', score: 0 },
    2: { id: 2, name: 'Brazil', score: 0 },
    3: { id: 3, name: 'Mexico', score: 0 },
    4: { id: 4, name: 'Argentina', score: 0 },
    5: { id: 5, name: 'Uruguay', score: 0 }
};

function getRandomInt() {
    return Math.floor(Math.random() * 6);
}

app.get('/teams', (req, res) => {
    res.json(teams);
    const randomInt = getRandomInt();
    teams[randomInt].score += 1;
});

app.use(express.static(path.resolve(__dirname, '../dist')));

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
