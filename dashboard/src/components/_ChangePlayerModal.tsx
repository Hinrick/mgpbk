import React from "react";
import { Box, Typography, Modal } from "@mui/material";

import TransferList from "./TransferList";

const Footer: React.FC<{
  open: boolean;
  handleClose: () => void;
  players: any[];
}> = ({ open, handleClose, players }) => {
  return (
    <Box>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            bgcolor: "background.paper",
            width: 500,
            borderRadius: 2,
            p: 2,
            position: "absolute",
            top: "20%",
            left: "calc(50vw - 266px)",
          }}>
          <Typography variant="h6" component="h2">
            球員換人
          </Typography>
          <Typography sx={{ mt: 1 }}>
            請將先發球員拉致左邊的列表，並將替補球員拉至右邊的列表
          </Typography>
          <Box
            sx={{
              p: 2,
            }}>
            <TransferList players={players} />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Footer;
