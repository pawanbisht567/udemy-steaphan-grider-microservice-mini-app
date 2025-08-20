const express = require('express')
const axios = require('axios')

const app = express()
app.use(express.json())

app.post('/events', async (req, res) => {
    const event = req.body
    axios.post('http://localhost:4000/events', event).then((data)=> {
        console.log('We successfully sent a post event',data.data)
    }).catch(err => {console.log('Post ',err.status)})
    await axios.post('http://localhost:4001/events', event).catch(err => {console.log('Comment ',err.status)})
    await axios.post('http://localhost:4002/events', event).catch(err => {console.log('Query ',err.status)})
    res.send({ status: 'OK' })
})

app.listen(4005, () => {
    console.log('Event bus listening on port 4005')
})