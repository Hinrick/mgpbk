import React from "react";
import { Container, Typography, TextField, Button } from "@mui/material";

const LoginPage: React.FC = () => {
  // You would typically handle form state and submission here

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <form>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Sign In
        </Button>
      </form>
    </Container>
  );
};

const GoogleLoginButton = () => {
  const handleLogin = () => {
    // Implement Google sign-in logic here
  };

  return (
    <Button variant="contained" onClick={handleLogin}>
      Login with Google
    </Button>
  );
};

export default LoginPage;
