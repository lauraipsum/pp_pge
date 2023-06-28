import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import tobiasBarreto from "../../assets/tobiasB.png";
import ModalCadastro from "./forms/modals/usuario/ModalCadastro";
import ModalLogin from "./forms/modals/usuario/ModalLogin";

export default function Header() {
    const [isCadastroOpen, setIsCadastroOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
        
    return (
        <AppBar position="static"  sx={{ backgroundColor: 'white' }}>
            <Toolbar>
                <img src={tobiasBarreto} alt="Tobias Informador Logo" style={{ width: "50px", height: "auto",  borderRadius: '10%'}}/>
                <Typography variant="h6"
                    component="div" sx={{ flexGrow: 1 ,color: 'black', paddingLeft: "1rem"}} >
                    <strong>Tobias</strong> Informador
                </Typography>
                    <Button sx={{color: 'black', paddingInline: "5rem"} } onClick={() => setIsLoginOpen(true)}>LOGIN</Button>
                    <Button sx={{color: 'green',paddingInline: "5rem",border: '1px solid green'}} onClick={() => setIsCadastroOpen(true)}
>CADASTRAR</Button>
            </Toolbar>

            
      <ModalCadastro
        isOpen={isCadastroOpen}
        closeModal={() => setIsCadastroOpen(false)}
      />

      <ModalLogin
        isOpen={isLoginOpen}
        closeModal={() => setIsLoginOpen(false)}
      />
        </AppBar>
    );
}
