import express from 'express';
import mongoose from 'mongoose';
import db from './root/models';
import routes from './root/routes';

const app = express();
const port = process.env.PORT || 3000;

mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/KV',{ useNewUrlParser: true }); 
mongoose.connect('mongodb://heroku_txnmj7qm:u44sk41sba27242nim4cdaqtc9@ds229552.mlab.com:29552/heroku_txnmj7qm/KV',
                  { useNewUrlParser: true }); 

app.listen(port);
routes(app);

console.log('Key Value API server started on: ' + port);