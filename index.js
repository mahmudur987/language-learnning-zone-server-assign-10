const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;
app.use(cors())
const courses = require('./data/courses.json')
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.get('/courses', (req, res) => {
    res.send(courses)
})
app.get('/courses/:id', (req, res) => {
    const id = req.params.id;
    const course = courses.find(cr => cr.id === id)
    console.log(id);
    res.send(course)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})