require("dotenv").config()
const express = require("express")
const cors = require('cors')
const PORT = process.env.PORT || 8080

const userRouter = require('./routes/user.routes')
const eventRouter = require('./routes/event.routes')
const tagRouter = require('./routes/tag.routes')
const pictureRouter = require('./routes/picture.routes')
const eventToTagRouter = require('./routes/event_to_tag_routes')
const userToEventRouter = require('./routes/user_to_event_routes')
const userToTagRouter = require('./routes/user_to_tag_routes')

const app = express()

app.use(cors())
app.use(express.json())

/**************************************************************
 * Прописанные пути в роутеры
 **************************************************************/
app.use('/api', userRouter)
app.use('/api', eventRouter)
app.use('/api', tagRouter)
app.use('/api', pictureRouter)

app.use('/api', eventToTagRouter)
app.use('/api', userToEventRouter)
app.use('/api', userToTagRouter)


app.listen(PORT, () => console.log(`Server started on port ${PORT}`))