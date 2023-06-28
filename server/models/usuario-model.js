const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
  loginSGP: { type: String, required: true },
  tipoCargo: { type: String, required: true },
  senha: { type: String, required: true },
}, { timestamps: true });

/*
UsuarioSchema.pre('save', async function (next) {
  const usuario = this;

  // Verifica se a senha foi modificada ou se é um usuário novo
  if (!usuario.isModified('senha')) {
    return next();
  }

  try {
    // Gera um salt para a criptografia da senha
    const salt = await bcrypt.genSalt(10);

    // Criptografa a senha usando o salt gerado
    const hash = await bcrypt.hash(usuario.senha, salt);

    // Substitui a senha original pela senha criptografada
    usuario.senha = hash;

    next();
  } catch (error) {
    return next(error);
  }
});

// Método para verificar se a senha fornecida corresponde à senha armazenada
UsuarioSchema.methods.validarSenha = async function (senha) {
  try {
    // Compara a senha fornecida com a senha armazenada no banco de dados
    return await bcrypt.compare(senha, this.senha);
  } catch (error) {
    throw error;
  }
};
*/

module.exports = mongoose.model('Usuario', UsuarioSchema);
