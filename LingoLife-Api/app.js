import express from 'express';
import cors from 'cors';
import conn from './db/conn.js';
import ForumRouter from './routes/Forum.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'http'; // ES module import para o http
import { Server } from 'socket.io'; // ES module import para o socket.io
import ejs from 'ejs'; // Import EJS como ES module

// Db Connection
conn();
const app = express();

// Configurações dos protocolos http e websocket
const server = createServer(app);
const io = new Server(server);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors()); 
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static('public'));

// Chat HTML
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', ejs.renderFile); // Alteração para ES modules
app.set('view engine', 'html');
app.use('/chat', (req, res) => {
    res.render('chat.html');
});


//chat
let messages = [];

io.on('connection',socket=>{
    console.log(`Socket conectado: ${socket.id}`);
    socket.emit('previousMessages',messages);
    socket.on('sendMessage', data =>{
        messages.push(data)
        socket.broadcast.emit('receivedMessage',data);
    })
})


// Routes
app.use("/forum", ForumRouter);

server.listen(5000, function(){
    console.log("Servidor Online!!");
});
