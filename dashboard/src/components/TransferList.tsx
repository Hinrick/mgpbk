import * as React from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useParams, useLocation } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../hooks";
import { updateGame } from "../store/slices/gameSlice";

function not(a: any[], b: any[]) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: any[], b: any[]) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function TransferList({ players }: { players: any[] }) {
  const dispatch = useAppDispatch();
  let { gameId } = useParams();
  let query = useQuery();
  let home = query.get("home") ? true : false;
  let away = query.get("away") ? true : false;
  const game: any = useAppSelector((state) => state.game.game);
  const gameStatus = useAppSelector((state) => state.game.status);

  const [checked, setChecked] = React.useState<any[]>([]);
  const [left, setLeft] = React.useState<any[]>([
    ...players
      .filter((player) => player.isStarting && player.isCheckIn)
      .map((player) => player),
  ]);
  const [right, setRight] = React.useState<any[]>([
    ...players
      .filter((player) => !player.isStarting && player.isCheckIn)
      .map((player) => player),
  ]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  React.useEffect(() => {
    let updateGameData = {};

    const players = [
      ...left.map((player) => ({
        ...player,
        isStarting: true,
      })),
      ...right.map((player) => ({
        ...player,
        isStarting: false,
      })),
    ];

    if (home) {
      updateGameData = {
        ...game,
        [game.teamAId]: {
          ...game[game.teamAId],
          players: players,
        },
      };
    } else if (away) {
      updateGameData = {
        ...game,
        [game.teamBId]: {
          ...game[game.teamBId],
          players: players,
        },
      };
    }

    if (game.id) {
      dispatch(updateGame(updateGameData));
    }
  }, [left, right, home, away, game, dispatch]);

  const customList = (items: any[]) => {
    return (
      <Paper sx={{ width: 180, height: 250, overflow: "auto" }}>
        <List dense component="div" role="list">
          {items.map((value) => {
            const labelId = `transfer-list-item-${value}-label`;
            return (
              <ListItemButton
                key={value}
                role="listitem"
                onClick={handleToggle(value)}>
                <ListItemIcon>
                  <Checkbox
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{
                      "aria-labelledby": labelId,
                    }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={value.name} />
              </ListItemButton>
            );
          })}
        </List>
      </Paper>
    );
  };

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item>{customList(left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllRight}
            disabled={left.length === 0}
            aria-label="move all right">
            ≫
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right">
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left">
            &lt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllLeft}
            disabled={right.length === 0}
            aria-label="move all left">
            ≪
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList(right)}</Grid>
    </Grid>
  );
}
