const  express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');

const app = express();

const commentsByPostId = {
    
}

app.use(express.json())
app.use(cors())
app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

app.post('/post/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;
    // req.params.id is the Post's Id
    const comments = commentsByPostId[req.params.id] || [];
    comments.push({ id: commentId, content });
    commentsByPostId[req.params.id] = comments;

    res.status(201).send({comments, commentsByPostId});
});

app.listen(4001, () => {
    console.log('Server running at 4001')
})