const app = require('./src/app');
require('dotenv').config();
const connectDB = require('./src/config/database');

connectDB();

app.listen(3000,()=>{
    console.log("Server is running on PORT 3000");
})