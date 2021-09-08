// Dependencies
const express = require('express');
let notesData = require('./db/db.json');
const fs = require('fs');
const path = require('path');
const { nanoid } = require('nanoid');



const app = express();
const PORT = process.env.PORT || 300;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public', 'notes.html')));

app.get('/api/notes', (req, res) => res.json(notesData));


app.post('/api/notes', (req, res) => {
        // req.body is available since we're using the body parsing middleware

        notesData.push(req.body)
        req.body.id = nanoid()
        fs.writeFile('./db/db.json', JSON.stringify(notesData), err => {
                if (err) throw err;
        })
        // req.body.id = nanoid()

        res.json(req.body)

}
)
app.delete("/api/notes/:id", (req, res) => {
        // (1) Get the currently saved array of notes
        const { id } = req.params;
        // (2) Remove the note referenced by the ID (req.params.id) passed in from the request
        notesData = notesData.filter(note =>{
                if (note.id !== id) {
                        return true
                } else return false
        });
        
        // (3) Save the new array back to db.json
        fs.writeFile('./db/db.json', JSON.stringify(notesData), err => {
                if (err) throw err;
        })

        res.json(notesData)
});


app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
// Listener

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));