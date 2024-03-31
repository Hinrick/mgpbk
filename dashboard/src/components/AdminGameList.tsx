import React, { useState, useEffect, Fragment } from "react";
import {
  Typography,
  Button,
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from "@mui/material";
import { CopyAllRounded, WebAsset } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchGamesBySeason } from "../store/slices/gameSlice";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import CreateGame from "./CreateGame";

const GameList: React.FC<{ seasonId: string }> = ({ seasonId }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const games = useAppSelector((state) => state.game.games);
  const gamesStatus = useAppSelector((state) => state.game.status);
  const gamesError = useAppSelector((state) => state.game.error);
  const [openCreateGame, setOpenCreateGame] = useState(false);

  const handleOpenCreateGame = () => {
    setOpenCreateGame(true);
  };

  const handleCloseCreateGame = () => {
    setOpenCreateGame(false);
  };

  useEffect(() => {
    dispatch(fetchGamesBySeason(seasonId));
  }, [seasonId, dispatch]);

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
          <Typography variant="h5">球賽列表</Typography>
          <Button variant="contained" onClick={handleOpenCreateGame}>
            建立新比賽
          </Button>
        </Box>
        <Box
          sx={{
            padding: "1rem",
          }}>
          {gamesStatus === "loading" && <LoadingPage />}
          {gamesError === "failed" && <ErrorPage message={gamesError} />}
          {gamesStatus === "succeeded" && (
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
                          <TableCell align="center">比賽球隊</TableCell>
                          <TableCell align="center">比賽時間</TableCell>
                          <TableCell align="center">主隊計分板網址</TableCell>
                          <TableCell align="center">客隊計分板網址</TableCell>
                          <TableCell align="center">主隊球員檢錄網址</TableCell>
                          <TableCell align="center">客隊球員檢錄網址</TableCell>
                          <TableCell align="center">比賽計時器網址</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {games.map((game: any, index: number) => (
                          <TableRow
                            key={game.id}
                            sx={{
                              backgroundColor:
                                (index % 2 === 0 && "white") || "#f5f5f5",
                            }}>
                            <TableCell
                              component="th"
                              scope="row"
                              align="center">
                              {`${game[game.teamAId]?.name} (主) v.s ${
                                game[game.teamBId]?.name
                              } (客)`}
                            </TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              align="center">
                              {`${
                                dayjs(game.startedDateTime).format(
                                  "YYYY/MM/DD HH:mm"
                                ) || "暫無資料"
                              } - ${
                                dayjs(game.endedDateTime).format(
                                  "YYYY/MM/DD HH:mm"
                                ) || "暫無資料"
                              }`}
                            </TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              align="center">
                              <Button
                                sx={{ maxWidth: "100px", ml: 1 }}
                                variant="contained"
                                startIcon={<CopyAllRounded />}>
                                複製
                              </Button>
                              <Button
                                sx={{ maxWidth: "100px", ml: 1 }}
                                variant="contained"
                                startIcon={<WebAsset />}
                                onClick={() => {
                                  window.open(
                                    `/record/${game.id}?home=true`,
                                    "_blank"
                                  );
                                }}>
                                前往
                              </Button>
                            </TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              align="center">
                              <Button
                                sx={{ maxWidth: "100px", ml: 1 }}
                                variant="contained"
                                startIcon={<CopyAllRounded />}>
                                複製
                              </Button>
                              <Button
                                sx={{ maxWidth: "100px", ml: 1 }}
                                variant="contained"
                                startIcon={<WebAsset />}
                                onClick={() => {
                                  window.open(
                                    `/record/${game.id}?away=true`,
                                    "_blank"
                                  );
                                }}>
                                前往
                              </Button>
                            </TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              align="center">
                              <Button
                                sx={{ maxWidth: "100px", ml: 1 }}
                                variant="contained"
                                startIcon={<CopyAllRounded />}>
                                複製
                              </Button>
                              <Button
                                sx={{ maxWidth: "100px", ml: 1 }}
                                variant="contained"
                                startIcon={<WebAsset />}>
                                前往
                              </Button>
                            </TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              align="center">
                              <Button
                                sx={{ maxWidth: "100px", ml: 1 }}
                                variant="contained"
                                startIcon={<CopyAllRounded />}>
                                複製
                              </Button>
                              <Button
                                sx={{ maxWidth: "100px", ml: 1 }}
                                variant="contained"
                                startIcon={<WebAsset />}>
                                前往
                              </Button>
                            </TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              align="center">
                              <Button
                                sx={{ maxWidth: "100px", ml: 1 }}
                                variant="contained"
                                startIcon={<CopyAllRounded />}>
                                複製
                              </Button>
                              <Button
                                sx={{ maxWidth: "100px", ml: 1 }}
                                variant="contained"
                                startIcon={<WebAsset />}>
                                前往
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Box>
      </Box>
      <CreateGame
        open={openCreateGame}
        handleClose={handleCloseCreateGame}
        seasonId={seasonId}
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

export default GameList;
