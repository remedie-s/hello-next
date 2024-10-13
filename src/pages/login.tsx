// pages/login.tsx
import { useState } from 'react';
import { login } from '../uitls/api';
import { useRouter } from 'next/router';
const LoginPage: React.FC = () => {
    const [logindata, setLogindata] = useState({
        username: '',
        password: '',
    });

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

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

    return (
        <div>
            <h1>로그인</h1>
            <form onSubmit={handleSubmit}>
                {error && <div style={{ color: 'red' }}>{String(error)}</div>}
                {success && <div style={{ color: 'green' }}>{success}</div>}
                
                <input name="username" placeholder="아이디" value={logindata.username} onChange={handleChange} required />
                <input name="password" type="password" placeholder="비밀번호" value={logindata.password} onChange={handleChange} required />

                <button type="submit">로그인</button>
            </form>
        </div>
    );
};

export default LoginPage;
