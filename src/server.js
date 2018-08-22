import express from 'express';
import mongoose from 'mongoose';
import db from './models';
import routes from './routes';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 3000;

mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/KV',{ useNewUrlParser: true }); 
mongoose.connect('mongodb://heroku_txnmj7qm:u44sk41sba27242nim4cdaqtc9@ds229552.mlab.com:29552/heroku_txnmj7qm',
                  { useNewUrlParser: true }); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logErrors);

app.listen(port);
routes(app);


console.log('Key Value API server started on: ' + port);

/*************** utilities middleware  ***************/

function logErrors (err, req, res, next) {
   console.error(err.stack);
   next(err);
 }
