const express = require('express');
const UsuarioCtrl = require('../controllers/usuario-ctrl');

const router = express.Router();

router.post('/usuario', UsuarioCtrl.createUsuario);
router.put('/usuario/:id', UsuarioCtrl.updateUsuario);
router.delete('/usuario/:id', UsuarioCtrl.deleteUsuario);
router.get('/usuario/:id', UsuarioCtrl.getUsuarioById);
router.get('/usuarios', UsuarioCtrl.getUsuarios);

router.post('/authenticate', async (req, res) => {
  const { loginSGP, senha } = req.body;

  try {
    const response = await UsuarioCtrl.authenticateUsuario(loginSGP, senha);
    console.log('Parâmetros recebidos:', loginSGP, senha); 

    if (response.success) {
      return res.status(200).json({ success: true, message: response.message });
    } else {
      return res.status(401).json({ success: false, message: response.message });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Erro ao autenticar o usuário' });
  }
});


module.exports = router;
