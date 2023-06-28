import React, { useState } from "react";
import { BiX } from "react-icons/bi";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  IconButton,
} from "@mui/material";

import api from "../../../../api";

function ModalNovoProcesso({ isOpen, closeModal }) {


  const [state, setState] = useState({
    numero: '',
    status: '',
    descricao: ''

  });


  const handleChangeInputNumero = async event => {
    setState(prevState => ({ ...prevState, numero: event.target.value }));
  }

  const handleChangeInputStatus = async event => {
    setState(prevState => ({ ...prevState, status: event.target.value }));
  }

  
  const handleChangeInputDescricao = async event => {
    setState(prevState => ({ ...prevState, descricao: event.target.value }));
  }

  const handleSave = async () => {
    const { numero, status, descricao } = state;
    const payload = { numero, status, descricao };
  
    try {
      await api.insertProcesso(payload);
      window.alert(`Proceso cadastrado com sucesso!`);
      setState({
        numero: '',
        status: '', 
        descricao: '', 

      });
    }catch (error) {
      console.error('Erro:', error);
      console.log('Response data:', error.response.data);
    }
  };

  const handleCloseModal = () => {
    setState({
      numero: "",
      status: "",
      descricao: "",
    });
    closeModal();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => {}}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth={true}
      maxWidth="md"
    >
      <DialogTitle>Novo Processo</DialogTitle>
      <IconButton
        onClick={handleCloseModal}
        sx={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          width: "2.5rem",
          height: "2.5rem",
          ":hover": {
            backgroundColor: "#ffc8c8",
          },
        }}
      >
        <BiX color="red" />
      </IconButton>

      <DialogContent sx={{ mx: "auto" }}>
        <Box sx={{ display: "flex", gap: "1.0rem" }}>
          <TextField
            variant="outlined"
            label="Número do Processo"
            size="small"
            sx={{
              width: "24rem",
              mb: "1.5rem",
            }}
            onChange={handleChangeInputNumero}
          />
          <TextField
            variant="outlined"
            label="Status"
            size="small"
            sx={{
              width: "24rem",
              mb: "1.5rem",
            }}
            onChange={handleChangeInputStatus}
          />

        </Box>
        
        <Box sx={{ display: "flex" }}>
          <Box
            sx={{ display: "flex", flexDirection: "column", width: "25rem" }}
          >

            <TextField
              variant="outlined"
              label="Descrição"
              type="string"
              size="small"
              sx={{
                width: "15rem",
                mb: "1.5rem",
              }}
              onChange={handleChangeInputDescricao}
            />
          </Box>
          
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal}>Cancelar</Button>
        <Button onClick={handleSave}>Salvar</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModalNovoProcesso;