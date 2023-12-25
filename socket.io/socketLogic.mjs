const socketLogic = (io)=>{
    io.on('connection', (socket) => {
        console.log('A user connected');
      
        socket.on('disconnect', () => {
          console.log('A user disconnected');
        });
      
        socket.on('chat message', (msg) => {
          io.emit('chat message', msg); // Broadcast message to all connected clients
        });
      });
}

export default socketLogic