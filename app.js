const express = require('express');
// Ensimmäinen arvo on ympäristömuuttuja ja toinen paikallisen koneen portti
const port = process.env.PORT || 8080; 
//npm install mongoose
const mongoose = require('mongoose');
const app = express();

const body_parser = require('body-parser');

const material_controller = require('./material_controller');

app.use(body_parser.json()); //req.body.name
app.use(body_parser.urlencoded({
    extended:true
})); // material/id

app.use((req, res, next)=>{
    console.log(req.method, ' ', req.path);
    next();
}); // GET / api materials

// GET /index.hmtl
// --> /public/index.html
app.use("/", express.static("public"));

// RESTfull API
// CRUD OPERATIONS
// CREATE
// Username: serveruser
// Password: MuiFcJRopzyhdJJD
// mongodb+srv://serveruser:MuiFcJRopzyhdJJD@cluster0-ndvby.mongodb.net/test?retryWrites=true&w=majority
app.post("/api/material", material_controller.api_post_material);
// READ
app.get("/api/materials", material_controller.api_get_materials);


// UPDATE
// app.put http protokollassa korvaa kaikki tiedot
// app.patch http protokollassa korvaa vain tietyt kentätä
app.put("/api/material/:id", material_controller.api_put_material);

// DELETE
app.delete("/api/material/:id", material_controller.api_delete_material);

const database_uri = "mongodb+srv://serveruser:MuiFcJRopzyhdJJD@cluster0-ndvby.mongodb.net/materialdb?retryWrites=true&w=majority";
mongoose.connect(database_uri, {
    useCreateIndex: true, 
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
}).then(()=>{
    console.log('database connected');
    app.listen(port);
}).catch(err=>{
    console.log(err);
});

