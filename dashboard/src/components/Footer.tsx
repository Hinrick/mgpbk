import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Footer: React.FC = () => {
  return (
    <Box component="footer" sx={{ bgcolor: "background.paper", py: 3 }}>
      <Typography variant="body1" align="center">
        © {new Date().getFullYear()} May Application
      </Typography>
      {/* Add more footer items here */}
    </Box>
  );
};

export default Footer;
