"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rooms = {};
const roomHandler = (socket) => {
    const createRoom = () => {
        const roomId = Date.now();
        socket.join(roomId.toString());
        rooms[roomId] = []; // create a new entry for room
        socket.emit('room-created', { roomId });
        console.log(roomId);
    };
    const joinedRoom = ({ roomId, peerId }) => {
        if (rooms[roomId]) {
            // if it is there in memory db, then console it
            console.log('RoomJoined', roomId, 'peer id', peerId);
            // moments new user joins add to key of room id
            rooms[roomId].push(peerId);
            socket.join(roomId); // make the user joins socket room
            socket.on('ready', () => {
                socket.to(roomId).emit('user-joined', { peerId });
            });
            // below event is for logging purpose
            socket.emit('get-users', {
                roomId,
                participants: rooms[roomId]
            });
        }
    };
    socket.on('create-room', createRoom);
    socket.on('joined-room', joinedRoom);
};
exports.default = roomHandler;
