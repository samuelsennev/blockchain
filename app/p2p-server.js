const Websocket = require('ws');

const P2P_PORT = process.env.P2P_PORT || 5001;

//Check if the process enviroment 'PEERS' exists. If so, split them using ",". Else, return "[]"
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];

class P2pServer {
    constructor(blockchain) {
        this.blockchain = blockchain;
        this.sockets = [];
    }

    /**
     * Starts a Websocket server on the port that first miner used
     */
    listen() {
        const server = new Websocket.Server({ port: P2P_PORT });
        server.on('connection', socket => this.connectSocket(socket));

        this.connectToPeers();
        console.log(`Listening for peer-to-peer connections on: ${P2P_PORT}`);
    }

    /**
     * Connect a new user to the socket intialized by the listen() function
     * @param {*} socket 
     */
     connectSocket(socket) {
        this.sockets.push(socket);
        console.log('Socket connected!');
    }

    /**
     * Connect the user to the peer started by the access of the first user
     */
    connectToPeers() {
        peers.forEach(peer => {
            const socket = new Websocket(peer);
            socket.on('open', () => this.connectSocket(socket))
            
            this.messageHandler(socket);
            
            //sends the stringify version of the blockchain's chain to sockets
            socket.send(JSON.stringify(this.blockchain.chain));
        })
    }

    /**
     * Enable each socket to receive message events
     * @param {*} socket 
     */
    messageHandler(socket) {
        socket.on('message', message => {
            const data = JSON.parse(message);
            console.log('data', data);
        });
    }
}

module.exports = P2pServer;
//HTTP_PORT=3002 P2P_PORT=5003 PEERS=ws://localhost:5001,ws://localhost:2002 npm run dev