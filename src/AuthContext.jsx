import { useState,useEffect } from "react";
import { createContext } from "react";
import { useNavigate } from 'react-router-dom';
import MealsData from './api/MealsData'

export const AuthContext = createContext();

export default function AuthProvider({children}){
    const navigate = useNavigate();

    const data = MealsData();
    const[user, setUser] = useState(null);

    const login = (id, pw) =>{
        if(id==='1' && pw==='1'){
            navigate('/');
            setUser({userId: id, userPw: pw});            
        }else{
            alert('id, 비밀번호를 확인하세요');
        }
    }
    const logout = () =>{
        navigate('/login');
        setUser(null);        
    }

    const wish = {};
    
    if(data.length > 0){ 
        for(let i=0; i<data.length; i++){
            
            const copyData = data[i];
            //위에 wish객체를 초기값줬듯, wish[copyData.id] 객체에도 초기값줘야됨.
            wish[copyData.id] = {div:false, date:null};
        }
    }  

    //찜하기 상태변수
    const[wishList, setWishList] = useState(()=>{
        const saved = localStorage.getItem('wishList');
        //저장된 찜이 있으면 복원, 없으면 빈 객체
        return saved ? JSON.parse(saved) : wish
    });
    
    //찜하기페이지 추가
    const[wishArray, setWishArray] = useState(()=>{
        const saved = localStorage.getItem('wishArray');
        //저장된 찜이 있으면 복원, 없으면 빈 배열
        return saved ? JSON.parse(saved) : []
    });

    //로컬 저장된 찜하기 불러오기
    useEffect(()=>{
        localStorage.setItem('wishList', JSON.stringify(wishList));
        localStorage.setItem('wishArray', JSON.stringify(wishArray));
    },[wishList, wishArray]);

   
    //찜하기 핸들러
    const wishHandler = (product) => {
        setWishList(prev => {
            const newList = { ...prev };

            const current = newList[product.id] || { div: false, date: null };

            // 완전 새로운 객체로 갱신
            const updated = {
                ...current,
                div: !current.div,
                date: !current.div ? new Date() : null,
            };

            newList[product.id] = updated;
            
            //newList에서 true인것만 filter로 추림
            const wishAddPage = data.filter(item => newList[item.id]?.div === true)
            //그 뒤 newList에 있는 date(추가한 시간) 요소를 추가
            .map(item => ({...item, date: newList[item.id]?.date || null}));

            setWishArray(wishAddPage);

            return newList;
        });
    };   


    return(
        <AuthContext.Provider value={{user, setUser, login, logout, wishList, wishArray, wishHandler}}>
            {children}
        </AuthContext.Provider>
    )
}