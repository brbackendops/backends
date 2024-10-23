import { RunApp } from './app'
import express from 'express'
import process from 'process'

const StartServer = async() => {
    const app = express()
    await RunApp(app)

    const port = process.env.PORT || 8080
    app.listen(port,() => {
        console.log(`server is running on http://localhost:${port}`)
    })
    .on('error', (err) => {
        console.log(err)
        process.exit(1)
    })
}

StartServer()