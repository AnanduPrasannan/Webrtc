"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const roomHandler_1 = __importDefault(require("./handler/roomHandler"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
});
app.use((0, cors_1.default)());
io.on('connection', (socket) => {
    console.log('new user connected');
    (0, roomHandler_1.default)(socket);
    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});
server.listen(8000, () => {
    console.log("running");
});
