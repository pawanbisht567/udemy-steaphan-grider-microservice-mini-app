const  express = require('express');
const { randomBytes } = require('crypto');
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

app.post('/post', (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    posts[id] = {
        id, title
    };

    res.status(201).send(posts[id]);
});

app.listen(4000, () => {
    console.log('Server running at 4000')
})