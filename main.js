const express = require('express');
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

const modeToString = {
    'easy': 'Easy Mode Activated!',
    'medium': 'Welcome to Medium Mode!',
    'hard': 'You are now in Hard Mode!'
};

app.post('/mode', (req, res) => {
    const { mode } = req.body; // Extract 'mode' from the JSON body
    if (modeToString[mode]) {
        res.send({ message: modeToString[mode] });
    } else {
        res.status(400).send({ message: 'Invalid mode provided.' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
