import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Link,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest, registerRequest, logout } from "../../actions";
import { RootState } from "../../types";
// import { RootState } from "../../redux/store";
// import { loginRequest, signupRequest, logout } from "../../redux/slices/userSlice";

enum AuthType {
  Login = "login",
  SignUp = "signUp",
  ForgotPassword = "forgotPassword",
}

const AuthForm: React.FC = () => {
  const [authType, setAuthType] = useState<AuthType>(AuthType.Login);
  const [firstName, setFirstName] = useState<string>(""); // 🔹 First Name
  const [lastName, setLastName] = useState<string>(""); // 🔹 Last Name
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const dispatch = useDispatch();
  const {
    isAuthenticated,
    firstName: userFirstName,
    lastName: userLastName,
    error,
    loading,
  } = useSelector((state: RootState) => state.user);

  // const whole = useSelector((state: RootState) => state.user);

  // console.log("whole ----> ", whole);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (authType === AuthType.Login) {
      dispatch(loginRequest({ email, password }));
    } else if (authType === AuthType.SignUp) {
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      dispatch(registerRequest({ firstName, lastName, email, password }));
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
              Welcome, {userFirstName} {userLastName}!
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

            {/* 🔹 Show Error Message if Login or Sign-Up Fails */}
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              {authType === AuthType.SignUp && (
                <>
                  <TextField
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    disabled={loading}
                  />
                  <TextField
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    disabled={loading}
                  />
                </>
              )}

              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
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
                  disabled={loading}
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
                  disabled={loading}
                />
              )}

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : authType === AuthType.Login ? (
                  "Login"
                ) : authType === AuthType.SignUp ? (
                  "Sign Up"
                ) : (
                  "Reset Password"
                )}
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
                    disabled={loading}
                  >
                    Forgot Password?
                  </Link>
                  <br />
                  <Link
                    component="button"
                    variant="body2"
                    onClick={() => setAuthType(AuthType.SignUp)}
                    disabled={loading}
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
                  disabled={loading}
                >
                  Already have an account? Login
                </Link>
              )}

              {authType === AuthType.ForgotPassword && (
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => setAuthType(AuthType.Login)}
                  disabled={loading}
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
