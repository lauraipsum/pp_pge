import React, { useState } from "react";
import { BiX } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  IconButton,
  Autocomplete,
} from "@mui/material";

import api from "../../../../api";

function ModalCadastro({ isOpen, closeModal }) {

  const tipoCargo = [        
    "Procurador",
    "Assessor"

  ];

  const [state, setState] = useState({
    loginSGP: '',
    tipoCargo: '',
    senha: ''

  });


  const handleChangeInputLoginSGP = async event => {
      const loginSGP = event.target.value
      setState({ loginSGP })
  }
  
  const handleChangeInputtipoCargo = async (event, value) => {
    setState(prevState => ({ ...prevState, tipoCargo: value }));
  }
  
  const handleChangeInputSenha = async event => {
    setState(prevState => ({ ...prevState, senha: event.target.value }));
  }

  const handleSave = async () => {
    const { loginSGP, tipoCargo, senha } = state;
    const payload = { loginSGP, tipoCargo, senha };
  
    try {
      await api.insertUsuario(payload);
      window.alert(`Usuario cadastrado com sucesso!`);
      setState({
        loginSGP: '',
        tipoCargo: '', 
        senha: '', 

      });
    }catch (error) {
      console.error('Erro:', error);
      console.log('Response data:', error.response.data);
    }
  };

  const handleCloseModal = () => {
    // fecha o modal
    setState({
      loginSGP: "",
      tipoCargo: "",
      senha: "",
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
      <DialogTitle>Cadastro</DialogTitle>
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
            label="Login SGP"
            size="small"
            sx={{
              width: "24rem",
              mb: "1.5rem",
            }}
            onChange={handleChangeInputLoginSGP}
          />

          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={tipoCargo}
            size="small"
            sx={{ width: "24rem" }}
            renderInput={(params) => (
              <TextField {...params} label="Cargo" />
            )}
            onChange={handleChangeInputtipoCargo}
          />
        </Box>
        
        <Box sx={{ display: "flex" }}>
          <Box
            sx={{ display: "flex", flexDirection: "column", width: "25rem" }}
          >

            <TextField
              variant="outlined"
              label="Senha"
              type="string"
              size="small"
              sx={{
                width: "15rem",
                mb: "1.5rem",
              }}
              onChange={handleChangeInputSenha}
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

export default ModalCadastro;