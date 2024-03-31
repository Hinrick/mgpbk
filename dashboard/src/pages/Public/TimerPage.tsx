// ./pages/ExamplePage.tsx

import React, { useState, useEffect } from "react";
import { Container, Typography, Button, Box } from "@mui/material";

const TimerPage: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  // Effect example
  useEffect(() => {
    // This could be an API call to fetch data on component mount
    console.log("Component did mount");
  }, []);

  // Event handler example
  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "2rem",
      }}>
      <Typography variant="h4" component="h1">
        直播計時器
      </Typography>
      <Box>
        <Box>
          <Typography>第一節:</Typography>
        </Box>
        <Box></Box>
      </Box>
    </Container>
  );
};

export default TimerPage;
