import app from './app.js'; 
import dotenv from 'dotenv';
import dbConnection from './config/dbConnection.js';

dotenv.config();
const port = process.env.PORT;

app.listen(port, async() =>{
    await dbConnection();
    console.log(`Server is running on port ${port}`);
});