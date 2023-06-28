import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import ModalCadastro from "../components/forms/modals/usuario/ModalCadastro";
import ModalLogin from "../components/forms/modals/usuario/ModalLogin";
import nuvem from "../../assets/Cloud.png";
import "../../styles/animation.css";
import Layout from "../components/Layout"


function Usuario() {

  const [isCadastroOpen, setIsCadastroOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (

    
    <Layout>
    <Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection:"row", mb: "3rem" }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "", gap: "0.5rem", paddingRight: "45px" }}>
          <Typography variant="h2"><strong>Bem-vindo ao <br></br>Tobias Informador</strong></Typography>
          <Typography variant="h5">O Tobias é uma inteligência Artificial projetada para Coletar, Refinar e <strong>Informar</strong></Typography>
          <Typography variant="h5">Todos os dias,são coletados informes dos principais portais jurídicos e, com o <strong>Tobias Informador</strong>, você pode escolher os temas de seu interesse e receber em seu e-mail sempre que houver novas notícias!</Typography>
          <Box sx={{ display: "flex", gap: "0.5rem",flexDirection: "column" }}>
            <Button
              variant="contained"
              color="success"
              sx={{ display: "flex", gap: "0.1rem", backgroundColor: "#2DEA56" }}
              onClick={() => setIsLoginOpen(true)}
            >
              <Typography variant="p">Entrar</Typography>
            </Button>
            <Button
              variant="contained"
              sx={{ display: "flex", gap: "0.1rem", backgroundColor: "#5DE97B"  }}
              onClick={() => setIsCadastroOpen(true)}
            >
              <Typography variant="p"><strong>Cadastrar com a conta do SGP</strong> </Typography>
            </Button>
          </Box>
        </Box>
        <img src={nuvem} alt="Tobias Informador Logo" style={{ width: "500px", height: "500px", paddingLeft: "30px", animation: 'floating 3s ease-in-out infinite',}}/>
     
      </Box>

      <ModalCadastro
        isOpen={isCadastroOpen}
        closeModal={() => setIsCadastroOpen(false)}
      />

      <ModalLogin
        isOpen={isLoginOpen}
        closeModal={() => setIsLoginOpen(false)}
      />

    </Box>
    </Layout>
  ); 
}

export default Usuario;
