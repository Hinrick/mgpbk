import React, { useState, useEffect, Fragment } from "react";
import {
  Typography,
  Button,
  Box,
  Grid,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchPlayers } from "../store/slices/playerSlice";
import CreatePlayer from "./CreatePlayer";

const Admin: React.FC = () => {
  const dispatch = useAppDispatch();
  const players: any = useAppSelector((state) => state.player.players);
  const playerStatus = useAppSelector((state) => state.player.status);
  const playerError = useAppSelector((state) => state.player.error);

  const [openCreatePlayer, setOpenCreatePlayer] = useState(false);

  const handleOpenCreatePlayer = () => {
    setOpenCreatePlayer(true);
  };

  const handleCloseCreatePlayer = () => {
    setOpenCreatePlayer(false);
  };

  useEffect(() => {
    dispatch(fetchPlayers());
  }, [dispatch]);

  return (
    <Fragment>
      <Box
        sx={{
          width: "100vw",
        }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1rem",
          }}>
          <Typography variant="h5">球員列表</Typography>
          <Button variant="contained" onClick={handleOpenCreatePlayer}>
            建立新球員
          </Button>
        </Box>
        <Box
          sx={{
            padding: "1rem",
          }}>
          {playerStatus === "loading" && <LoadingPage />}
          {playerStatus === "failed" && <ErrorPage message={playerError} />}
          {playerStatus === "succeeded" && (
            <Grid item xs={12}>
              <Grid>
                <Grid>
                  <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead
                        sx={(theme) => ({
                          minWidth: 650,
                          backgroundColor: theme.palette.secondary.main,
                          ">tr": {
                            ">th": {
                              color: theme.palette.primary.main,
                            },
                          },
                        })}>
                        <TableRow>
                          <TableCell align="center" rowSpan={2}>
                            球員
                          </TableCell>
                          <TableCell align="center" colSpan={3}>
                            2分球
                          </TableCell>
                          <TableCell align="center" colSpan={3}>
                            3分球
                          </TableCell>
                          <TableCell align="center" colSpan={3}>
                            罰球
                          </TableCell>
                          <TableCell align="center" colSpan={3}>
                            籃板
                          </TableCell>
                          <TableCell align="center" rowSpan={2}>
                            助攻
                          </TableCell>
                          <TableCell align="center" rowSpan={2}>
                            失誤
                          </TableCell>
                          <TableCell align="center" rowSpan={2}>
                            犯規
                          </TableCell>
                          <TableCell align="center" rowSpan={2}>
                            抄截
                          </TableCell>
                          <TableCell align="center" rowSpan={2}>
                            阻攻
                          </TableCell>
                          <TableCell align="center" rowSpan={2}>
                            上場時間
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          {/* Second row of headers, specifying the individual statistics */}
                          <TableCell align="center">進球</TableCell>
                          <TableCell align="center">出手</TableCell>
                          <TableCell align="center">命中率</TableCell>

                          <TableCell align="center">進球</TableCell>
                          <TableCell align="center">出手</TableCell>
                          <TableCell align="center">命中率</TableCell>

                          <TableCell align="center">進球</TableCell>
                          <TableCell align="center">出手</TableCell>
                          <TableCell align="center">命中率</TableCell>

                          <TableCell align="center">進攻</TableCell>
                          <TableCell align="center">防守</TableCell>
                          <TableCell align="center">總計</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {players.map((player: any, index: number) => {
                          let state;
                          const stateModel = {
                            twoPoints: {
                              goals: 0,
                              attempts: 0,
                            },
                            threePoints: {
                              goals: 0,
                              attempts: 0,
                            },
                            penalty: {
                              goals: 0,
                              attempts: 0,
                            },
                            rebounds: {
                              offensive: 0,
                              defensive: 0,
                            },
                            averageAssistsPerGame: 0,
                            averageStealsPerGame: 0,
                            averageBlocksPerGame: 0,
                            fouls: 0,
                            turnovers: 0,
                          };

                          if (!player.gameEvents) {
                            state = stateModel;
                          } else {
                          }

                          return (
                            <TableRow
                              key={player.id}
                              sx={{
                                backgroundColor:
                                  (index % 2 === 0 && "white") || "#f5f5f5",
                              }}>
                              <TableCell
                                component="th"
                                align="center"
                                scope="row">
                                {player.name}
                              </TableCell>
                              <TableCell align="center">
                                {state?.twoPoints.goals ?? 0}
                              </TableCell>
                              <TableCell align="center">
                                {state?.twoPoints.attempts ?? 0}
                              </TableCell>
                              <TableCell align="center">
                                {((state?.twoPoints.goals ?? 0) /
                                  (state?.twoPoints.attempts ?? 0)) *
                                  100 || 0}{" "}
                                %
                              </TableCell>
                              <TableCell align="center">
                                {state?.threePoints.goals ?? 0}
                              </TableCell>
                              <TableCell align="center">
                                {state?.threePoints.attempts ?? 0}
                              </TableCell>
                              <TableCell align="center">
                                {((state?.threePoints.goals ?? 0) /
                                  (state?.threePoints.attempts ?? 0)) *
                                  100 || 0}{" "}
                                %
                              </TableCell>
                              <TableCell align="center">
                                {state?.penalty.goals}
                              </TableCell>
                              <TableCell align="center">
                                {state?.penalty.attempts}
                              </TableCell>
                              <TableCell align="center">
                                {((state?.penalty.goals ?? 0) /
                                  (state?.penalty.attempts ?? 0)) *
                                  100 || 0}{" "}
                                %
                              </TableCell>
                              <TableCell align="center">
                                {state?.rebounds.offensive}
                              </TableCell>
                              <TableCell align="center">
                                {state?.rebounds.defensive}
                              </TableCell>
                              <TableCell align="center">
                                {(state?.rebounds.defensive ?? 0) +
                                  (state?.rebounds.offensive ?? 0)}
                              </TableCell>
                              <TableCell align="center">
                                {(state?.rebounds.defensive ?? 0) +
                                  (state?.rebounds.offensive ?? 0)}
                              </TableCell>
                              <TableCell align="center">
                                {state?.averageAssistsPerGame ?? 0}
                              </TableCell>
                              <TableCell align="center">
                                {state?.averageStealsPerGame}
                              </TableCell>
                              <TableCell align="center">
                                {state?.fouls}
                              </TableCell>
                              <TableCell align="center">
                                {state?.averageBlocksPerGame}
                              </TableCell>
                              <TableCell align="center">--</TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Box>
      </Box>
      <CreatePlayer
        open={openCreatePlayer}
        handleClose={handleCloseCreatePlayer}
      />
    </Fragment>
  );
};

const ErrorPage: React.FC<{ message: string | null | undefined }> = ({
  message,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Typography variant="h5">系統發生錯誤，請聯絡系統管理員。</Typography>
      <Typography variant="h5">{message}</Typography>
    </Box>
  );
};

const LoadingPage: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <CircularProgress />
    </Box>
  );
};

export default Admin;
