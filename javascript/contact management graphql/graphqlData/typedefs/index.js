
const gql = require('graphql-tag');
const { GraphQLUpload } = require("graphql-upload");
// const { finished } = require('stream/promises');

module.exports = gql`
    scalar Upload

    type File {
        url:String!
    }

    type User {
        id: Int!,
        name:String!,
        email:String!,
        password:String!,
        photo:String!,
        createdAt: String,
        updatedAt: String          
    }

    type Query {
        getAllUsers: [User]!,
        getUser(id:Int!): User!,
    }
    
    input UserInput {
        name:String!,
        email:String!,
        password:String!,
        photo:String
    }   

    input UserLogin {
        email:String!,
        password:String!
    }

    type LoginRes {
        token:String!
    }

    type Response {
        status:String!,
        data:LoginRes
    }

    type Mutation {
        createUser(userBody:UserInput): String!,
        loginUser(userBody:UserLogin): Response!,
        singleFileUpload(file:Upload): File!,
    }

`