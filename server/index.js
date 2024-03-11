const express = require('express');
const data = require('./database.json')
const fs = require('fs');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json())

app.get('/api', (req, res) => {
    res.json({ message: 'Hello from server!' });
});

app.get('/list', (req, res) => {
    res.json(data)
})

app.post('/save', (req, res, next) => {
    console.log('Received request');
    if (!req.body.name || !req.body.email) {
        res.status(400).send({message: 'At least one required field is missing'})
    }
    data.contacts.push(req.body);
    json = JSON.stringify(data, null, 2); 
    fs.writeFile('./server/database.json', json, (err) => {
        if (err)
            console.log(err);
        else {
            console.log('File written to database.json');
        }
    });
    res.send(json)
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

