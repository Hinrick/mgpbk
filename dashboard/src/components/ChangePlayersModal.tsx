import React from "react";
import {
  Box,
  Typography,
  Modal,
  Checkbox,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "../hooks";
import { updateGamePlayerData } from "../store/slices/gameSlice";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ChangePlayersModal: React.FC<{
  open: boolean;
  handleClose: () => void;
  players: any[];
  clockoutPlayerId: string;
}> = ({ open, handleClose, players, clockoutPlayerId }) => {
  const dispatch = useAppDispatch();
  let query = useQuery();
  let home = query.get("home") ? true : false;
  const game: any = useAppSelector((state) => state.game.game);

  const handleSelectPlayer = (playerId: string) => {
    let data;
    if (home) {
      data = game[game.teamAId].players.map((player: any) => {
        if (player.id === clockoutPlayerId) {
          return {
            ...player,
            isStarting: false,
          };
        } else if (player.id === playerId) {
          return {
            ...player,
            isStarting: true,
          };
        } else {
          return player;
        }
      });
    } else {
      data = game[game.teamBId].players.map((player: any) => {
        if (player.id === clockoutPlayerId) {
          return {
            ...player,
            isStarting: false,
          };
        } else if (player.id === playerId) {
          return {
            ...player,
            isStarting: true,
          };
        } else {
          return player;
        }
      });
    }

    dispatch(
      updateGamePlayerData({
        gameId: game.id,
        teamId: home ? game.teamAId : game.teamBId,
        data: data,
      })
    );

    handleClose();
  };

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
            請選擇球員進行記錄
          </Typography>
          <Typography
            sx={{
              my: 1,
              ">span": {
                fontWeight: 600,
                textDecoration: "underline",
              },
            }}>
            下場球員 :{" "}
            <span>
              {clockoutPlayerId
                ? game[home ? game.teamAId : game.teamBId].players.filter(
                    (player: any) => player.id === clockoutPlayerId
                  )[0].name
                : ""}
            </span>
          </Typography>
          <Typography>請選擇上場球員</Typography>
          <Box
            sx={{
              px: 2,
              pb: 2,
            }}>
            <Box>
              <List>
                {players.map((player) => (
                  <ListItemButton onClick={() => handleSelectPlayer(player.id)}>
                    <ListItemIcon>
                      <Checkbox />
                    </ListItemIcon>
                    <ListItemText
                      primary={`${player.jerseyNumbers} ${player.name}`}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Box>
            {/* <Box
              sx={{
                pt: 2,
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}>
              <Button variant="contained" onClick={handleSubmit}>
                儲存
              </Button>
            </Box> */}
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ChangePlayersModal;
