const express = require('express');
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require('./swagger.json');

app.use(express.json());

// Import Routes
const routes = require('./src/routes/index');

//Version
const version = 'v1'

// Route Middlewares
app.use('/api/'+ version, routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



const port = 3000;
app.listen(port, function(){
    console.log("Server running on localhost:" + port);
    console.log("Swagger Doc => http://localhost:3000/api-docs");
});
