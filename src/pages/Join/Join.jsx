import './Join.css';
import DaumPostCode from 'react-daum-postcode';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Join(){
    //모달창 상태
    const[isOpen, setIsOpen] = useState(false);
    //주소입력 상태
    const[isAddress, setIsAddress] = useState(false);
    
    //우편번호
    const[zipcode, setZipcode] = useState('');
    //주소
    const[address, setAddress] = useState('');
    //상세주소
    const[detailAdd, setDetailAdd] = useState('');
    //상세주소표시
    const[detailAddView, setDetailAddView] = useState('');

    //주소선택시 주소값 보내기
    const addressHandler = (data) =>{
        let arr = '';
        if(data.userSelectedType === 'R'){
            arr = data.roadAddress;
        }else{
            arr = data.jibunAddress;
        }
        setZipcode(data.zonecode);
        setAddress(arr);
        setIsOpen(!isOpen);
        setIsAddress(true);
    }
    //모달 토글
    const toggle = () =>{
        setIsOpen(!isOpen);
    
    }

    //상세주소 입력 클릭시 표시
    const detailAddress = (detailAdd) =>{
        setDetailAddView(detailAdd)
    }

    //아이디
    const[inputId, setInputId] = useState('');
    //비번
    const[inputPw, setInputPw] = useState('');
    //비밀번호 확인
    const[inputPwRe, setInputPwRe] = useState('');
    //이름
    const[inputName, setInputName] = useState('');
    //휴대폰
    const[inputPhone, setInputPhone] = useState('');
    //이메일
    const[inputEmail, setInputEmail] = useState('');
    //성별
    const[inputGender, setInputGender] = useState('');
    //개인정보수집
    const[inputInfo, setInputInfo] = useState(false);
    //가입상태
    const[join, setJoin] = useState(false);

    const submitHandler = ()=>{
        if(inputId === ''){
            alert('아이디를 입력하세요');
        }else if(inputPw === ''){
            alert('비밀번호를 입력하세요');
        }else if(inputPwRe === ''){
            alert('비밀번호를 다시한번 입력하세요');
        }else if(inputName === ''){
            alert('이름을 입력하세요');
        }else if(inputPhone === ''){
            alert('휴대폰번호를 입력하세요');
        }else if(zipcode === '' || address === '' || detailAddView === ''){
            alert('주소를 입력해주세요');
        }else if(inputPw !== inputPwRe){
            alert('비밀번호가 일치하지 않습니다');
        }else if(inputInfo !== true){
            alert('개인정보수집에 체크해주세요');
        }else{
            setJoin(true);
        }
    }

    const infoToggle = () =>{
        setInputInfo(!inputInfo);
    }

    return(
        <div className="join-wrap">
            <h2>회원가입</h2>
            <div className="join-input">
                <div>
                    {/* <form onSubmit={submitHandler}> */}
                {!join ? (
                    <>
                    <label htmlFor="user-id">아이디*</label>
                    <input type="text" name='user-id' id='user-id' placeholder='아이디' onChange={(e)=>setInputId(e.target.value)} value={inputId}/>
                    
                    <label htmlFor="user-pw">비밀번호*</label>
                    <input type="password" name='user-pw' id='user-pw' placeholder='비밀번호' onChange={(e)=>setInputPw(e.target.value)} value={inputPw}/>
                    
                    <label htmlFor="user-pw">비밀번호 확인*</label>
                    <input type="password" name='user-pwRe' id='user-pwRe' placeholder='비밀번호 확인' onChange={(e)=>setInputPwRe(e.target.value)} value={inputPwRe}/>
                    
                    <label htmlFor="user-name">이름*</label>
                    <input type="text" name='user-name' id='user-name' placeholder='이름' onChange={(e)=>setInputName(e.target.value)} value={inputName}/>

                    <label htmlFor="user-phone">휴대폰번호*</label>
                    <input type="text" name='user-phone' id='user-phone' placeholder='휴대폰번호' onChange={(e)=>setInputPhone(e.target.value)} value={inputPhone}/>

                    <label htmlFor="user-email">이메일</label>
                    <input type="text" name='user-email' id='user-email' placeholder='이메일' onChange={(e)=>setInputEmail(e.target.value)} value={inputEmail}/>

                    <label htmlFor="user-address">주소*</label>
                    <button type='button' onClick={toggle}>주소검색</button>

                    {isAddress &&
                        <div className="address-wrap">
                            <label htmlFor="detailAddress" style={{marginTop:'3px'}}>상세주소입력</label>
                            <input type="text" placeholder='상세주소입력' name='detailAddress' id='detailAddress' value={detailAdd} onChange={(e)=>setDetailAdd(e.target.value)} />
                            <button type='button' onClick={()=>detailAddress(detailAdd)}>상세주소입력</button>
                            <p style={{marginTop:'13px'}}>입력한 주소: {zipcode} {address} {detailAddView}</p>
                        </div>
                    }                    

                    <span className='user-gender'>성별 </span>
                    
                    <input type="radio" name="user-gender" id="user-man" onClick={()=>setInputGender('main')} value={inputGender} />
                    <label htmlFor="user-man">남</label>
                    
                    <input type="radio" name="user-gender" id="user-woman" onClick={()=>setInputGender('woman')} value={inputGender} />
                    <label htmlFor="user-woman">여</label>
                    <br />

                    <input type="checkbox" name="user-agree" id="user-agree" onClick={infoToggle} value={inputInfo} />
                    <label htmlFor="user-agree">개인정보 수집 및 이용 동의(필수)</label>
                    
                    <button type='submit' onClick={submitHandler}>동의하고 가입하기</button>
                    </>
                ):(
                    <>
                        <p>회원가입이 완료되었습니다.</p>
                        <p>{inputName}님 환영합니다.</p>
                        <Link to='/'><button type='button'>쇼핑하러가기</button></Link>
                    </>
                )}
                    {/* </form> */}
                </div>
            </div>
            
            {isOpen &&
                <div className='modalOverlay' onClick={toggle}>
                    <div className="modalWrap">
                        <button className='closeBtn' onClick={toggle}>X</button>
                        <DaumPostCode onComplete={addressHandler}  style={{height:'500px',width:'500px'}}/>
                    </div>
                </div>
            }            
        </div>        
    )
}