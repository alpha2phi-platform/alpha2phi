import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import LoadingButton from "@mui/lab/LoadingButton";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ISignUpResult } from "amazon-cognito-identity-js";
import { useAppContext } from "../libs/context";
import { useNavigate } from "react-router-dom";
import AlertDialog from "../components/AlertDialog";
import { ErrorContext } from "../libs/errorContext";
import { useFormFields } from "../libs/formHooks";
import { Link as RouterLink } from "react-router-dom";
import { NewUserType } from "../libs/types";
import { useCognito } from "@serverless-stack/web";

const theme = createTheme();

export default function SignUp() {
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
    confirmPassword: "",
    confirmationCode: "",
  });

  const [newUser, setNewUser] = useState<ISignUpResult | null>(null);
  const { userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const cognito = useCognito();

  const navigate = useNavigate();
  const [error, setError] = useState<ErrorContext>({ hasError: false });
  const closeDialog = () => {
    setError({ hasError: false });
  };

  function validateForm() {
    return (
      fields.email.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword
    );
  }

  function validateConfirmationForm() {
    return fields.confirmationCode.length > 0;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      const newUser: NewUserType = {
        username: fields.email,
        password: fields.password,
      };
      const signUpResult = await cognito.register(
        newUser.username,
        newUser.password
      );

      setIsLoading(false);
      setNewUser(signUpResult);
    } catch (e: any) {
      setError({ hasError: true, title: "Signup", error: e });
      if (e.name === "UsernameExistsException") {
        const signUpResult = await cognito.resend(fields.email);
        setNewUser(signUpResult);
      }
      setIsLoading(false);
    }
  };

  const handleConfirmationSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await cognito.confirm(fields.email, fields.confirmationCode);
      await cognito.login(fields.email, fields.password);
      userHasAuthenticated(true);
      navigate("/", { replace: true });
    } catch (e) {
      setError({ hasError: true, title: "Confirmation", error: e });
      setIsLoading(false);
    }
  };

  function renderConfirmationForm() {
    return (
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleConfirmationSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="confirmationCode"
                label="Confirmation Code"
                name="confirmationCode"
                autoFocus
                value={fields.confirmationCode}
                onChange={handleFieldChange}
                helperText="Please check your email for the code."
              />
            </Grid>
          </Grid>
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            loading={isLoading}
            disabled={!validateConfirmationForm()}
          >
            Verify
          </LoadingButton>
        </Box>
      </Box>
    );
  }
  function renderSignupForm() {
    return (
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoFocus
                autoComplete="email"
                value={fields.email}
                onChange={handleFieldChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={fields.password}
                onChange={handleFieldChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                onChange={handleFieldChange}
                value={fields.confirmPassword}
              />
            </Grid>
          </Grid>
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            loading={isLoading}
            disabled={!validateForm()}
          >
            Sign Up
          </LoadingButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          marginBottom: "36px",
        }}
      >
        <CssBaseline />
        <AlertDialog context={error} onClose={closeDialog} />
        {newUser === null ? renderSignupForm() : renderConfirmationForm()}
      </Container>
    </ThemeProvider>
  );
}
