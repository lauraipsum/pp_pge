
import React, { useState, useEffect } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from "@mui/material";
import { BiX, BiTrash } from "react-icons/bi";

function ProcessoDelete({ isOpen, closeModal, deleteProcesso,processoData }) {

const [processo, setProcesso] = useState(processoData);

  const handleDelete = () => {
    deleteProcesso(processoData._id);
    closeModal();
  };

console.log(processoData._id)

  return (
    <Dialog
      open={isOpen}
      onClose={closeModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth={true}
      maxWidth="sm"
    >
      <DialogTitle>Deletar Processo</DialogTitle>
      <IconButton
        onClick={closeModal}
        style={{ position: "absolute", top: 8, right: 8 }}
      >
        <BiX />
      </IconButton>
      <DialogContent>
        <p>Deseja realmente excluir o processo?</p>
        <p>Essa ação é irreversível.</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>Cancelar</Button>
        <Button onClick={handleDelete} color="error" autoFocus>
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ProcessoDelete;
