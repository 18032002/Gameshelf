// server.js
// Punto de entrada del backend: configura Apollo Server, conecta DB y arranca
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const connectDB = require('./config/db');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

// Conectar a MongoDB (la URI viene de docker-compose)
connectDB();

const server = new ApolloServer({ typeDefs, resolvers });

startStandaloneServer(server, {
  listen: { port: 4000 },
  // Habilitar CORS para que el frontend (en otro puerto) pueda llamar
  cors: {
    origin: '*',
    credentials: true
  }
}).then(({ url }) => {
  console.log(`🚀 Servidor GraphQL listo en ${url}`);
});
