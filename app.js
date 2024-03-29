const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

// Utils
const utils = require("./utils/utils");

// Connect DB
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// ... other app.use middleware
// app.use(express.static(path.join(__dirname, "client", "build")));

// Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

//  Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(
    `Backend Listening on Port ${port}`,
    `Local: http://localhost:${port}`
  );
});
