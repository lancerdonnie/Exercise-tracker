const express = require('express');
const app = express();
app.use(express.json());

app.use('/users', require('./routes/users'));
app.use('/exercises', require('./routes/exercises'));

const ConnectDB = require('./config/db');
ConnectDB();

app.listen(5000, () => {
  console.log('dev server running on port 5000');
});
