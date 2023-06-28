import React, { useEffect, useState } from "react";
import { GrDocumentText } from "react-icons/gr";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { BiPlus } from "react-icons/bi";
import { DataGrid, ptBR } from "@mui/x-data-grid";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ptBR as corePtBR } from "@mui/material/locale";
import { ptBR as pickersPtBR } from "@mui/x-date-pickers";
import { Box, Button, Typography } from "@mui/material";
import ModalNovoProcesso from "../components/forms/modals/processo/ModalNovoProcesso";
import ProcessoDetails from "../components/forms/modals/processo/ProcessoDetails";
import api from "../api";
import Sidebar from "./Sidebar";
import Loading from "../components/Loading";

const theme = createTheme(
  {
    palette: {
      primary: { main: "#1976d2" },
    },
  },
  ptBR, // x-data-grid translations
  pickersPtBR, // x-date-pickers translations
  corePtBR // core translations
);

function Processos({ isOpen, closeModal })  {
  const columns = [
    { field: "numero", headerName: "Número", width: 100 },
    { field: "status", headerName: "Status", width: 150, sortable: false },
    { field: "descricao", headerName: "Descrição", width: 150 },
    {
      width: 250,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: "flex" }}>
          <Button
            variant="contained"
            color="success"
            onClick={() => handleOpenDetails(params.row._id)}
            sx={{ display: "flex", gap: "0.2rem" }}
          >
            <AiOutlineUnorderedList size={26} />
            <Typography variant="p">Detalhes</Typography>
          </Button>
        </Box>
      ),
    },
  ];

  const handleOpenDetails = (id) => {
    console.log('ID:', id);
    setId(id);
    setIsDetailsOpen(true);
  };

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [details, setDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [id, setId] = useState(0);
  const [isProcessoOpen, setIsProcessoOpen] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    api
      .getAllProcessos()
      .then((res) => {
        setData(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const updateProcesso = async (id, updatedData) => {
    try {
      const response = await api.updateProcessoById(id, updatedData);
      const updatedProcesso = response.data.data;
      setData((prevData) =>
        prevData.map((item) => (item.id === id ? updatedProcesso : item))
      );
      console.log('Processo atualizado:', updatedData);
    } catch (error) {
      console.error('Erro ao atualizar o processo:', error);
    }
  };

  const deleteProcesso = async (id) => {
    try {
      await api.deleteProcessoById(id);
      setData((prevData) => prevData.filter((item) => item.id !== id));
      console.log('Processo removido:', id);
    } catch (error) {
      console.error('Erro ao remover o processo:', error);
    }
  };
  
  return (
    <div className="Main">
      {location.pathname !== "/login" && <Sidebar />}

      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: "2.5rem" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <GrDocumentText size={28} />
            <Typography variant="h4">Processos</Typography>
          </Box>

          <Box sx={{ display: "flex", gap: "0.5rem" }}>
            <Button
              variant="contained"
              sx={{ display: "flex", gap: "0.1rem" }}
              onClick={() => setIsProcessoOpen(true)}
            >
              <BiPlus size={28} />
              <Typography variant="p">Novo Processo</Typography>
            </Button>
          </Box>
        </Box>
        {isLoading ? (
          <Loading isLoading={isLoading} />
        ) : (
          <div style={{ paddingInline: "20%", width: "70%" }}>
            <ThemeProvider theme={theme}>
              <DataGrid getRowId={(row) => row._id} rows={data} columns={columns} />
            </ThemeProvider>
          </div>
        )}
      </Box>
      <ModalNovoProcesso isOpen={isProcessoOpen} closeModal={() => setIsProcessoOpen(false)} />
      <ProcessoDetails
        id={id}
        isOpen={isDetailsOpen}
        closeModal={() => setIsDetailsOpen(false)}
        setDetails={setDetails}
        processoData={id ? data.find((processo) => processo._id === id) : {}}
        updateProcesso={updateProcesso}
        deleteProcesso={deleteProcesso}

      />

    </div>
  );
}

export default Processos;
