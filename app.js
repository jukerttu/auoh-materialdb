const express = require('express');
// Ensimmäinen arvo on ympäristömuuttuja ja toinen paikallisen koneen portti
const port = process.env.PORT || 8080; 
const app = express();

const body_parser = require('body-parser');

app.use(body_parser.json()); //req.body.name
app.use(body_parser.urlencoded({
    extended:true
})); // material/id

app.use( (req, res, next)=>{
    console.log(req.method, '', req.path);
}); // GET / api materials

app.listen(port);
