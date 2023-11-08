// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

// Create web server
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Create event handler
app.post('/events', async (req, res) => {
    const { type, data } = req.body;

    if (type === 'CommentCreated') {
        const status = data.content.includes('orange') ? 'rejected' : 'approved';

        // Emit event
        await axios.post('http://event-bus-srv:4005/events', {
            type: 'CommentModerated',
            data: {
                id: data.id,
                postId: data.postId,
                status,
                content: data.content,
            },
        });
    }

    res.send({});
});

// Start web server
app.listen(4003, () => {
    console.log('Listening on 4003');
});
