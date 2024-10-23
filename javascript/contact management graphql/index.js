const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const { ApolloServerPluginLandingPageLocalDefault } = require('apollo-server-core');
const { graphqlUploadExpress } = require("graphql-upload");
const http = require('http');
const cors = require("cors");
const path = require("path")
const app = express();


app.use(express.static("public/"))
app.get('/', (req, res) => {
  res.send("success")
})


const typeDefs = require('./graphqlData/typedefs');
const resolvers = require('./graphqlData/resolvers');

const httpServer = http.createServer(app)
const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache:'bounded',
    plugins: [ApolloServerPluginDrainHttpServer({httpServer}) , ApolloServerPluginLandingPageLocalDefault({ embed: true })]
  });
  
  
// app.use(graphqlUploadExpress());
async function startServer() {
  await server.start()
  //app.use()
  app.use("/graphql", 
    cors(),
    express.json() ,
    graphqlUploadExpress(), 
    expressMiddleware(server,{
      context: ({req , res }) => {
        return {
          url: req.url,
          protocol: req.protocol,
          host: req.get("host"),
          path: req.path
        }
      }
  }))  
}

const port = 3000
startServer().then(() => {
  httpServer.listen({
    port
  })
  console.log(`🚀server running on http://127.0.0.1:${port}`)
})