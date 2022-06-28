const express = require("express")
const connectDB = require('./config/db')

const app = express()

// Connect DB
connectDB()

// Init Middleware
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Nothing on this route!")
})

// Define Routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/posts', require('./routes/api/posts'))

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Backend Listening on Port ${port}`, `Local: http://localhost:${port}`))