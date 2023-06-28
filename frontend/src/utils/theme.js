import { createTheme } from "@mui/material";

export const theme = createTheme(
    {
      palette: {
        primary: { main: "#1976d2" },
      },
    },
    ptBR, // x-data-grid translations
    pickersPtBR, // x-date-pickers translations
    corePtBR // core translations
  );