const express = require('express');
const PORT = 8080;
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const {MONGOBD_URL} = require('./config')

mongoose.connect(MONGOBD_URL);

mongoose.connection.on('connected',()=>{
    console.log("DB connected");
})
mongoose.connection.on('error',(error)=>{
    console.log("some error found")
})

require('./models/UserModel');
require('./models/DealerModel');
require('./models/CarModel');
require('./models/Car-Sold-Model');
require('./models/Car-Deal');







app.use(cors());
app.use(express.json());

require('./models/UserModel')
app.use(require('./routes/userRouter'));

require('./models/DealerModel')
app.use(require('./routes/DealerRouter'));

require('./models/CarModel')
app.use(require('./routes/CarModel-Router'));

require('./models/Car-Deal')
app.use(require('./routes/Car-Deal-Router'));

require('./models/Car-Sold-Model')
app.use(require('./routes/Car-Sold-Router'));




app.listen(PORT,()=>{
    console.log("Server Started");
});