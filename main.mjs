import express from 'express'
import userService from "./service/user/index.mjs"
import toolsService from "./service/tools/index.mjs"

const WEB_APP_HOST = 'https://dev-c0ee1fac76df136a.notta.ai'
// const WEB_APP_HOST = 'https://test-app-12154205867b06a3.notta.ai'
// const WEB_APP_HOST = 'https://app.notta.ai'

const { getGuestInfo } = userService;
const { createYoutubeSummarize } = toolsService;
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

app.post('/youtube-summarizer', async (req, res) => {
    const { url } = req.body;
    let resStr = '';
    try {
        await getGuestInfo();
        const fetchData = await createYoutubeSummarize({ url, language: 'en-US', email: '' });
        const { task_id } = fetchData.data;
        resStr = `You can view your YouTube summary at the link below: ${WEB_APP_HOST}/youtube-summarizer/check-out/${task_id}?lang=en&from=gpts&transcription_type=youtube_summarizer&module=checkout`
        console.log("🚀 ~ app.post ~ data:", fetchData);
    } catch (error) {
        console.log("🚀 ~ app.post ~ error:", error);
        resStr = 'An error occurred while processing your request. Please try again later.';
    }

    // Logic to summarize the video
    res.send({ data: resStr });
})

app.get("/test", (req, res) => {
    getGuestInfo();
    res.send("Hello World!");
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
