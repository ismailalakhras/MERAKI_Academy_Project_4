const express = require("express");
const cors = require("cors");

require("dotenv").config();
const db = require("./models/db");
const { postRouter } = require("./routes/post");
const { userRouter } = require("./routes/user");

const app = express();
const PORT = process.env.PORT || 5000;



app.use(cors());
app.use(express.json());

// Routes Middleware
app.use("/posts", postRouter);
app.use("/users", userRouter);

// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("No content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});