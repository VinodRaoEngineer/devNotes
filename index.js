const express = require("express")
const dotenv = require("dotenv").config()
const connection = require("./config/db")
const userRouter = require("./routes/user.route")
const noteRouter = require("./routes/note.route")
const auth = require("./middleware/auth.middleware")
const cors = require("cors")



const server = express()
const PORT = process.env.PORT || 5005

server.use(express.json())
server.use('/user', userRouter)
server.use('/note', auth, noteRouter)
server.use(cors({origin:'*'}))


server.get('/', (req, res) => {
    res.send('server is fine')
})

server.listen(PORT, async (req, res) => {
     try {
        await connection;
        console.log(`server is running on ${PORT}`)
     } catch (error) {
        console.log('Error is occured in listen')
     }
})