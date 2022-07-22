const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');

const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./schema/schema');
// graphql resolvers
const { Query } = require('./resolvers/Query');
const { User } = require('./resolvers/User');
const { Order } = require('./resolvers/Order');
const { Review } = require('./resolvers/Review');
const { Mutation } = require('./resolvers/Mutation');
const { getUserFromToken } = require('./utils/getUserFromToken');

dotenv.config({ path: "./../config.env" });

const MONGO_URI = process.env.DB_URI;

if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI');
}

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to Database'))
.catch(error => console.error('Mongo Connection Error', error));

async function initServer() {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers: {
      Query,
      User,
      Order,
      Review,
      Mutation
    },
    context: async({ req }) => {
      const userInfo =  await getUserFromToken(req.headers.authorization)
      return userInfo
    }
  })

  const limiter = rateLimit({
    max: 100,
    windowMS: 60 *60 * 1000, 
    message: 'Too many requests from this IP, please try again in an hour'
  });
  app.use('/graphql', limiter);

  app.use(mongoSanitize());

  app.use(xss());

  await server.start();

  server.applyMiddleware({ 
    app,
    cors: {
      origin: 'http://localhost:3000'
    } 
  })
  app.use((req, res) => {
    res.send("Server started successfully!")
  })
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  })
}

initServer();


// module.exports = app;
