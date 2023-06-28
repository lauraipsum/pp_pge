const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const Processo = new Schema({
  numero: { type: String},
  descricao: { type: String},
  status: { type: String},
}, { timestamps: true });


module.exports = mongoose.model('Processo', Processo);
