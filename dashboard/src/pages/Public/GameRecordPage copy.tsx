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
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchGameDetail } from "../../store/slices/gameSlice";
import { useParams, useLocation } from "react-router-dom";

import ChangePlayerModal from "../../components/_ChangePlayerModal";
import ShotAttemptModal from "../../components/ShotAttemptModal";
import RecordModal from "../../components/RecordModal";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Admin: React.FC = () => {
  let { gameId } = useParams();
  const dispatch = useAppDispatch();
  let query = useQuery();
  let home = query.get("home") ? true : false;
  let away = query.get("away") ? true : false;
  const game: any = useAppSelector((state) => state.game.game);
  const gameStatus = useAppSelector((state) => state.game.status);
  const gameError = useAppSelector((state) => state.game.error);

  const [homeTeam, setHomeTeam] = useState<any>(null);
  const [awayTeam, setAwayTeam] = useState<any>(null);
  const [openChangePlayer, setOpenChangePlayer] = useState(false);
  const [openShotAttempt, setOpenShotAttempt] = useState(false);
  const [openRecord, setOpenRecord] = useState(false);
  const [recordType, setRecordType] = useState("");
  const [playerData, setPlayerData] = useState<any>([]);

  const handleOpenChangePlayer = () => {
    setOpenChangePlayer(true);
  };

  const handleCloseChangePlayer = () => {
    setOpenChangePlayer(false);
  };

  const handleOpenShotAttempt = () => {
    setOpenShotAttempt(true);
  };

  const handleCloseShotAttempt = () => {
    setOpenShotAttempt(false);
  };

  const handleOpenRecord = (type: string) => {
    setOpenRecord(true);
    setRecordType(type);
  };

  const handleCloseRecord = () => {
    setOpenRecord(false);
  };

  useEffect(() => {
    if (gameStatus === "succeeded") {
      setPlayerData([
        ...game[game.teamAId]?.players,
        ...game[game.teamBId]?.players,
      ]);
    }
  }, [game, gameStatus]);

  useEffect(() => {
    if (gameId) {
      dispatch(fetchGameDetail(gameId));
    }
  }, [gameId, dispatch]);

  useEffect(() => {
    console.log(game);

    if (gameStatus === "succeeded") {
      setHomeTeam(game[game.teamAId]);
      setAwayTeam(game[game.teamBId]);

      if (home) {
        setPlayerData(game[game.teamAId].players);
      } else if (away) {
        setPlayerData(game[game.teamBId].players);
      }
    }
  }, [game, gameStatus, home, away]);

  return (
    <Fragment>
      <Box
        sx={{
          width: "100vw",
        }}>
        <Box
          sx={{
            padding: "1rem",
          }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              padding: "1rem",
            }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                gap: "1.5rem",
              }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  gap: "1rem",
                  opacity: home ? 1 : 0.3,
                }}>
                <Typography>{`${homeTeam?.name}(主)`}</Typography>
                <img src={homeTeam?.logo} alt="homeTeam" />
                <Typography variant="h2">{homeTeam?.score}</Typography>
              </Box>
              <Typography>vs</Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  gap: "1rem",
                  opacity: away ? 1 : 0.3,
                }}>
                <Typography variant="h2">{homeTeam?.score}</Typography>
                <img src={awayTeam?.logo} alt="homeTeam" />
                <Typography>{`${awayTeam?.name}(客)`}</Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
              }}>
              <Button
                variant="contained"
                sx={(theme) => ({
                  backgroundColor: theme.palette.error.main,
                })}
                onClick={handleOpenChangePlayer}>
                換人
              </Button>
              <Button variant="contained" onClick={handleOpenShotAttempt}>
                出手
              </Button>
              <Button
                variant="contained"
                onClick={() => handleOpenRecord("rebounds")}>
                籃板
              </Button>
              <Button
                variant="contained"
                onClick={() => handleOpenRecord("assists")}>
                助攻
              </Button>
              <Button
                variant="contained"
                onClick={() => handleOpenRecord("steals")}>
                抄截
              </Button>
              <Button
                variant="contained"
                onClick={() => handleOpenRecord("blocks")}>
                阻攻
              </Button>
              <Button
                variant="contained"
                onClick={() => handleOpenRecord("turnovers")}>
                失誤
              </Button>
            </Box>
          </Box>
          {gameStatus === "loading" && <LoadingPage />}
          {gameStatus === "failed" && <ErrorPage message={gameError} />}
          {gameStatus === "succeeded" && (
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
                        {playerData.map((player: any) => (
                          <TableRow key={player.id}>
                            <TableCell
                              component="th"
                              scope="row"
                              align="center">
                              {player.name}
                            </TableCell>
                            <TableCell scope="row" align="center">
                              {player.state.twoPoints.goals}
                            </TableCell>
                            <TableCell
                              scope="row"
                              align="center"
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                                justifyContent: "center",
                              }}>
                              <Button
                                size="small"
                                variant="contained"
                                sx={{
                                  padding: "4px !important",
                                  boxShadow: "0px 0px 0px 0px",
                                  fontSize: "10px",
                                  minWidth: "40px",
                                }}>
                                復原
                              </Button>

                              <Typography>
                                {player.state.threePoints.attempts}
                              </Typography>
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "1px",
                                }}>
                                <Button
                                  size="small"
                                  variant="contained"
                                  sx={{
                                    padding: "4px !important",
                                    boxShadow: "0px 0px 0px 0px",
                                    fontSize: "10px",
                                    minWidth: "40px",
                                  }}>
                                  進球
                                </Button>
                                <Button
                                  size="small"
                                  variant="contained"
                                  sx={{
                                    padding: "4px !important",
                                    boxShadow: "0px 0px 0px 0px",
                                    fontSize: "10px",
                                    minWidth: "40px",
                                  }}>
                                  沒進
                                </Button>
                              </Box>
                            </TableCell>
                            <TableCell scope="row" align="center">
                              {(player.state.twoPoints.goals /
                                player.state.twoPoints.attempts) *
                                100 || 0}{" "}
                              %
                            </TableCell>
                            <TableCell scope="row" align="center">
                              {player.state.threePoints.goals}
                            </TableCell>
                            <TableCell
                              scope="row"
                              align="center"
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                                justifyContent: "center",
                              }}>
                              <Button
                                size="small"
                                variant="contained"
                                sx={{
                                  padding: "4px !important",
                                  boxShadow: "0px 0px 0px 0px",
                                  fontSize: "10px",
                                  minWidth: "40px",
                                }}>
                                復原
                              </Button>

                              <Typography>
                                {player.state.threePoints.attempts}
                              </Typography>
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "1px",
                                }}>
                                <Button
                                  size="small"
                                  variant="contained"
                                  sx={{
                                    padding: "4px !important",
                                    boxShadow: "0px 0px 0px 0px",
                                    fontSize: "10px",
                                    minWidth: "40px",
                                  }}>
                                  進球
                                </Button>
                                <Button
                                  size="small"
                                  variant="contained"
                                  sx={{
                                    padding: "4px !important",
                                    boxShadow: "0px 0px 0px 0px",
                                    fontSize: "10px",
                                    minWidth: "40px",
                                  }}>
                                  沒進
                                </Button>
                              </Box>
                            </TableCell>
                            <TableCell scope="row" align="center">
                              {(player.state.threePoints.goals /
                                player.state.threePoints.attempts) *
                                100 || 0}{" "}
                              %
                            </TableCell>
                            <TableCell scope="row" align="center">
                              {player.state.penalty.goals}
                            </TableCell>
                            <TableCell
                              scope="row"
                              align="center"
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                                justifyContent: "center",
                              }}>
                              <Button
                                size="small"
                                variant="contained"
                                sx={{
                                  padding: "4px !important",
                                  boxShadow: "0px 0px 0px 0px",
                                  fontSize: "10px",
                                  minWidth: "40px",
                                }}>
                                復原
                              </Button>

                              <Typography>
                                {player.state.threePoints.attempts}
                              </Typography>
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "1px",
                                }}>
                                <Button
                                  size="small"
                                  variant="contained"
                                  sx={{
                                    padding: "4px !important",
                                    boxShadow: "0px 0px 0px 0px",
                                    fontSize: "10px",
                                    minWidth: "40px",
                                  }}>
                                  進球
                                </Button>
                                <Button
                                  size="small"
                                  variant="contained"
                                  sx={{
                                    padding: "4px !important",
                                    boxShadow: "0px 0px 0px 0px",
                                    fontSize: "10px",
                                    minWidth: "40px",
                                  }}>
                                  沒進
                                </Button>
                              </Box>
                            </TableCell>
                            <TableCell scope="row" align="center">
                              {(player.state.penalty.goals /
                                player.state.penalty.attempts) *
                                100 || 0}{" "}
                              %
                            </TableCell>
                            <TableCell
                              scope="row"
                              align="center"
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                                justifyContent: "center",
                              }}>
                              <Button
                                size="small"
                                variant="contained"
                                sx={{
                                  padding: "4px !important",
                                  boxShadow: "0px 0px 0px 0px",
                                  fontSize: "10px",
                                  minWidth: "40px",
                                }}>
                                復原
                              </Button>

                              <Typography>
                                {player.state.threePoints.attempts}
                              </Typography>
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "1px",
                                }}>
                                <Button
                                  size="small"
                                  variant="contained"
                                  sx={{
                                    padding: "4px !important",
                                    boxShadow: "0px 0px 0px 0px",
                                    fontSize: "10px",
                                    minWidth: "40px",
                                  }}>
                                  進球
                                </Button>
                                <Button
                                  size="small"
                                  variant="contained"
                                  sx={{
                                    padding: "4px !important",
                                    boxShadow: "0px 0px 0px 0px",
                                    fontSize: "10px",
                                    minWidth: "40px",
                                  }}>
                                  沒進
                                </Button>
                              </Box>
                            </TableCell>

                            <TableCell
                              scope="row"
                              align="center"
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                                justifyContent: "center",
                              }}>
                              <Button
                                size="small"
                                variant="contained"
                                sx={{
                                  padding: "4px !important",
                                  boxShadow: "0px 0px 0px 0px",
                                  fontSize: "10px",
                                  minWidth: "40px",
                                }}>
                                復原
                              </Button>
                              <Typography>
                                {player.state.threePoints.attempts}
                              </Typography>
                              <Button
                                size="small"
                                variant="contained"
                                sx={{
                                  padding: "4px !important",
                                  boxShadow: "0px 0px 0px 0px",
                                  fontSize: "10px",
                                  minWidth: "40px",
                                }}>
                                +1
                              </Button>
                            </TableCell>
                            <TableCell
                              scope="row"
                              align="center"
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                                justifyContent: "center",
                              }}>
                              <Button
                                size="small"
                                variant="contained"
                                sx={{
                                  padding: "4px !important",
                                  boxShadow: "0px 0px 0px 0px",
                                  fontSize: "10px",
                                  minWidth: "40px",
                                }}>
                                復原
                              </Button>
                              <Typography>
                                {player.state.threePoints.attempts}
                              </Typography>
                              <Button
                                size="small"
                                variant="contained"
                                sx={{
                                  padding: "4px !important",
                                  boxShadow: "0px 0px 0px 0px",
                                  fontSize: "10px",
                                  minWidth: "40px",
                                }}>
                                +1
                              </Button>
                            </TableCell>
                            {/* <TableCell scope="row" align="center">
                              {player.state.rebounds.defensive +
                                player.state.rebounds.offensive}
                            </TableCell>
                            <TableCell scope="row" align="center">
                              {player.state.rebounds.defensive +
                                player.state.rebounds.offensive}
                            </TableCell>
                            <TableCell scope="row" align="center">
                              {player.state.assists}
                            </TableCell>
                            <TableCell scope="row" align="center">
                              {player.state.turnovers}
                            </TableCell>
                            <TableCell scope="row" align="center">
                              {player.state.fouls}
                            </TableCell>
                            <TableCell scope="row" align="center">
                              {player.state.blocks}
                            </TableCell>
                            <TableCell scope="row" align="center">
                              --
                            </TableCell> */}
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
      <ChangePlayerModal
        open={openChangePlayer}
        handleClose={handleCloseChangePlayer}
        players={playerData.filter(
          (player: any) => player.isCheckIn && player.isStarting
        )}
      />
      <ShotAttemptModal
        open={openShotAttempt}
        handleClose={handleCloseShotAttempt}
        // players={playerData.filter(
        //   (player: any) => player.isCheckIn && player.isStarting
        // )}
        players={playerData}
        gameId={game.id}
        teamId={home ? game.teamAId : game.teamBId}
      />
      <RecordModal
        open={openRecord}
        handleClose={handleCloseRecord}
        type={recordType}
        players={playerData.filter(
          (player: any) => player.isCheckIn && player.isStarting
        )}
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
