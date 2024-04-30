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

app.post('/youtube-summarizer', (req, res) => {
    const { videoUrl } = req.body;
    console.log("🚀 ~ app.post ~ videoUrl:", videoUrl)
    // Logic to summarize the video
    res.send({ summary: 'This is a summary of the video.' });
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
