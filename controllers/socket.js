module.exports = {
  userJoinRoom: (io, socket, data) => {
    const { roomId } = data;

    socket.join(roomId);

    // SEND TO ROOM MEMBERS AVOID SENDER
    // socket.to(roomId).emit('room:newMember', { userName: socket.id });

    // SEND TO ROOM MEMBERS INCLUDE SENDER
    io.to(roomId).emit('room:newMember', { userName: socket.id });
  }
};
