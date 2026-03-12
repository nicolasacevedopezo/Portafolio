const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const path = require('path');
const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials')); 

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => res.render('home'));
app.get('/login', (req, res) => res.render('login'));
app.get('/register', (req, res) => res.render('register'));

app.get('/dashboard', (req, res) => {
    const dataRaw = fs.readFileSync('./data.json', 'utf-8');
    const data = JSON.parse(dataRaw);
    res.render('dashboard', { tasks: data.tasks });
});

app.post('/nueva-tarjeta', (req, res) => {
    const { title } = req.body;
    const dataRaw = fs.readFileSync('./data.json', 'utf-8');
    const data = JSON.parse(dataRaw);
    const newTask = {
        id: Date.now(), 
        title: title,
        status: "To Do"
    };
    data.tasks.push(newTask);

    fs.writeFileSync('./data.json', JSON.stringify(data, null, 2));
    res.redirect('/dashboard');
});

app.listen(3000, () => console.log('KanbanPro corriendo en http://localhost:3000'));