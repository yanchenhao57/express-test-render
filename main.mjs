import express from 'express'
import userService from "./service/user/index.mjs"
import toolsService from "./service/tools/index.mjs"

const WEB_APP_HOST = 'https://test-app-12154205867b06a3.notta.ai'

const { getGuestInfo } = userService;
const { createYoutubeSummarize } = toolsService;
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

app.post('/youtube-summarizer', async (req, res) => {
    const { url } = req.body;
    console.log("🚀 ~ app.post ~ req.body:", req.body)
    await getGuestInfo();
    const fetchData = await createYoutubeSummarize({ url, language: 'en-US', email: '' });
    const { task_id } = fetchData.data;
    const resUrl = `${WEB_APP_HOST}/youtube-summarizer/check-out/${task_id}?lang=en&from=gpts&transcription_type=youtube_summarizer&module=checkout`
    console.log("🚀 ~ app.post ~ data:", fetchData);

    // Logic to summarize the video
    res.send({ summary: `You can check your summarize in ${resUrl}` });
})

app.get("/test", (req, res) => {
    getGuestInfo();
    res.send("Hello World!");
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
