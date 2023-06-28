import React, { useEffect, useState } from "react";
import { GrDocumentText } from "react-icons/gr";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { BiPlus } from "react-icons/bi";
import { DataGrid, ptBR } from "@mui/x-data-grid";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ptBR as corePtBR } from "@mui/material/locale";
import { ptBR as pickersPtBR } from "@mui/x-date-pickers";
import { Box, Button, Typography } from "@mui/material";
import ModalNovaDieta from "../components/forms/modals/dieta/ModalNovaDieta";
import DietaDetails from "../components/forms/modals/dieta/DietaDetails";
import api from "../api";
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

function Dieta() {
  const columns = [
    { field: "codigo", headerName: "Código", width: 100 },
    {
      field: "nomeComercial",
      headerName: "Nome Comercial",
      width: 150,
      renderCell: (params) => {
        const nomeComercial =
          params.row.nomeComercial.length > 1
            ? params.row.nomeComercial[0] + "..."
            : params.row.nomeComercial[0];
        return <Typography variant="p">{nomeComercial}</Typography>;
      },
    },
    { field: "tipoDieta", headerName: "Tipo da Dieta", width: 150, sortable: false },
    { field: "ofertaCalorica", headerName: "Oferta calórica", width: 150 },
    { field: "ofertaProteica", headerName: "Oferta protéica", width: 150 },
    { field: "osmolaridade", headerName: "Osmolaridade", width: 150 },
    {
      field: "action",
      headerName: "Ações",
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
  const [isDietaOpen, setIsDietaOpen] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    api
      .getAllDietas()
      .then((res) => {
        setData(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const updateDieta = async (id,updatedData) => {
    try {

      const response = await api.updateDietaById(id,updatedData);
      const updatedDieta = response.data.data;
      // Atualiza o estado com a nova dieta atualizada
      setData((prevData) =>
        prevData.map((item) => (item.id === id ? updatedDieta : item))
      );
      console.log('Dieta atualizada:', updatedData);
    } catch (error) {
      console.error('Erro ao atualizar a dieta:', error);
    }
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: "2.5rem" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <GrDocumentText size={28} />
          <Typography variant="h4">Dietas</Typography>
        </Box>

        <Box sx={{ display: "flex", gap: "0.5rem" }}>
          <Button variant="contained" color="success" sx={{ display: "flex", gap: "0.1rem" }}>
            <AiOutlineUnorderedList size={26} />
            <Typography variant="p">Consultar</Typography>
          </Button>

          <Button
            variant="contained"
            sx={{ display: "flex", gap: "0.1rem" }}
            onClick={() => setIsDietaOpen(true)}
          >
            <BiPlus size={28} />
            <Typography variant="p">Nova Dieta</Typography>
          </Button>
        </Box>
      </Box>

      <ModalNovaDieta isOpen={isDietaOpen} closeModal={() => setIsDietaOpen(false)} />
      {isLoading ? (
        <Loading isLoading={isLoading} />
      ) : (
        <div style={{ height: "100vh", width: "100%" }}>
          <ThemeProvider theme={theme}>
            <DataGrid getRowId={(row) => row._id} rows={data} columns={columns} />
          </ThemeProvider>
        </div>
      )}

      <DietaDetails
        id={id}
        isOpen={isDetailsOpen}
        closeModal={() => setIsDetailsOpen(false)}
        dietaData={id ? data.find((dieta) => dieta._id === id) : {}}
        openDietaModal={() => console.log("openDietaModal")}
        setDetails={() => console.log("setDetails")}
        updateDieta={updateDieta} // Passa a função de atualização para o componente DietaDetails
      />
    </Box>
  );
}

export default Dieta;
