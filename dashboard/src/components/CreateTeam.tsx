import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Modal,
  Button,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import dayjs from "dayjs";

import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchTeamsByLeague, createTeam } from "../store/slices/teamSlice";
import address from "../data/address.json";

const RecordModal: React.FC<{
  open: boolean;
  handleClose: () => void;
}> = ({ open, handleClose }) => {
  const dispatch = useAppDispatch();
  const teams = useAppSelector((state) => state.team.teams);
  const teamStatus = useAppSelector((state) => state.team.status);
  const teamError = useAppSelector((state) => state.team.error);

  const [data, setData] = React.useState({
    name: "",
    city: "",
    dist: "",
    establishmentYear: "",
    establishmentMonth: "",
    establishmentDate: "",
    leagueIds: ["sNJc8VNICZt5a6WxW0aj"],
    coach: "",
    updateBy: "test",
    createdBy: "test",
  });

  const handleSubmit = () => {
    dispatch(createTeam(data));
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
                <TextField
                  label="球隊名稱"
                  size="small"
                  variant="outlined"
                  fullWidth
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                />
                <TextField
                  label="教練"
                  size="small"
                  variant="outlined"
                  fullWidth
                  value={data.coach}
                  onChange={(e) => setData({ ...data, coach: e.target.value })}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 2,
                }}>
                <Select
                  label="居住城市"
                  size="small"
                  variant="outlined"
                  fullWidth
                  value={data.city}
                  onChange={(e) =>
                    setData({
                      ...data,
                      city: e.target.value,
                    })
                  }>
                  {address.map((city) => (
                    <MenuItem value={city.CityName}>{city.CityName}</MenuItem>
                  ))}
                </Select>
                <Select
                  label="居住地區"
                  size="small"
                  variant="outlined"
                  fullWidth
                  value={data.dist}
                  onChange={(e) =>
                    setData({
                      ...data,
                      dist: e.target.value,
                    })
                  }>
                  {(
                    address.filter((city) => city.CityName === data.city)[0]
                      ?.AreaList || []
                  ).map((city) => (
                    <MenuItem value={city.AreaName}>{city.AreaName}</MenuItem>
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
                  label="成立時間"
                  type="date"
                  size="small"
                  variant="outlined"
                  fullWidth
                  value={dayjs(
                    new Date(
                      `${data.establishmentYear}/${data.establishmentMonth}/${data.establishmentDate}`
                    )
                  ).format("YYYY-MM-DD")}
                  onChange={(e) => {
                    const date = new Date(e.target.value);
                    setData({
                      ...data,
                      establishmentYear: date.getFullYear().toString(),
                      establishmentMonth: (date.getMonth() + 1).toString(),
                      establishmentDate: date.getDate().toString(),
                    });
                  }}
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
