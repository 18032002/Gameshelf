// graphql/resolvers.js
// Implementación de las funciones que responden a las consultas y mutaciones
const Game = require('../models/Game');
const Note = require('../models/Note');

const resolvers = {
  // Resolvers para campos anidados
  Game: {
    notes: async (parent) => {
      return await Note.find({ gameId: parent.id, isPublic: true });
    }
  },
  Note: {
    game: async (parent) => {
      return await Game.findById(parent.gameId);
    }
  },

  // Queries
  Query: {
    games: async () => await Game.find(),
    game: async (_, { slug }) => await Game.findOne({ slug }),
    notes: async (_, { gameId, isPublic }) => {
      const filter = {};
      if (gameId) filter.gameId = gameId;
      if (isPublic !== undefined) filter.isPublic = isPublic;
      return await Note.find(filter);
    },
    note: async (_, { id }) => await Note.findById(id)
  },

  // Mutations
  Mutation: {
    createNote: async (_, { gameId, title, content, isPublic, author }) => {
      const note = new Note({
        gameId,
        title,
        content,
        isPublic,
        author: author || 'Anónimo'
      });
      await note.save();
      return note;
    },
    voteNote: async (_, { id, vote }) => {
      const note = await Note.findById(id);
      if (!note) throw new Error('Nota no encontrada');
      if (vote === 'useful') note.usefulVotes += 1;
      else if (vote === 'useless') note.uselessVotes += 1;
      else throw new Error('Voto inválido');
      await note.save();
      return note;
    }
  }
};

module.exports = resolvers;
