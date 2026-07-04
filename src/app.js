require("dotenv").config();
const express = require("express");
const http = require("http");
const morgan = require("morgan");
const { Server } = require("socket.io");
const path = require("path");
const mongoose = require("mongoose");

const app = express();


//mongodb
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/chatdb")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB Error:", err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static("public"));

// Server uploaded files
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Routes
app.get("/api/health", (req, res) => res.status(200).json({ status: "API is Healthy" }));
app.use("/api/v1/uploads", require("./routes/uploads.routes"));

//  Socket.IO Chat 
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("Connected:", socket.id);

    // chat:join — client sends { username }
    socket.on("chat:join", ({ username }) => {
        socket.username = username;
        socket.broadcast.emit("user-joined", { 
            username, 
            message: `${username} joined the chat` 
        });
        socket.emit("chat:join", { 
            success: true, 
            message: `Welcome ${username}` 
        });
    });

    // chat:message — client sends { username, text }
    socket.on("chat:message", ({ username, text }) => {
        io.emit("chat:message", { 
            username, 
            text, 
            timestamp: new Date() 
        });
    });

    // chat:typing — client sends { username }
    socket.on("chat:typing", ({ username }) => {
        socket.broadcast.emit("chat:typing", { username });
    });

    // disconnect — built-in
    socket.on("disconnect", () => {
        console.log("Disconnected:", socket.id);
        if (socket.username) {
            socket.broadcast.emit("user-left", { 
                username: socket.username,
                message: `${socket.username} left the chat`
            });
        }
    });
});

// Server
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});