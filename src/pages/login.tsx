// pages/login.tsx
import { useState } from 'react';
import { login } from '../uitls/api';

const LoginPage: React.FC = () => {
    const [logindata, setLogindata] = useState({
        username: '',
        password: '',
    });

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

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
        } catch (error:any) {
            setError(error);
        }
    };

    return (
        <div>
            <h1>로그인</h1>
            <form onSubmit={handleSubmit}>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                {success && <div style={{ color: 'green' }}>{success}</div>}
                
                <input name="username" placeholder="아이디" value={logindata.username} onChange={handleChange} required />
                <input name="password" type="password" placeholder="비밀번호" value={logindata.password} onChange={handleChange} required />

                <button type="submit">로그인</button>
            </form>
        </div>
    );
};

export default LoginPage;
