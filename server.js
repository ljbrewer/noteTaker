// Dependencies
const express = require('express');
const notesData = require('./db/db.json');
const fs = require('fs');
const path = require('path');
const { nanoid } = require('nanoid');


const app = express();
const PORT =process.env.PORT || 3003;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Routes
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname,'public', 'notes.html')));

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));


app.get('/api/notes', (req, res) => res.json(notesData));


app.post('/api/notes', (req, res) => {
       // req.body is available since we're using the body parsing middleware
       notesData.push(req.body)
       fs.writeFile('./db/db.json', JSON.stringify(notesData)) 
       req.body.id = nanoid()
       res.json(req.body)

        }
)

// Listener

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));