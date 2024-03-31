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
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchTeamsByLeague } from "../store/slices/teamSlice";

import CreateTeam from "./CreateTeam";

const GameList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { teams, status, error } = useAppSelector((state) => state.team);

  const [openCreateTeam, setOpenCreateTeam] = useState(false);

  const handleOpenCreateGame = () => {
    setOpenCreateTeam(true);
  };

  const handleCloseCreateGame = () => {
    setOpenCreateTeam(false);
  };

  useEffect(() => {
    dispatch(fetchTeamsByLeague());
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
          <Typography variant="h5">球隊列表</Typography>
          <Button variant="contained" onClick={handleOpenCreateGame}>
            建立新球隊
          </Button>
        </Box>
        <Box
          sx={{
            padding: "1rem",
          }}>
          {status === "loading" && <LoadingPage />}
          {error === "failed" && <ErrorPage message={error} />}
          {status === "succeeded" && (
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
                          <TableCell align="center">球隊名稱</TableCell>
                          <TableCell align="center">創立時間</TableCell>
                          <TableCell align="center">教練</TableCell>
                          <TableCell align="center">地區</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {teams.map((team: any, index: number) => (
                          <TableRow
                            key={team.id}
                            sx={{
                              backgroundColor:
                                (index % 2 === 0 && "white") || "#f5f5f5",
                            }}>
                            <TableCell
                              component="th"
                              scope="row"
                              align="center">
                              {team.name}
                            </TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              align="center">
                              {team.establishmentYear}/{team.establishmentMonth}
                              /{team.establishmentDate}
                            </TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              align="center">
                              {team.coach}
                            </TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              align="center">
                              {team.location || team.city || "未設定"}{" "}
                              {team.dist || ""}
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
      <CreateTeam open={openCreateTeam} handleClose={handleCloseCreateGame} />
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
