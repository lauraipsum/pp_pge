import React from "react";
import Header from "./HeaderLogin";
import { Box } from "@mui/material";

function Layout({ children }) {

  return (
    <div className="App">
      <Box sx={{ width: "100%" }}>
      <Header/>
        <Box
          sx={{
            width: "100%",
            minHeight: "63px",
          }}
        ></Box>
        <Box sx={{ maxWidth: '1180px', mx: 'auto', px: 5, py: 2 }}>
          <Box>{children}</Box>
        </Box>
      </Box>
    </div>
  );
}

export default Layout;
