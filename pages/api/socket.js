import { Server } from "socket.io"

export default function SocketHandler(req, res){
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    io.on('connection', (socket) => {
        //socket.emit('message', 'Hello from Socket.IO server')
        socket.on('send-message', (mssg) => {
            io.emit('recieve-message', 'Hello from Socket.IO server', obj)
            console.log('@socket.js', mssg)
        })
    })
    console.log('@socket.js', 'Setting Socket')
    res.end()

}