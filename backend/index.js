const express = require("express");

const http = require("http")
const Server = require('socket.io').Server

const cors = require("cors");

require("dotenv").config();
const db = require("./models/db");
const { postRouter } = require("./routes/post");
const { userRouter } = require("./routes/user");
const uploadRouter = require("./routes/images");
const authentication = require("./middleware/authentication");
const createPostRouter = require("./routes/createPost");
const chatRouter = require("./routes/chat");
const messageRouter = require("./routes/message");

const app = express();
const PORT = process.env.PORT || 5000;

//! -----------------------------------------------------
//! -----------------------------------------------------
//! -----------------------------------------------------

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "*"
  }
})

io.on("connection", (socket) => {
  console.log("ew are connected");

  socket.on("chat", (chat) => {
    io.emit("chat", chat)
  })

  io.on("disconnect", () => {
    console.log("disconnected");
  })
})





//! -----------------------------------------------------
//! -----------------------------------------------------
//! -----------------------------------------------------


app.use(cors());
app.use(express.json());

// Routes Middleware
app.use("/posts", postRouter);
app.use("/users", userRouter);
app.use("/images", authentication, uploadRouter)
app.use("/createPost", authentication, createPostRouter)



app.use("/chat", chatRouter)
app.use('/message', messageRouter)

// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("No content at this path"));

server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});