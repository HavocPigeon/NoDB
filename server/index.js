const express = require('express');
const bodyParser = require('body-parser');
const port = 4000;
const axios = require('axios');
const app = express();
const cC = require('./controller/comments_controller')
app.use(bodyParser.json());

//Comment Section
app.post('/api/comments', cC.create);
app.delete('/api/comments/:id', cC.delete);
app.get('/api/comments', cC.read);
app.put('/api/comments/:id', cC.update);
app.listen(port, () => console.log(`server is listening on port ${port}`));