const contactResolvers = require('./contactRes.js')
const userResolvers = require('./userRes.js')

const resolvers = {
    Query: {
      ...userResolvers.Query
    },

    Mutation: {
      ...userResolvers.Mutation
    }
}


module.exports = resolvers