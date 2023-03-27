const express = require('express');
const cors = require('cors');

const app_router = require('./routes/routes.js')
const app = express();

app.use(cors());
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use('/', express.static(__dirname + '/public'));

app.use('/api/', app_router)

app.listen(process.env.PORT, ()=>{
  console.log('run on port 2500')
})