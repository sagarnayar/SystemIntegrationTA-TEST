const express = require('express');
const app = express();

let restCounter =0;

setInterval(()=>{
    restCounter++;
    console.log('REST Counter:', restCounter);
},5000);

app.get('/api/plus-one', (req,res) => {
    console.log('REST API Request: /api/plus-one');
    res.json({result: restCounter});
});

const port=3000;
app.listen(port,()=>{
    console.log(`REST API Listening at http://locahost:${port}`);
});