// ./pages/ExamplePage.tsx

import React, { useState, useEffect } from "react";
import { Container, Typography, Button } from "@mui/material";

const ExamplePage: React.FC = () => {
  // State example
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
    <Container maxWidth="lg">
      <Typography variant="h2" component="h1">
        Example Page
      </Typography>
      <Typography variant="body1">
        This is an example page with a counter.
      </Typography>
      <Button variant="contained" color="primary" onClick={incrementCount}>
        Count is: {count}
      </Button>
    </Container>
  );
};

export default ExamplePage;
