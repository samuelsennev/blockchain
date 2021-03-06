const express = require('express');
// const bodyParser = require('body-parser');
const Blockchain = require('../blockchain');
const P2pServer = require('./p2p-server');

//Let the users access this API in a different port than the 3001
const HTTP_PORT = process.env.HTTP_PORT || 3001;
const app = express();
const bc = new Blockchain();
const p2pServer = new P2pServer(bc); 

//allows json data from post-requests
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Sends a get request to access the blocks of the current chain 
app.get('/blocks', (req, res) => {
    res.json(bc.chain);
});

//Sends a post request, adding a new block to the chain and syncronize every socket's chain.
app.post('/mine', (req, res) => {
    const block = bc.addBlock(req.body.data);
    console.log(`New block added ${block.toString()}`);

    p2pServer.syncChains();

    res.redirect('/blocks');
});

app.listen(HTTP_PORT, () => console.log(`Listening on port: ${HTTP_PORT}`));
p2pServer.listen();