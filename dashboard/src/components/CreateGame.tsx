import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Modal,
  Button,
  TextField,
  Select,
  MenuItem,
  Divider,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import dayjs from "dayjs";

import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchTeamsByLeague } from "../store/slices/teamSlice";
import { createGame } from "../store/slices/gameSlice";
import address from "../data/address.json";

const RecordModal: React.FC<{
  open: boolean;
  handleClose: () => void;
  seasonId: string;
}> = ({ open, handleClose, seasonId }) => {
  const dispatch = useAppDispatch();
  const teams = useAppSelector((state) => state.team.teams);
  const teamStatus = useAppSelector((state) => state.team.status);
  const teamError = useAppSelector((state) => state.team.error);

  const [data, setData] = React.useState({
    teamAId: "",
    teamBId: "",
    startedDateTime: new Date(),
    endedDateTime: new Date(),
    updateBy: "test",
    createdBy: "test",
  });

  console.log(data);

  const handleSubmit = () => {
    dispatch(
      createGame({
        ...data,
        seasonId: seasonId,
      })
    );
    handleClose();
  };

  useEffect(() => {
    if (teamStatus === "idle") {
      dispatch(fetchTeamsByLeague());
    }
  }, [teamStatus, dispatch]);

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
            建立新球賽
          </Typography>
          <Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 2,
                }}>
                <Select
                  label="主隊"
                  size="small"
                  variant="outlined"
                  fullWidth
                  value={data.teamAId}
                  onChange={(e) =>
                    setData({
                      ...data,
                      teamAId: e.target.value,
                    })
                  }
                  displayEmpty>
                  <MenuItem value="" disabled>
                    選擇球隊
                  </MenuItem>
                  {teams.map((team) => (
                    <MenuItem key={team.id} value={team.id}>
                      {team.name}
                    </MenuItem>
                  ))}
                </Select>
                <Select
                  label="客隊"
                  size="small"
                  variant="outlined"
                  fullWidth
                  value={data.teamBId}
                  onChange={(e) =>
                    setData({
                      ...data,
                      teamBId: e.target.value,
                    })
                  }
                  displayEmpty>
                  <MenuItem value="" disabled>
                    選擇球隊
                  </MenuItem>
                  {teams.map((team) => (
                    <MenuItem key={team.id} value={team.id}>
                      {team.name}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 2,
                }}>
                <TextField
                  label="開始時間"
                  type="datetime-local"
                  size="small"
                  variant="outlined"
                  fullWidth
                  value={dayjs(new Date(data.startedDateTime)).format(
                    "YYYY-MM-DDTHH:mm"
                  )}
                  onChange={(e) => {
                    setData({
                      ...data,
                      startedDateTime: new Date(e.target.value),
                    });
                  }}
                />
                <TextField
                  label="結束時間"
                  type="datetime-local"
                  size="small"
                  variant="outlined"
                  fullWidth
                  value={dayjs(new Date(data.endedDateTime)).format(
                    "YYYY-MM-DDTHH:mm"
                  )}
                  onChange={(e) =>
                    setData({
                      ...data,
                      endedDateTime: new Date(e.target.value),
                    })
                  }
                />
              </Box>
            </Box>
            <Box
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
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default RecordModal;
