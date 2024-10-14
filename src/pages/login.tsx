import { useState } from 'react';
import { login } from '../utils/api';
import { useRouter } from 'next/router';
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import ForgotPassword from "./ForgotPassword";
import { GoogleIcon, FacebookIcon, SitemarkIcon } from "./CustomIcons";
import { setSession } from "../utils";
// import AppTheme from '../shared-theme/AppTheme';
// import ColorModeSelect from '../shared-theme/ColorModeSelect';

import { useNavigate } from 'react-router-dom';

const Card = styled(MuiCard)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    width: "100%",
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: "auto",
    [theme.breakpoints.up("sm")]: {
      maxWidth: "450px",
    },
    boxShadow:
      "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
    ...theme.applyStyles("dark", {
      boxShadow:
        "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
    }),
  }));
  
  const SignInContainer = styled(Stack)(({ theme }) => ({
    minHeight: "100%",
    padding: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(4),
    },
    "&::before": {
      content: '""',
      display: "block",
      position: "absolute",
      zIndex: -1,
      inset: 0,
      backgroundImage:
        "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
      backgroundRepeat: "no-repeat",
      ...theme.applyStyles("dark", {
        backgroundImage:
          "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
      }),
    },
  }));
const LoginPage: React.FC = () => {
    const [logindata, setLogindata] = useState({
        username: '',
        password: '',
    });
    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [open, setOpen] = React.useState(false);

    const router = useRouter(); // useRouter 훅 사용

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLogindata({ ...logindata, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const result = await login(logindata);
            setSuccess(result);
            // 로그인 성공 시 처리 (예: 토큰 저장, 리다이렉션 등)
              // ID와 username을 가져오기
                const { id, username } = result;
                setSuccess(`환영합니다, ${username}님! 당신의 ID는 ${id}입니다.`);
            // 이후 처리 (예: 리다이렉션, 상태 저장 등)
            console.log("User ID:", id);
            console.log("Username:", username);

             // 로그인 성공 시 리다이렉트
            // router.push('/');
        } catch(error:any){
            const errorMessage = error.response?.data || error.message || "Unknown error occurred";
            setError(errorMessage)
        }
    };

    // const validateInputs = () => {
    //     const username = document.getElementById("username") as HTMLInputElement;
    //     const password = document.getElementById("password") as HTMLInputElement;
    
    //     let isValid = true;
    
    //     if (!username.value || username.value.length<5) {
    //         alert("아이디의 최소길이는 5자입니다.");
    //       isValid = false;
    //     } 
    
    //     if (!password.value || password.value.length < 1) {
    //       alert("패스워드의 최소길이는 1자입니다");
    //       isValid = false;
    //     } 
    
    //     return isValid;
    //   };

    return (
        <div>
  <CssBaseline enableColorScheme />
  <SignInContainer direction="column" justifyContent="space-between">
    <Card variant="outlined">
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
      >
        로그인
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 2,
        }}
      >
        {error && <div style={{ color: 'red' }}>{String(error)}</div>}
        {success && <div style={{ color: 'green' }}>{success}</div>}

        <TextField
          name="username"
          placeholder="아이디"
          value={logindata.username}
          onChange={handleChange}
          required
          fullWidth
          variant="outlined"
          sx={{ ariaLabel: "username" }}
        />
        
        <FormControl>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <FormLabel htmlFor="password">비밀번호</FormLabel>
            <Link
              component="button"
              type="button"
              onClick={handleClickOpen}
              variant="body2"
              sx={{ alignSelf: "baseline" }}
            >
              비밀번호를 잊으셨나요?
            </Link>
          </Box>
          <TextField
            name="password"
            type="password"
            placeholder="••••••"
            value={logindata.password}
            onChange={handleChange}
            required
            fullWidth
            variant="outlined"
          />
        </FormControl>

        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="로그인 상태 유지"
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
        >
          로그인
        </Button>
        <Typography sx={{ textAlign: "center" }}>
          계정이 없으신가요?{" "}
          <span>
            <Link
              href="http://localhost:3000/signup"
              variant="body2"
              sx={{ alignSelf: "center" }}
            >
              회원가입
            </Link>
          </span>
        </Typography>
      </Box>
      <Divider>또는</Divider>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => alert("Sign in with Google")}
          startIcon={<GoogleIcon />}
        >
          Google로 로그인
        </Button>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => alert("Sign in with Facebook")}
          startIcon={<FacebookIcon />}
        >
          Facebook으로 로그인
        </Button>
      </Box>
    </Card>
  </SignInContainer>
</div>
    );
};

export default LoginPage;
