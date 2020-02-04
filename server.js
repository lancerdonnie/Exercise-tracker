const express = require('express');
const app = express();
const path=require("path")

app.use(express.json());

app.use('/users', require('./routes/users'));
app.use('/exercises', require('./routes/exercises'));

const ConnectDB = require('./config/db');
ConnectDB();


if(process.env.NODE_ENV==="production"){
  app.use(express.static("client/build"))
  app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"client","build","index.html"))
  })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('dev server running on port 5000');
});
