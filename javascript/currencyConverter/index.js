const app = require('./app')
require('dotenv').config()


const port = process.env.PORT || 4000

app.listen(port,() => {
    console.log(`server is running on http://127.0.0.1:${port}`)
})
