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

import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchTeamsByLeague } from "../store/slices/teamSlice";
import { createPlayer } from "../store/slices/playerSlice";
import address from "../data/address.json";

const RecordModal: React.FC<{
  open: boolean;
  handleClose: () => void;
}> = ({ open, handleClose }) => {
  const dispatch = useAppDispatch();
  const teams = useAppSelector((state) => state.team.teams);
  const teamStatus = useAppSelector((state) => state.team.status);
  const teamError = useAppSelector((state) => state.team.error);

  const [player, setPlayer] = React.useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    height: 0,
    weight: 0,
    position: "",
    jerseyNumbers: "",
    isRetired: false,
    teamIds: "",
    jobType: "",
    address: {
      city: "高雄市",
      dist: "",
    },
    lineId: "",
    facebookId: "",
    instagramId: "",
    phoneNumber: "",
    isLeader: false,
    avatarUrl: "",
  });

  const handleSubmit = () => {
    dispatch(
      createPlayer({
        ...player,
        teamIds: [player.teamIds],
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
            建立新球員
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
                {" "}
                <TextField
                  label="姓"
                  size="small"
                  variant="outlined"
                  fullWidth
                  value={player.lastName}
                  onChange={(e) =>
                    setPlayer({ ...player, lastName: e.target.value })
                  }
                />
                <TextField
                  label="名"
                  size="small"
                  variant="outlined"
                  fullWidth
                  value={player.firstName}
                  onChange={(e) =>
                    setPlayer({ ...player, firstName: e.target.value })
                  }
                />
              </Box>
              <Divider />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 2,
                }}>
                <TextField
                  label="身高"
                  size="small"
                  variant="outlined"
                  fullWidth
                  value={player.height}
                  onChange={(e) =>
                    setPlayer({ ...player, height: parseInt(e.target.value) })
                  }
                />
                <TextField
                  label="體重"
                  size="small"
                  variant="outlined"
                  fullWidth
                  value={player.weight}
                  onChange={(e) =>
                    setPlayer({ ...player, weight: parseInt(e.target.value) })
                  }
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
                  label="位置"
                  size="small"
                  variant="outlined"
                  fullWidth
                  value={player.position}
                  onChange={(e) =>
                    setPlayer({ ...player, position: e.target.value })
                  }
                  displayEmpty>
                  <MenuItem value="" disabled>
                    選擇位置
                  </MenuItem>
                  <MenuItem value="Point Guard">控球後衛</MenuItem>
                  <MenuItem value="Shooting Guard">得分後衛</MenuItem>
                  <MenuItem value="Small Forward">小前鋒</MenuItem>
                  <MenuItem value="Power Forward">大前鋒</MenuItem>
                  <MenuItem value="Center">中鋒</MenuItem>
                </Select>
                <Select
                  size="small"
                  variant="outlined"
                  value={player.teamIds}
                  fullWidth
                  displayEmpty
                  onChange={(e) => {
                    setPlayer({
                      ...player,
                      teamIds: e.target.value,
                    });
                  }}>
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
                  label="背號"
                  size="small"
                  variant="outlined"
                  value={player.jerseyNumbers}
                  onChange={(e) =>
                    setPlayer({ ...player, jerseyNumbers: e.target.value })
                  }
                  sx={{
                    width: "50%",
                  }}
                />
                <FormControlLabel
                  sx={{
                    width: "50%",
                  }}
                  control={
                    <Checkbox
                      checked={player.isLeader}
                      onChange={(e) =>
                        setPlayer({ ...player, isLeader: e.target.checked })
                      }
                    />
                  }
                  label="是否為隊長"
                />
              </Box>
              <Divider />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 2,
                }}>
                <TextField
                  size="small"
                  variant="outlined"
                  fullWidth
                  value={player.dateOfBirth}
                  onChange={(e) =>
                    setPlayer({ ...player, dateOfBirth: e.target.value })
                  }
                  type="date"
                />
                <Select
                  label="位置"
                  size="small"
                  variant="outlined"
                  fullWidth
                  value={player.jobType}
                  onChange={(e) =>
                    setPlayer({ ...player, jobType: e.target.value })
                  }>
                  <MenuItem value=" 民意代表、主管及經理人員">
                    民意代表、主管及經理人員
                  </MenuItem>
                  <MenuItem value="專業人員">專業人員</MenuItem>
                  <MenuItem value="技術員及助理專業人員">
                    技術員及助理專業人員
                  </MenuItem>
                  <MenuItem value="事務支援人員">事務支援人員</MenuItem>
                  <MenuItem value="服務及銷售工作人員">
                    服務及銷售工作人員
                  </MenuItem>
                  <MenuItem value="農、林、漁、牧業生產人員">
                    農、林、漁、牧業生產人員
                  </MenuItem>
                  <MenuItem value="技藝有關工作人員">技藝有關工作人員</MenuItem>
                  <MenuItem value="機械設備操作及組裝人員">
                    機械設備操作及組裝人員
                  </MenuItem>
                  <MenuItem value="基層技術工及勞力工">
                    基層技術工及勞力工
                  </MenuItem>
                  <MenuItem value="軍人">軍人</MenuItem>
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
                  label="電話號碼"
                  size="small"
                  variant="outlined"
                  fullWidth
                  value={player.phoneNumber}
                  onChange={(e) =>
                    setPlayer({ ...player, phoneNumber: e.target.value })
                  }
                />
                <TextField
                  label="facebook帳號"
                  size="small"
                  variant="outlined"
                  fullWidth
                  value={player.facebookId}
                  onChange={(e) =>
                    setPlayer({ ...player, facebookId: e.target.value })
                  }
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 2,
                }}>
                <TextField
                  label="LineID"
                  size="small"
                  variant="outlined"
                  fullWidth
                  value={player.lineId}
                  onChange={(e) =>
                    setPlayer({ ...player, lineId: e.target.value })
                  }
                />
                <TextField
                  label="instagram"
                  size="small"
                  variant="outlined"
                  fullWidth
                  value={player.instagramId}
                  onChange={(e) =>
                    setPlayer({ ...player, instagramId: e.target.value })
                  }
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
                  value={player.address.city}
                  onChange={(e) =>
                    setPlayer({
                      ...player,
                      address: {
                        city: e.target.value,
                        dist: player.address.dist,
                      },
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
                  value={player.address.dist}
                  onChange={(e) =>
                    setPlayer({
                      ...player,
                      address: {
                        city: player.address.city,
                        dist: e.target.value,
                      },
                    })
                  }>
                  {(
                    address.filter(
                      (city) => city.CityName === player.address.city
                    )[0]?.AreaList || []
                  ).map((city) => (
                    <MenuItem value={city.AreaName}>{city.AreaName}</MenuItem>
                  ))}
                </Select>
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
