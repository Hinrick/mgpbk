import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Modal,
  Button,
  Checkbox,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";

import { useAppDispatch } from "../hooks";
import { createGameEvent } from "../store/slices/gameEventSlice";

const ShotAttemptModal: React.FC<{
  open: boolean;
  handleClose: () => void;
  players: any[];
  gameId: string;
  teamId: string;
}> = ({ open, handleClose, players, gameId, teamId }) => {
  const dispatch = useAppDispatch();
  const [step, setStep] = React.useState(1);
  const [selectedPlayer, setSelectedPlayer] = React.useState("");
  const [attemptType, setAttemptType] = React.useState("");
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [position, setPosition] = React.useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const handleAddData = () => {
    const data = {
      gameId: gameId,
      playerId: selectedPlayer,
      teamId: teamId,
      eventType:
        attemptType === "two_points"
          ? "TWO_POINTS_ATTEMPT"
          : "THREE_POINTS_ATTEMPT",
      details: {
        success: isSuccess,
      },
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
    setStep(1);
    setSelectedPlayer("");
    setAttemptType("");
    setIsSuccess(false);
    setPosition({ x: 0, y: 0 });
  }, [open]);

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
            球員出手
          </Typography>
          <Typography sx={{ mt: 1 }}>請選擇出手球員</Typography>
          {step === 1 && (
            <PlayerSelection
              setSelectedPlayer={setSelectedPlayer}
              setStep={setStep}
              players={players}
            />
          )}
          {step === 2 && (
            <AttemptSelection
              setAttemptType={setAttemptType}
              setIsSuccess={setIsSuccess}
              setStep={setStep}
              attemptType={attemptType}
              isSuccess={isSuccess}
            />
          )}
          {step === 3 && (
            <AttemptPosition
              setPosition={setPosition}
              handleClose={handleClose}
              handleAddData={handleAddData}
            />
          )}
        </Box>
      </Modal>
    </Box>
  );
};

const PlayerSelection: React.FC<{
  setSelectedPlayer: React.Dispatch<React.SetStateAction<string>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  players: any[];
}> = ({ setSelectedPlayer, setStep, players }) => {
  const handleNextStep = (playerId: string) => {
    console.log(playerId);
    setSelectedPlayer(playerId);
    setStep(2);
  };

  return (
    <Box
      sx={{
        p: 2,
      }}>
      <Box>
        <List>
          {players.map((player) => (
            <ListItemButton onClick={() => handleNextStep(player.id)}>
              <ListItemIcon>
                <Checkbox />
              </ListItemIcon>
              <ListItemText primary={player.name} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Box>
  );
};

const AttemptSelection: React.FC<{
  setAttemptType: React.Dispatch<React.SetStateAction<string>>;
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  attemptType: string;
  isSuccess: boolean;
}> = ({ setAttemptType, setIsSuccess, setStep, attemptType, isSuccess }) => {
  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}>
      <Select
        onChange={(e) => {
          setAttemptType(e.target.value);
        }}
        value={attemptType}
        size="small"
        displayEmpty>
        <MenuItem value="" disabled>
          請選擇出手種類
        </MenuItem>
        <MenuItem value="two_points">2分球</MenuItem>
        <MenuItem value="three_points">3分球</MenuItem>
      </Select>
      <Select
        onChange={(e) => {
          setIsSuccess(e.target.value === "goal" ? true : false);
          setStep(3);
        }}
        value={""}
        size="small"
        displayEmpty>
        <MenuItem value="" disabled>
          請選擇是否進球
        </MenuItem>
        <MenuItem value="goal">球進</MenuItem>
        <MenuItem value="miss">球沒進</MenuItem>
      </Select>
    </Box>
  );
};

const AttemptPosition: React.FC<{
  setPosition: React.Dispatch<
    React.SetStateAction<{
      x: number;
      y: number;
    }>
  >;
  handleClose: () => void;
  handleAddData: () => void;
}> = ({ setPosition, handleClose, handleAddData }) => {
  const [x, setX] = React.useState(0);
  const [y, setY] = React.useState(0);
  const [isClick, setIsClick] = React.useState(false);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Get the bounding rectangle of the target element
    const rect = e.currentTarget.getBoundingClientRect();

    // Calculate the click position inside the element
    const xInsideElement = e.clientX - rect.left;
    const yInsideElement = e.clientY - rect.top;

    // Log the relative position
    setX(xInsideElement);
    setY(yInsideElement);
    setIsClick(true);
    setPosition({
      x: xInsideElement,
      y: yInsideElement,
    });
  };

  const handleSubmit = () => {
    handleClose();
    handleAddData();
  };

  useEffect(() => {
    setIsClick(false);
  }, []);

  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Box
        onClick={handleClick}
        sx={{
          position: "relative",
        }}>
        <Box
          sx={(theme) => ({
            display: isClick ? "block" : "none",
            position: "absolute",
            top: y,
            left: x,
            backgroundColor: theme.palette.secondary.main,
            width: "10px",
            height: "10px",
            borderRadius: "50%",
          })}
        />
        <img
          style={{ width: "400px" }}
          src={"/img/basketball_half.png"}
          alt="basketball_court_half"
        />
      </Box>
      <Box
        sx={{
          pt: 2,
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}>
        <Button variant="contained" disabled={!isClick} onClick={handleSubmit}>
          儲存
        </Button>
      </Box>
    </Box>
  );
};

export default ShotAttemptModal;
