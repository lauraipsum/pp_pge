import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { BiPlusMedical,BiLogOut } from "react-icons/bi";

import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";

const options = [

  { name: "Processos", link: "/processos" },
  { name: "Caixa de Entrada", link: "/caixaEntrada" },
  { name: "Caixa de Saída", link: "/caixaSaida" },
  { name: "Caixa de Arquivados", link: "/caixaArquivados" },
  
  { name: "Sair", link: "/usuario" },

];

const drawerWidth = 240;

function Sidebar() {
  
  return (
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          color: "#5DE97B",
          
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        <Paper 
          sx={{ height: "100%", backgroundColor: "#5DE97B", borderRadius: 0, color: "#000",}}
        >

        <Box 
          sx={{ display: "flex",  alignItems: "center", justifyContent: "center", height: "64px",
          backgroundColor: "#1f4c32"}}
        >
          <Typography 
            sx={{ fontSize: "1.5rem", fontWeight: "bold", color: "#fff" }}
          >
            PGE
          </Typography>
        </Box>
        <List  >
          {options.map((option) => (
            <ListItem
           
              key={option.name}
              button
              component={NavLink}
              to={option.link}
            
            >
              <ListItemText  primary={option.name} />
            </ListItem>
          ))}
        </List>
        </Paper>
      </Drawer>
    );
  }
  
  
  

export default Sidebar;
