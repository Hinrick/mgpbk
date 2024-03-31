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
import { createGameEvent } from "../../store/slices/gameEventSlice";

import { useParams, useLocation } from "react-router-dom";

// import ChangePlayerModal from "../../components/ChangePlayerModal";
import ShotAttemptModal from "../../components/ShotAttemptModal";
import RecordModal from "../../components/RecordModal";
import ChangePlayersModal from "../../components/ChangePlayersModal";

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
  const [clockoutPlayer, setClockoutPlayer] = useState<string>("");
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const handleOpenChangePlayer = (playerId: string) => {
    setClockoutPlayer(playerId);
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

  const handleUpdateGameEvent = async (
    type: string,
    plyerId: string,
    success: boolean
  ) => {
    //all kinds of attepmt type
    const types: { [key: string]: string } = {
      two_points_attempt: "TWO_POINTS_ATTEMPT",
      three_points_attempts: "THREE_POINTS_ATTEMPT",
      penalty: "PENALTY",
      defensive_rebound: "DEFENSIVE_REBOUND",
      offensive_rebound: "OFFENSIVE_REBOUND",
      steal: "STEAL",
      block: "BLOCK",
      turnover: "TURNOVER",
      assist: "ASSIST",
      foul: "FOUL",
    };

    const data = {
      gameId: gameId as string,
      playerId: plyerId,
      teamId: home ? game.teamAId : game.teamBId,
      eventType: types[type],
      details:
        type === "two_points_attempt" ||
        type === "three_points_attempts" ||
        type === "penalty"
          ? {
              success: success,
            }
          : null,
      location: {
        x: position.x,
        y: position.y,
      },
      updateBy: "test",
      createdBy: "test",
    };

    dispatch(createGameEvent(data));
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
    if (!openChangePlayer) {
      setTimeout(() => {
        if (gameId) {
          dispatch(fetchGameDetail(gameId));
        }
      }, 1000);
    } else {
      if (gameId) {
        dispatch(fetchGameDetail(gameId));
      }
    }
  }, [openChangePlayer, gameId, dispatch]);

  useEffect(() => {
    if (gameStatus === "succeeded") {
      setHomeTeam(game[game.teamAId]);
      setAwayTeam(game[game.teamBId]);
      const events = game.gameEvents || [];
      let data;

      if (home) {
        data = game[game.teamAId].players.map((player: any) => ({
          ...player,
          states: {
            twoPoints: {
              goals:
                events.filter(
                  (event: any) =>
                    event.playerId === player.id &&
                    event.eventType === "TWO_POINTS_ATTEMPT" &&
                    event.details.success === true
                ).length || 0,
              attempts:
                events.filter(
                  (event: any) =>
                    event.playerId === player.id &&
                    event.eventType === "TWO_POINTS_ATTEMPT"
                ).length || 0,
            },
            threePoints: {
              goals:
                events.filter(
                  (event: any) =>
                    event.playerId === player.id &&
                    event.eventType === "THREE_POINTS_ATTEMPT" &&
                    event.details.success === true
                ).length || 0,
              attempts:
                events.filter(
                  (event: any) =>
                    event.playerId === player.id &&
                    event.eventType === "THREE_POINTS_ATTEMPT"
                ).length || 0,
            },
            penalty: {
              goals:
                events.filter(
                  (event: any) =>
                    event.playerId === player.id &&
                    event.eventType === "PENALTY" &&
                    event.details.success === true
                ).length || 0,
              attempts:
                events.filter(
                  (event: any) =>
                    event.playerId === player.id &&
                    event.eventType === "PENALTY"
                ).length || 0,
            },
            rebounds: {
              offensive:
                events.filter(
                  (event: any) =>
                    event.playerId === player.id &&
                    event.eventType === "OFFENSIVE_REBOUND"
                ).length || 0,
              defensive:
                events.filter(
                  (event: any) =>
                    event.playerId === player.id &&
                    event.eventType === "DEFENSIVE_REBOUND"
                ).length || 0,
            },
            assists:
              events.filter(
                (event: any) =>
                  event.playerId === player.id && event.eventType === "ASSIST"
              ).length || 0,
            steals:
              events.filter(
                (event: any) =>
                  event.playerId === player.id && event.eventType === "STEAL"
              ).length || 0,
            blocks:
              events.filter(
                (event: any) =>
                  event.playerId === player.id && event.eventType === "BLOCK"
              ).length || 0,
            fouls:
              events.filter(
                (event: any) =>
                  event.playerId === player.id && event.eventType === "FOUL"
              ).length || 0,
            turnovers:
              events.filter(
                (event: any) =>
                  event.playerId === player.id && event.eventType === "TURNOVER"
              ).length || 0,
          },
        }));

        setPlayerData(game[game.teamAId].players);
      } else if (away) {
        data = game[game.teamBId].players.map((player: any) => ({
          ...player,
          states: {
            twoPoints: {
              goals:
                events.filter(
                  (event: any) =>
                    event.playerId === player.id &&
                    event.eventType === "TWO_POINTS_ATTEMPT" &&
                    event.details.success === true
                ).length || 0,
              attempts:
                events.filter(
                  (event: any) =>
                    event.playerId === player.id &&
                    event.eventType === "TWO_POINTS_ATTEMPT"
                ).length || 0,
            },
            threePoints: {
              goals:
                events.filter(
                  (event: any) =>
                    event.playerId === player.id &&
                    event.eventType === "THREE_POINTS_ATTEMPT" &&
                    event.details.success === true
                ).length || 0,
              attempts:
                events.filter(
                  (event: any) =>
                    event.playerId === player.id &&
                    event.eventType === "THREE_POINTS_ATTEMPT"
                ).length || 0,
            },
            penalty: {
              goals:
                events.filter(
                  (event: any) =>
                    event.playerId === player.id &&
                    event.eventType === "PENALTY" &&
                    event.details.success === true
                ).length || 0,
              attempts:
                events.filter(
                  (event: any) =>
                    event.playerId === player.id &&
                    event.eventType === "PENALTY"
                ).length || 0,
            },
            rebounds: {
              offensive:
                events.filter(
                  (event: any) =>
                    event.playerId === player.id &&
                    event.eventType === "OFFENSIVE_REBOUND"
                ).length || 0,
              defensive:
                events.filter(
                  (event: any) =>
                    event.playerId === player.id &&
                    event.eventType === "DEFENSIVE_REBOUND"
                ).length || 0,
            },
            assists:
              events.filter(
                (event: any) =>
                  event.playerId === player.id && event.eventType === "ASSIST"
              ).length || 0,
            steals:
              events.filter(
                (event: any) =>
                  event.playerId === player.id && event.eventType === "STEAL"
              ).length || 0,
            blocks:
              events.filter(
                (event: any) =>
                  event.playerId === player.id && event.eventType === "BLOCK"
              ).length || 0,
            fouls:
              events.filter(
                (event: any) =>
                  event.playerId === player.id && event.eventType === "FOUL"
              ).length || 0,
            turnovers:
              events.filter(
                (event: any) =>
                  event.playerId === player.id && event.eventType === "TURNOVER"
              ).length || 0,
          },
        }));
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
          </Box>
          {gameStatus === "failed" && <ErrorPage message={gameError} />}
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
                    {gameStatus === "loading" && (
                      <Box
                        sx={{
                          display: "flex",
                          alignContent: "center",
                          justifyContent: "center",
                          width: "100vw",
                          height: "50vh",
                          position: "absolute",
                        }}>
                        <LoadingPage />
                      </Box>
                    )}
                    {gameStatus === "succeeded" && (
                      <Fragment>
                        <TableBody>
                          {[...playerData]
                            .filter((player: any) => player.isStarting)
                            .map((player: any, index: number) => (
                              <TableRow
                                key={player.id}
                                sx={{
                                  opacity: index > 5 ? 0.2 : 1,
                                }}>
                                <TableCell
                                  component={"th"}
                                  scope="row"
                                  align="center">
                                  <Button
                                    size="small"
                                    variant="contained"
                                    sx={{
                                      padding: "4px !important",
                                      boxShadow: "0px 0px 0px 0px",
                                      fontSize: "8px",
                                      minWidth: "30px",
                                    }}
                                    onClick={() =>
                                      handleOpenChangePlayer(player.id)
                                    }>
                                    {player.name}
                                  </Button>
                                </TableCell>
                                <TableCell align="center">
                                  {player.state.twoPoints.goals}
                                </TableCell>
                                <TableCell align="center">
                                  <Box
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
                                        fontSize: "8px",
                                        minWidth: "30px",
                                      }}>
                                      復原
                                    </Button>

                                    <Typography>
                                      {player.state.twoPoints.attempts}
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
                                          fontSize: "8px",
                                          minWidth: "30px",
                                        }}
                                        onClick={() => {
                                          handleUpdateGameEvent(
                                            "two_points_attempt",
                                            player.id,
                                            true
                                          );
                                        }}>
                                        進球
                                      </Button>
                                      <Button
                                        size="small"
                                        variant="contained"
                                        sx={{
                                          padding: "4px !important",
                                          boxShadow: "0px 0px 0px 0px",
                                          fontSize: "8px",
                                          minWidth: "30px",
                                        }}
                                        onClick={() => {
                                          handleUpdateGameEvent(
                                            "two_points_attempt",
                                            player.id,
                                            false
                                          );
                                        }}>
                                        沒進
                                      </Button>
                                    </Box>
                                  </Box>
                                </TableCell>
                                <TableCell align="center">
                                  {(player.state.twoPoints.goals /
                                    player.state.twoPoints.attempts) *
                                    100 || 0}{" "}
                                  %
                                </TableCell>
                                <TableCell align="center">
                                  {player.state.threePoints.goals}
                                </TableCell>
                                <TableCell align="center">
                                  <Box
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
                                        fontSize: "8px",
                                        minWidth: "30px",
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
                                          fontSize: "8px",
                                          minWidth: "30px",
                                        }}
                                        onClick={() => {
                                          handleUpdateGameEvent(
                                            "three_points_attempt",
                                            player.id,
                                            true
                                          );
                                        }}>
                                        進球
                                      </Button>
                                      <Button
                                        size="small"
                                        variant="contained"
                                        sx={{
                                          padding: "4px !important",
                                          boxShadow: "0px 0px 0px 0px",
                                          fontSize: "8px",
                                          minWidth: "30px",
                                        }}
                                        onClick={() => {
                                          handleUpdateGameEvent(
                                            "three_points_attempt",
                                            player.id,
                                            false
                                          );
                                        }}>
                                        沒進
                                      </Button>
                                    </Box>
                                  </Box>
                                </TableCell>
                                <TableCell align="center">
                                  {(player.state.threePoints.goals /
                                    player.state.threePoints.attempts) *
                                    100 || 0}{" "}
                                  %
                                </TableCell>
                                <TableCell align="center">
                                  {player.state.penalty.goals}
                                </TableCell>
                                <TableCell align="center">
                                  <Box
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
                                        fontSize: "8px",
                                        minWidth: "30px",
                                      }}>
                                      復原
                                    </Button>

                                    <Typography>
                                      {player.state.penalty.attempts}
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
                                          fontSize: "8px",
                                          minWidth: "30px",
                                        }}
                                        onClick={() => {
                                          handleUpdateGameEvent(
                                            "penalty",
                                            player.id,
                                            true
                                          );
                                        }}>
                                        進球
                                      </Button>
                                      <Button
                                        size="small"
                                        variant="contained"
                                        sx={{
                                          padding: "4px !important",
                                          boxShadow: "0px 0px 0px 0px",
                                          fontSize: "8px",
                                          minWidth: "30px",
                                        }}
                                        onClick={() => {
                                          handleUpdateGameEvent(
                                            "penalty",
                                            player.id,
                                            false
                                          );
                                        }}>
                                        沒進
                                      </Button>
                                    </Box>
                                  </Box>
                                </TableCell>
                                <TableCell align="center">
                                  {(player.state.penalty.goals /
                                    player.state.penalty.attempts) *
                                    100 || 0}{" "}
                                  %
                                </TableCell>
                                <TableCell align="center">
                                  <Box
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
                                        fontSize: "8px",
                                        minWidth: "30px",
                                      }}>
                                      復原
                                    </Button>
                                    <Typography>
                                      {player.state.rebounds.offensive}
                                    </Typography>
                                    <Button
                                      size="small"
                                      variant="contained"
                                      sx={{
                                        padding: "4px !important",
                                        boxShadow: "0px 0px 0px 0px",
                                        fontSize: "8px",
                                        minWidth: "30px",
                                      }}>
                                      +1
                                    </Button>
                                  </Box>
                                </TableCell>
                                <TableCell align="center">
                                  <Box
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
                                        fontSize: "8px",
                                        minWidth: "30px",
                                      }}>
                                      復原
                                    </Button>
                                    <Typography>
                                      {player.state.rebounds.defensive}
                                    </Typography>
                                    <Button
                                      size="small"
                                      variant="contained"
                                      sx={{
                                        padding: "4px !important",
                                        boxShadow: "0px 0px 0px 0px",
                                        fontSize: "8px",
                                        minWidth: "30px",
                                      }}>
                                      +1
                                    </Button>
                                  </Box>
                                </TableCell>
                                <TableCell align="center">
                                  {player.state.rebounds.defensive +
                                    player.state.rebounds.offensive}
                                </TableCell>

                                <TableCell align="center">
                                  <Box
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
                                        fontSize: "8px",
                                        minWidth: "30px",
                                      }}>
                                      復原
                                    </Button>
                                    <Typography>
                                      {player.state.assists}
                                    </Typography>
                                    <Button
                                      size="small"
                                      variant="contained"
                                      sx={{
                                        padding: "4px !important",
                                        boxShadow: "0px 0px 0px 0px",
                                        fontSize: "8px",
                                        minWidth: "30px",
                                      }}>
                                      +1
                                    </Button>
                                  </Box>
                                </TableCell>
                                <TableCell align="center">
                                  <Box
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
                                        fontSize: "8px",
                                        minWidth: "30px",
                                      }}>
                                      復原
                                    </Button>
                                    <Typography>
                                      {player.state.turnovers}
                                    </Typography>
                                    <Button
                                      size="small"
                                      variant="contained"
                                      sx={{
                                        padding: "4px !important",
                                        boxShadow: "0px 0px 0px 0px",
                                        fontSize: "8px",
                                        minWidth: "30px",
                                      }}>
                                      +1
                                    </Button>
                                  </Box>
                                </TableCell>
                                <TableCell align="center">
                                  <Box
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
                                        fontSize: "8px",
                                        minWidth: "30px",
                                      }}>
                                      復原
                                    </Button>
                                    <Typography>
                                      {player.state.fouls}
                                    </Typography>
                                    <Button
                                      size="small"
                                      variant="contained"
                                      sx={{
                                        padding: "4px !important",
                                        boxShadow: "0px 0px 0px 0px",
                                        fontSize: "8px",
                                        minWidth: "30px",
                                      }}>
                                      +1
                                    </Button>
                                  </Box>
                                </TableCell>
                                <TableCell align="center">
                                  <Box
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
                                        fontSize: "8px",
                                        minWidth: "30px",
                                      }}>
                                      復原
                                    </Button>
                                    <Typography>
                                      {player.state.steals}
                                    </Typography>
                                    <Button
                                      size="small"
                                      variant="contained"
                                      sx={{
                                        padding: "4px !important",
                                        boxShadow: "0px 0px 0px 0px",
                                        fontSize: "8px",
                                        minWidth: "30px",
                                      }}>
                                      +1
                                    </Button>
                                  </Box>
                                </TableCell>
                                <TableCell align="center">
                                  <Box
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
                                        fontSize: "8px",
                                        minWidth: "30px",
                                      }}>
                                      復原
                                    </Button>
                                    <Typography>
                                      {player.state.blocks}
                                    </Typography>
                                    <Button
                                      size="small"
                                      variant="contained"
                                      sx={{
                                        padding: "4px !important",
                                        boxShadow: "0px 0px 0px 0px",
                                        fontSize: "8px",
                                        minWidth: "30px",
                                      }}>
                                      +1
                                    </Button>
                                  </Box>
                                </TableCell>
                                <TableCell align="center">--</TableCell>
                              </TableRow>
                            ))}
                        </TableBody>

                        <Typography
                          sx={{
                            p: 1,
                            pt: 3,
                            fontSize: "13px",
                          }}>
                          未上場球員
                        </Typography>

                        <TableBody
                          sx={{
                            mt: "20px",
                          }}>
                          {[...playerData]
                            .filter((player: any) => !player.isStarting)
                            .map((player: any, index: number) => (
                              <TableRow
                                key={player.id}
                                sx={{
                                  opacity: 0.4,
                                }}>
                                <TableCell
                                  component={"th"}
                                  scope="row"
                                  align="center">
                                  {player.name}
                                </TableCell>
                                <TableCell align="center">
                                  {player.state.twoPoints.goals}
                                </TableCell>
                                <TableCell align="center">
                                  {player.state.twoPoints.attempts}
                                </TableCell>

                                <TableCell align="center">
                                  {(player.state.twoPoints.goals /
                                    player.state.twoPoints.attempts) *
                                    100 || 0}{" "}
                                  %
                                </TableCell>
                                <TableCell align="center">
                                  {player.state.threePoints.goals}
                                </TableCell>
                                <TableCell align="center">
                                  {player.state.threePoints.attempts}
                                </TableCell>
                                <TableCell align="center">
                                  {(player.state.threePoints.goals /
                                    player.state.threePoints.attempts) *
                                    100 || 0}{" "}
                                  %
                                </TableCell>
                                <TableCell align="center">
                                  {player.state.penalty.goals}
                                </TableCell>
                                <TableCell align="center">
                                  {player.state.penalty.attempts}
                                </TableCell>
                                <TableCell align="center">
                                  {(player.state.penalty.goals /
                                    player.state.penalty.attempts) *
                                    100 || 0}{" "}
                                  %
                                </TableCell>
                                <TableCell align="center">
                                  {player.state.rebounds.offensive}
                                </TableCell>
                                <TableCell align="center">
                                  {player.state.rebounds.defensive}
                                </TableCell>
                                <TableCell align="center">
                                  {player.state.rebounds.defensive +
                                    player.state.rebounds.offensive}
                                </TableCell>

                                <TableCell align="center">
                                  {player.state.assists}
                                </TableCell>
                                <TableCell align="center">
                                  {player.state.turnovers}
                                </TableCell>
                                <TableCell align="center">
                                  {player.state.fouls}
                                </TableCell>
                                <TableCell align="center">
                                  {player.state.steals}
                                </TableCell>
                                <TableCell align="center">
                                  {player.state.blocks}
                                </TableCell>
                                <TableCell align="center">--</TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Fragment>
                    )}
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <ChangePlayersModal
        open={openChangePlayer}
        handleClose={handleCloseChangePlayer}
        players={playerData.filter((player: any) => !player.isStarting)}
        clockoutPlayerId={clockoutPlayer}
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
