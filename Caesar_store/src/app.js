const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
// mongodb://caesar_store:JNXBaK8b7dlRtGpw@cluster0-shard-00-00-9ay4b.mongodb.net:27017,cluster0-shard-00-01-9ay4b.mongodb.net:27017,cluster0-shard-00-02-9ay4b.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true
// connecting to db
const uri = 'mongodb+srv://caesar_store:JNXBaK8b7dlRtGpw@cluster0-9ay4b.azure.mongodb.net/caesar_store?retryWrites=true';
mongoose.connect(uri, {useNewUrlParser: true})
    .then(db => console.log('Db connected'))
    .catch(err => console.log(err));

//importing routes 
const indexRoutes = require('./routes/index');

//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

//routes
app.use('/', indexRoutes);

//starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
})