const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true })); 
app.use(express.static('public'));               

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});