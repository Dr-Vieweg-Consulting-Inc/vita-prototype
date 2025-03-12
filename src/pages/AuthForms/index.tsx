import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Link,
  Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../redux/store";
// import { loginRequest, logout } from "../../redux/slices/userSlice";
import { RootState } from "../../types";
import { loginRequest, logout } from "../../actions";

enum AuthType {
  Login = "login",
  SignUp = "signUp",
  ForgotPassword = "forgotPassword",
}

const AuthForm: React.FC = () => {
  const [authType, setAuthType] = useState<AuthType>(AuthType.Login);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const dispatch = useDispatch();
  const { isAuthenticated, name, error } = useSelector(
    (state: RootState) => state.user
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Handle register and forgot password
    switch (authType) {
      case AuthType.Login:
        dispatch(loginRequest({ email, password }));
        break;
      case AuthType.SignUp:
        // TODO
        break;
      case AuthType.ForgotPassword:
        // TODO
        break;
      default:
        break;
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{ mt: 8, textAlign: "center", p: 3, boxShadow: 3, borderRadius: 2 }}
      >
        {isAuthenticated ? (
          <>
            <Typography variant="h4" gutterBottom>
              Welcome, {name}!
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={handleLogout}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h4" gutterBottom>
              {authType === AuthType.Login
                ? "Login"
                : authType === AuthType.SignUp
                ? "Sign Up"
                : "Forgot Password"}
            </Typography>

            {/* 🔹 Show Error Message if Login Fails */}
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

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

              {authType !== AuthType.ForgotPassword && (
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

              {authType === AuthType.SignUp && (
                <TextField
                  label="Confirm Password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                {authType === AuthType.Login
                  ? "Login"
                  : authType === AuthType.SignUp
                  ? "Sign Up"
                  : "Reset Password"}
              </Button>
            </form>

            {/* 🔹 Switch Between Forms */}
            <Box sx={{ mt: 2 }}>
              {authType === AuthType.Login && (
                <>
                  <Link
                    component="button"
                    variant="body2"
                    onClick={() => setAuthType(AuthType.ForgotPassword)}
                  >
                    Forgot Password?
                  </Link>
                  <br />
                  <Link
                    component="button"
                    variant="body2"
                    onClick={() => setAuthType(AuthType.SignUp)}
                  >
                    Create an Account
                  </Link>
                </>
              )}

              {authType === AuthType.SignUp && (
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => setAuthType(AuthType.Login)}
                >
                  Already have an account? Login
                </Link>
              )}

              {authType === AuthType.ForgotPassword && (
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => setAuthType(AuthType.Login)}
                >
                  Back to Login
                </Link>
              )}
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
};

export default AuthForm;
