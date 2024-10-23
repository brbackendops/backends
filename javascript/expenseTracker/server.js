const express = require('express');
const initApp = require('./app.js');

const startServer = async () => {
    const app = express()
    await initApp(app)

    const port = process.env.PORT || 5000
    app.listen(port,() => {
        console.log(`listening on http://127.0.0.1:${port}`)
    })
    .on('error',(err) => {
        console.log(err)
        process.exit();
    })
}

startServer()