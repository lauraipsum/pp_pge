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


function ModalLogin({ isOpen, closeModal }) {

  const [state, setState] = useState({
    loginSGP: "",
    senha: "",
  });

  const handleChangeInputLoginSGP = (event) => {
    const loginSGP = event.target.value;
    setState((prevState) => ({ ...prevState, loginSGP }));
  };

  const handleChangeInputSenha = (event) => {
    setState((prevState) => ({ ...prevState, senha: event.target.value }));
  };
  const handleSave = async (event) => {
    event.preventDefault();

    const { loginSGP, senha } = state;
  
    const payload = {
      loginSGP: loginSGP,
      senha: senha
    };
  
    try {
      const response = await api.authenticateUsuario(payload);

      if (response.status = 200) {
        window.alert("Usuário autenticado com sucesso!");
        setState({
          loginSGP: "",
          senha: "",
        });
        closeModal();
        window.location.href = "/processos";
      } else {
        window.alert( "Credenciais inválidas. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro:", error);
      console.log("Response data:", error.response?.data);
    }
  };
  
  const handleCloseModal = () => {
    // Fecha o modal
    setState({
      loginSGP: "",
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
      <DialogTitle>Login</DialogTitle>
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
        </Box>

        <Box sx={{ display: "flex" }}>
          <Box sx={{ display: "flex", flexDirection: "column", width: "25rem" }}>
            <TextField
              variant="outlined"
              label="Senha"
              type="password"
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
        <Button onClick={handleSave}>Entrar</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModalLogin;
