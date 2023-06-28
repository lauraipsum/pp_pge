const express = require('express');
const ProcessoCtrl = require('../controllers/processo-ctrl'); 

const router = express.Router();

router.post('/processo', ProcessoCtrl.createProcesso);
router.put('/processo/:id', ProcessoCtrl.updateProcesso);
router.delete('/processo/:id', ProcessoCtrl.deleteProcesso);
router.get('/processo/:id', ProcessoCtrl.getProcessoById);
router.get('/processos', ProcessoCtrl.getProcessos);


module.exports = router;
