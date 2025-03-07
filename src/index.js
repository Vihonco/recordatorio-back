const express = require('express');
const cors = require('cors');
const messageRoutes = require('./routes/message');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/messages', messageRoutes);
app.listen(PORT,()=>{
    console.log(`Server listen on Port ${PORT}` )
})