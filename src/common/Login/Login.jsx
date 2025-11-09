import '../Login/Login.css'
import { useState, useContext } from "react";
import { AuthContext } from '../../AuthContext';
import { Link } from "react-router-dom";


export default function Login(){
    const{user, setUser, login, logout} = useContext(AuthContext);

    const[inputId, setInputId] = useState('');
    const[inputPw, setInputPw] = useState('');

    const submitHandler = ()=>{
        if(inputId === ''){
            alert('아이디를 입력하세요');
        }else if(inputPw === ''){
            alert('비밀번호를 입력하세요');
        }else{
            login(inputId,inputPw);
        }
    }

    return(
        <div className='login-container'>
            <h2>로그인</h2>
            <div className="login-input">
                <p>회원 로그인</p>
                <div>
                {/* <form onSubmit={submitHandler}> */}
                    <input type="text" placeholder='아이디' value={inputId} onChange={(e)=>setInputId(e.target.value)}/>
                    <input type="text" placeholder='비밀번호' value={inputPw} onChange={(e)=>setInputPw(e.target.value)}/>
                    <input type="checkbox" name="id-save" id="id-save" />
                    <label htmlFor="id-save">아이디 저장</label>
                    <button type='submit' onClick={()=>submitHandler(inputId,inputPw)}>로그인</button>
                {/* </form> */}
                </div>
            </div>
        </div>
    )

}