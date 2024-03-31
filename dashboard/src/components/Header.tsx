import React from "react";
import { AppBar, Avatar, Box } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <AppBar
      component="header"
      sx={{
        bgcolor: "secondary.main",
        py: 1,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        position: "sticky",
      }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "50px",
          height: "50px",
        }}>
        <img
          src={"/img/logo.png"}
          alt="logo"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />
      </Box>
      <Avatar />
    </AppBar>
  );
};

export default Footer;
