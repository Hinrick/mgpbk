import React, { useState, useEffect } from "react";
import {
  Box,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  Grid,
  MenuItem,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchSeasons } from "../../store/slices/seasonSlice";

import PlayerList from "../../components/AdminPlayerList";
import GameList from "../../components/AdminGameList";
import TeamList from "../../components/AdminTeamList";

const Admin: React.FC = () => {
  const dispatch = useAppDispatch();
  const seasons = useAppSelector((state) => state.season.seasons);
  const seasonStatus = useAppSelector((state) => state.season.status);
  const seasonError = useAppSelector((state) => state.season.error);
  const [activeTab, setActiveTab] = useState(0);
  const [seasonId, setSeasonId] = useState("");

  useEffect(() => {
    if (seasonStatus === "idle") {
      dispatch(fetchSeasons());
    }
  }, [dispatch, seasonStatus]);

  useEffect(() => {
    if (seasonStatus === "succeeded") {
      setSeasonId(seasons[0].id);
    }
  }, [seasonStatus, seasons]);

  return (
    <Box
      sx={{
        width: "100vw",
      }}>
      <Box
        sx={{
          backgroundColor: "#fff",
          width: "100vw",
          minHeight: "5vh",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <Tabs
          value={activeTab}
          onChange={(e, value) => setActiveTab(value)}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary">
          <Tab label="球賽" value={0}></Tab>
          <Tab label="球隊" value={1}></Tab>
          <Tab label="球員" value={2}></Tab>
        </Tabs>
        <Box>
          <TextField
            defaultValue={seasonId}
            value={seasonId}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSeasonId(e.target.value)
            }
            size="small"
            select>
            {seasons.map((season) => (
              <MenuItem key={season.id} value={season.id}>
                {season.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            size="small"
            id="search"
            type="search"
            variant="outlined"
            placeholder="Search"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>
      <Box>
        <Grid item xs={12}>
          {activeTab === 0 && <GameList seasonId={seasonId} />}
          {activeTab === 1 && <TeamList />}
          {activeTab === 2 && <PlayerList />}
        </Grid>
      </Box>
    </Box>
  );
};

export default Admin;
