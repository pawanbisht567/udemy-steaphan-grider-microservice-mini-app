const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  // Call the external moderation service
  try {
    let status = 'rejected';
    if(type === 'CommentCreated') {
      data.content.includes('orange') ? status = 'rejected' : status = 'approved';
      const response = await axios.post('http://localhost:4005/events', { 
        type: 'CommentModerated', 
        data: {
            ...data,
            status
        }
    });
    }
    return res.send({ status: 'OK' });
  } catch (error) {
    console.error('Error calling moderation service:', error);
    return res.status(500).send('Error calling moderation service');
  }
});

app.listen(4003, () => {
  console.log('Moderation service listening on port 4003');
});
