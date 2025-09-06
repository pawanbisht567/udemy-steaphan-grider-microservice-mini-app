const express = require('express')
const axios = require('axios')

const app = express()
app.use(express.json())

const events = [];

app.post('/events', async (req, res) => {
    const event = req.body
    console.log('Event Received:', event.type)
    events.push(event);
    // Throws event to posts service running on 4000 port number
    axios.post('http://localhost:4000/events', event).then((data)=> {
        console.log('We successfully sent a post event',data.data)
    }).catch(err => {console.log('Post', err.status)})

    // Throws event to comments service running on 4001 port number
    await axios.post('http://localhost:4001/events', event).catch(err => {console.log('Comment', err.status)})

    // Throws event to query service running on 4002 port number
    await axios.post('http://localhost:4002/events', event).catch(err => {console.log('Query', err.status)})

    // Throws event to moderation service running on 4003 port number
    await axios.post('http://localhost:4003/events', event).catch(err => {console.log('Moderation', err.status)})

    res.send({ status: 'OK' })
})

app.get('/events', (req, res) => {
    res.send(events);
})

app.listen(4005, () => {
    console.log('Event bus listening on port 4005')
})