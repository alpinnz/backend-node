const express = require('express');
const routes = require('./routes');

// Express setup
let app = express();
app.set('views', 'views');
// app.set('view engine', 'ejs');
// app.use(express.static('public'));
app.use(express.urlencoded({extended: true})); // to support URL-encoded POST body
app.use(express.json()); // to support parsing JSON POST body
app.use('/', routes);


app.listen(3000, () => console.log(`ExpressApp listening on localhost port 3000!`))