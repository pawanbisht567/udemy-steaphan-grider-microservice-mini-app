const  express = require('express');
const { randomBytes } = require('crypto');
const axios = require('axios');
const cors = require('cors')
const app = express();

var corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
const posts = {}
app.use(cors(corsOptions));
app.use(express.json())

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/events', (req, res) => {
    console.log('Inside of Events Route')
    console.log(req.body);
    return res.status(200).send('Hi From Posts')
})

app.post('/post', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    posts[id] = {
        id, title
    };

    await axios.post('http://localhost:4005/events', {
        type: 'PostCreated',
        data: {
            id, title
        }
    }).then((data) => {
        console.log('Event sent to event bus:', data);
    }).catch(err => {console.log(err)})
    res.status(201).send(posts[id]);
});

app.listen(4000, () => {
    console.log('Server running at 4000')
})