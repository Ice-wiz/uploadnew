import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import route from './routes/route.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use('/',route);

const port=process.env.PORT;
app.listen(port,()=>console.log(`Server listening to port ${port}`));