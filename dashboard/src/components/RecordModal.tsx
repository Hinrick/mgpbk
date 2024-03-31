import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Modal,
  Button,
  Checkbox,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";

const RecordModal: React.FC<{
  type: string;
  open: boolean;
  handleClose: () => void;
  players: any[];
}> = ({ type, open, handleClose, players }) => {
  const [dataType, setDataType] = React.useState<string>("");
  const [playerId, setPlayerId] = React.useState<string>("");

  const handleSelectPlayer = (playerId: string) => {
    setPlayerId(playerId);
  };

  const handleSubmit = () => {
    console.log(playerId);
    handleClose();
  };

  useEffect(() => {
    switch (type) {
      case "rebounds":
        setDataType("籃板");
        break;
      case "assists":
        setDataType("助攻");
        break;
      case "steals":
        setDataType("抄截");
        break;
      case "blocks":
        setDataType("阻攻");
        break;
      case "turnovers":
        setDataType("失誤");
        break;
      default:
        break;
    }
  }, [type]);

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
            球員{dataType}紀錄
          </Typography>
          <Typography sx={{ mt: 1 }}>請選擇球員進行記錄</Typography>
          <Box
            sx={{
              p: 2,
            }}>
            <Box>
              <List>
                <ListItemButton onClick={() => handleSelectPlayer("test")}>
                  <ListItemIcon>
                    <Checkbox />
                  </ListItemIcon>
                  <ListItemText primary="王路翔" />
                </ListItemButton>
                <ListItemButton onClick={() => handleSelectPlayer("test")}>
                  <ListItemIcon>
                    <Checkbox />
                  </ListItemIcon>
                  <ListItemText primary="王路翔" />
                </ListItemButton>
                <ListItemButton onClick={() => handleSelectPlayer("test")}>
                  <ListItemIcon>
                    <Checkbox />
                  </ListItemIcon>
                  <ListItemText primary="王路翔" />
                </ListItemButton>
                <ListItemButton onClick={() => handleSelectPlayer("test")}>
                  <ListItemIcon>
                    <Checkbox />
                  </ListItemIcon>
                  <ListItemText primary="王路翔" />
                </ListItemButton>
                <ListItemButton onClick={() => handleSelectPlayer("test")}>
                  <ListItemIcon>
                    <Checkbox />
                  </ListItemIcon>
                  <ListItemText primary="王路翔" />
                </ListItemButton>
              </List>
            </Box>
            <Box
              sx={{
                pt: 2,
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}>
              <Button
                variant="contained"
                disabled={!playerId}
                onClick={handleSubmit}>
                儲存
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default RecordModal;
