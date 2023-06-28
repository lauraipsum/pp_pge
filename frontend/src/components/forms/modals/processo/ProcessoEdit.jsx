import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { BiPlus, BiX, BiTrash } from "react-icons/bi";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,

} from "@mui/material";

function ProcessoEdit({ isOpen, closeModal, updateProcesso, processoData }) {
  const [processo, setProcesso] = useState(processoData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProcesso((prevProcesso) => ({
      ...prevProcesso,
      [name]: value
    }));
  };

  const handleUpdate = () => {
    const updatedProcesso = { ...processo };
    updateProcesso(processo._id, updatedProcesso);
    closeModal();
  };

  useEffect(() => {
    console.log("processoData:", processoData);
    setProcesso(processoData);
  

  }, [processoData]);
  

  return (
    <Dialog
      open={isOpen}
      onClose={closeModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth={true}
      maxWidth="sm"
    >
      <DialogTitle>Editar Processo</DialogTitle>
      <IconButton
        onClick={closeModal}
        style={{ position: "absolute", top: 8, right: 8 }}
      >
        <BiX />
      </IconButton>
      <DialogContent>
        <TextField
          name="numero"
          label="Número"
          value={processo.numero}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          name="status"
          label="Status"
          value={processo.status}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="descricao"
          label="Descrição"
          value={processo.descricao}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>Cancelar</Button>
        <Button onClick={handleUpdate} color="primary">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ProcessoEdit;
