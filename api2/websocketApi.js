const express = require('express');
const expressWs = require('express-ws');
const cors= require('cors');
const app = express();
expressWs(app);
app.use(cors());
let wsCounter =0;

app.ws('/times-two', (ws,req) => {
    console.log('WebSocket Connection Estabished');

    ws.send(JSON.stringify({result:wsCounter}));

    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);

            if(data.action == 'double') {
                setTimeout(() => {
                    wsCounter *= 2;
                    console.log('WebScket Counter Doubled:', wsCounter);

                    ws.send(JSON.stringify({ result: wsCounter}));
                }, 5000); 
            } else {
                console.log('Unknown Socket', data.action);
            }
        }
        catch(error) {
            console.error('error parsing', error);
        }
    });

    ws.on('close', () => {
        console.log('WebSocket closed');
    });

});

const port = 3001;
app.listen(port, () => {
    console.log(`WebSocket API listening at ws://localhost:${port}`);
});