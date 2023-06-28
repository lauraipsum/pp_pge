const Usuario = require('../models/usuario-model')
const createUsuario = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Você deve fornecer um usuário',
        })
    }

    const usuario = new Usuario(body)

    if (!usuario) {
        return res.status(400).json({ success: false, error: err })
    }

    usuario
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: usuario._id,
                message: 'Usuário adicionado!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Usuário não adicionado!',
            })
        })
}


const updateUsuario = async (req, res) => {
    const body = req.body;
    console.log("Request Body:", body);

    if (!body) {
        return res.status(400).json({
            success: false,
            error: "Você deve fornecer um corpo para atualizar",
        });
    }

    try {
        const usuario = await Usuario.findOne({ _id: req.params.id });
        console.log("Usuário:", usuario);

        if (!usuario) {
            return res.status(404).json({
                message: "Usuário não encontrado!",
            });
        }

        if (body.nome) {
            usuario.nome = body.nome;
        }
      

        await usuario.save();

        console.log("Usuário atualizado:", usuario);

        return res.status(200).json({
            success: true,
            id: usuario._id,
            message: "Usuário atualizado!",
        });
    } catch (error) {
        console.log("Erro na atualização:", error);
        return res.status(404).json({
            error,
            message: "Usuário não atualizado!",
        });
    }
};

const deleteUsuario = async (req, res) => {
    await Usuario.findOneAndDelete({ _id: req.params.id }, (err, usuario) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!usuario) {
            return res
                .status(404)
                .json({ success: false, error: `Usuário não encontrado` })
        }

        return res.status(200).json({ success: true, data: usuario })
    }).catch(err => console.log(err))
}

const getUsuarioById = async (req, res) => {
    try {
        const usuario = await Usuario.findOne({ _id: req.params.id }).exec();

        if (!usuario) {
            return res.status(404).json({
                message: "Usuário não encontrado!",
            });
        }

        return res.status(200).json({
            success: true,
            data: usuario,
        });
    } catch (error) {
        console.log("Erro na obtenção do usuário:", error);
        return res.status(500).json({
            error,
            message: "Erro ao obter usuário!",
        });
    }
};

const getUsuarios = async (req, res) => {
    Usuario.find({})
        .then(usuarios => {
            return res.status(200).json({ success: true, data: usuarios })
        })
        .catch(err => {
            return res.status(400).json({ success: false, error: err })
        })
}

const authenticateUsuario = async (loginSGP, senha) => {
    try {
        console.log('Iniciando autenticação do usuário...');
        console.log('LoginSGP:', loginSGP);
        console.log('Senha:', senha); 


        const usuario = await Usuario.findOne({ loginSGP });

        if (!usuario) {
            console.log('Usuário não encontrado');
            return { success: false, message: 'Usuário não encontrado' };
        }

        console.log('Usuário encontrado:', usuario);

        if (senha === usuario.senha) {
            console.log('Autenticação bem-sucedida');
            return { success: true, message: 'Autenticação bem-sucedida' };
        } else {
            console.log('Credenciais inválidas');
            return { success: false, message: 'Credenciais inválidas' };
        }
    } catch (error) {
        console.error('Erro ao autenticar o usuário:', error);
        return { success: false, message: 'Erro ao autenticar o usuário' };
    }
};
  
module.exports = {
    createUsuario,
    updateUsuario,
    deleteUsuario,
    getUsuarios,
    getUsuarioById,
    authenticateUsuario,
}
