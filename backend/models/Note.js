// models/Note.js
// Una nota táctica pertenece a un juego, puede ser pública o privada y tiene votos
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  gameId: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  isPublic: { type: Boolean, default: true },
  usefulVotes: { type: Number, default: 0 },
  uselessVotes: { type: Number, default: 0 },
  author: { type: String, default: 'Anónimo' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Note', noteSchema);
