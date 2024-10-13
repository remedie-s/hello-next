import{useState, FC,ChangeEvent, FormEvent} from 'react'
import { signup } from '../uitls/api'

const SignupPage :FC = () =>{
    const [formData,setFormData]= useState(
        {
            username:'',
            password1:'',
            password2:'',
            firstName:'',
            lastName:'',
            phoneNumber:'',
            email:'',
        }
    )

    const [error,setError]=useState<string|null>(null);
    const [success,setSuccess]=useState<string|null>(null);

    const handleChange =(e:ChangeEvent<HTMLInputElement>)=>{
        const{name,value}= e.target;
        setFormData({...formData, [name] : value});
    }

    const handleSubmit = async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setError(null);
        setSuccess(null);
        console.log(formData);

        try{
            const result = await signup(formData);
            setSuccess(result);
            setFormData({
                username:'',
            password1:'',
            password2:'',
            firstName:'',
            lastName:'',
            phoneNumber:'',
            email:'',
            })}
            catch(error:any){
                const errorMessage = error.response?.data || error.message || "Unknown error occurred";
                setError(errorMessage)
            }
        };

        return (
            <div>
                <form onSubmit={handleSubmit}>
                {error && <div style={{ color: 'red' }}>{String(error)}</div>}
                {success && <div style={{ color: 'green' }}>{success}</div>}
                
                <input name="username" placeholder="아이디" value={formData.username} onChange={handleChange} required />
                <input name="password1" type="password" placeholder="비밀번호" value={formData.password1} onChange={handleChange} required />
                <input name="password2" type="password" placeholder="비밀번호 확인" value={formData.password2} onChange={handleChange} required />
                <input name="firstName" placeholder="이름" value={formData.firstName} onChange={handleChange} required />
                <input name="lastName" placeholder="성" value={formData.lastName} onChange={handleChange} required />
                <input name="phoneNumber" placeholder="전화번호" value={formData.phoneNumber} onChange={handleChange} required />
                <input name="email" type="email" placeholder="이메일" value={formData.email} onChange={handleChange} required />
                
                <button type="submit">회원가입</button>
            </form>
            </div>
        )
    }

export default SignupPage;    


