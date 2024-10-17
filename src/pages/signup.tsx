"use client"
import { useState, FC, ChangeEvent, FormEvent } from "react";
import { signup } from "../utils/api";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
const SignupPage: FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password1: "",
    password2: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    console.log(formData);

    try {
      const result = await signup(formData);
      setSuccess(result);
      const { id, username, accessToken, refreshToken } = result;
      setSuccess(`환영합니다, ${username}님! 당신의 ID는 ${id}입니다.`);
      console.log("User ID:", id);
      console.log("Username:", username);
      // 세션 스토리지에 저장
      sessionStorage.setItem("userId", id);
      sessionStorage.setItem("username", username);
      // sessionStorage.setItem("accessToken", accessToken);
      // sessionStorage.setItem("refreshToken", refreshToken);

      setFormData({
        username: "",
        password1: "",
        password2: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
      });
    } catch (error: any) {
      const errorMessage =
        error.response?.data || error.message || "Unknown error occurred";
      setError(errorMessage);
    }
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          "& .MuiTextField-root": { width: "25ch" },
        }}
      >
        <form onSubmit={handleSubmit}>
          {error && <div style={{ color: "red" }}>{String(error)}</div>}
          {success && <div style={{ color: "green" }}>{success}</div>}

          <TextField
            name="username"
            label="아이디"
            placeholder="아이디"
            value={formData.username}
            onChange={handleChange}
            margin="normal"
            required
          />
          <br />
          <TextField
            name="password1"
            label="비밀번호"
            type="password"
            placeholder="비밀번호"
            value={formData.password1}
            onChange={handleChange}
            margin="normal"
            required
          />
          <br />
          <TextField
            name="password2"
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호 확인"
            value={formData.password2}
            onChange={handleChange}
            margin="normal"
            required
          />
          <br />
          <TextField
            name="firstName"
            label="이름"
            placeholder="이름"
            value={formData.firstName}
            onChange={handleChange}
            margin="normal"
            required
          />
          <br />
          <TextField
            name="lastName"
            label="성"
            placeholder="성"
            value={formData.lastName}
            onChange={handleChange}
            margin="normal"
            required
          />
          <br />
          <TextField
            name="phoneNumber"
            label="전화번호"
            placeholder="전화번호"
            value={formData.phoneNumber}
            onChange={handleChange}
            margin="normal"
            required
          />
          <br />
          <TextField
            name="email"
            type="email"
            label="이메일"
            placeholder="이메일"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
          />
          <br />
          <Button  variant="contained" color="success" type="submit">회원가입</Button >
        </form>
      </Box>
    </div>
  );
};

export default SignupPage;
