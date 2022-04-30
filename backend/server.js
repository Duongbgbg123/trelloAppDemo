import express from 'express';
import 'dotenv/config';
import connection from './src/config/connectDB.js';
const app = express();
const port = process.env.PORT || 8081;

app.get('/', (req, res) => {
  res.send('hello Nodejs');
});

connection();

app.listen(port, () => {
  console.log('Node.js server is running on port:' + port);
});
