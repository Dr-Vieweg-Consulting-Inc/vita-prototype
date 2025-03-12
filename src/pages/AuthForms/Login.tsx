import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

type AuthFormProps = {
  type: "login" | "signup" | "forgotPassword";
  onSubmit: (data: { email: string; password?: string }) => void;
};

const AuthForms: React.FC<AuthFormProps> = ({ type, onSubmit }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      email,
      password: type !== "forgotPassword" ? password : undefined,
    });
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          {type === "login"
            ? "Login"
            : type === "signup"
            ? "Sign Up"
            : "Forgot Password"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {type !== "forgotPassword" && (
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            {type === "login"
              ? "Login"
              : type === "signup"
              ? "Sign Up"
              : "Reset Password"}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AuthForms;
