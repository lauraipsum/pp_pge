const Processo = require('../models/processo-model');

const createProcesso = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Você deve fornecer um processo',
        });
    }

    const processo = new Processo(body);

    if (!processo) {
        return res.status(400).json({ success: false, error: err });
    }

    processo
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: processo._id,
                message: 'Processo adicionado!',
            });
        })
        .catch((error) => {
            return res.status(400).json({
                error,
                message: 'Processo não adicionado!',
            });
        });
};

const updateProcesso = async (req, res) => {
    const body = req.body;
    console.log('Request Body:', body); 

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Você deve fornecer um corpo para atualizar',
        });
    }

    try {
        const processo = await Processo.findOne({ _id: req.params.id });
        console.log('Processo:', processo);

        if (!processo) {
            return res.status(404).json({
                message: 'Processo não encontrado!',
            });
        }

        if (body.numero) {
            processo.numero = body.numero;
        }
        if (body.descricao) {
            processo.descricao = body.descricao;
        }
        if (body.status) {
            processo.status = body.status;
        }


        await processo.save();

        console.log('Processo atualizado:', processo);

        return res.status(200).json({
            success: true,
            id: processo._id,
            message: 'Processo atualizado!',
        });
    } catch (error) {
        console.log('Erro na atualização:', error);
        return res.status(404).json({
            error,
            message: 'Processo não atualizado!',
        });
    }
};

const deleteProcesso = async (req, res) => {
    try {
      const processo = await Processo.findOneAndDelete({ _id: req.params.id });
  
      if (!processo) {
        return res.status(404).json({
          success: false,
          error: `Processo não encontrado`,
        });
      }
  
      return res.status(200).json({ success: true, data: processo });
    } catch (error) {
      console.error('Erro ao remover o processo:', error);
      return res.status(400).json({ success: false, error });
    }
  };
  

const getProcessoById = async (req, res) => {
    try {
        const processo = await Processo.findOne({ _id: req.params.id }).exec();

        if (!processo) {
            return res.status(404).json({
                message: 'Processo não encontrado!',
            });
        }

        return res.status(200).json({
            success: true,
            data: processo,
        });
    } catch (error) {
        console.log('Erro na obtenção do processo:', error);
        return res.status(500).json({
            error,
            message: 'Erro ao obter processo!',
        });
    }
};

const getProcessos = async (req, res) => {
    Processo.find({})
        .then((processos) => {
            return res.status(200).json({ success: true, data: processos });
        })
        .catch((err) => {
            return res.status(400).json({ success: false, error: err });
        });
};

module.exports = {
    createProcesso,
    updateProcesso,
    deleteProcesso,
    getProcessos,
    getProcessoById,
};
