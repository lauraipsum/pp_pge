import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { BiX, BiPencil, BiTrash } from "react-icons/bi";

import Loading from "../../../Loading";
import ProcessoEdit from "./ProcessoEdit";
import ProcessoDelete from "./ProcessDelete";



function ProcessoDetails({
  isOpen,
  closeModal,
  openProcessoModal,
  setDetails,
  processoData,
  updateProcesso,
  deleteProcesso
}) {
  const [isLoading, setIsLoading] = useState(false);
  const data = processoData;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [processoToDelete, setProcessoToDelete] = useState(null);
  

  const openEditModal = () => {
    setDetails(data);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = () => {
    setProcessoToDelete(data);
    setIsDeleteModalOpen(true);
    closeModal();
    
  };

  return (
    <>
      {isLoading ? (
        <Loading isLoading={isLoading} />
      ) : (
        <Dialog
          open={isOpen}
          onClose={closeModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth={true}
          maxWidth="sm"
        >
          <DialogTitle>Processo {data.numero}</DialogTitle>
          <IconButton onClick={closeModal} style={{ position: "absolute", top: 8, right: 8 }}>
            <BiX color="red" />
          </IconButton>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Box
              sx={{
                boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
                padding: "1rem",
                borderRadius: "0.5rem",
              }}
            >
              <Typography variant="h6">Dados do Processo</Typography>
              <Box sx={{ display: "flex", gap: "1rem", my: "1rem" }}>
                <Typography variant="p">Número: {data?.numero}</Typography>
                <Typography variant="p">Status: {data?.status}</Typography>
              </Box>
              <Box>
                <Typography variant="p">
                  Descrição: {data?.descricao}
                </Typography>
              </Box>
            </Box>
          </DialogContent>

          <DialogActions>
            <IconButton onClick={openEditModal}>
              <BiPencil color="black" />
            </IconButton>

            <IconButton onClick={openDeleteModal}>
              <BiTrash color="black" />
            </IconButton>
          </DialogActions>
        </Dialog>
      )}

      <ProcessoEdit
        isOpen={isEditModalOpen}
        closeModal={() => setIsEditModalOpen(false)}
        updateProcesso={updateProcesso}
        processoData={data}
      />

      
      <ProcessoDelete
        isOpen={isDeleteModalOpen}
        closeModal={() => setIsDeleteModalOpen(false)}
        deleteProcesso={deleteProcesso} 
        processoData={data}
      />
    </>
  );
}

export default ProcessoDetails;
