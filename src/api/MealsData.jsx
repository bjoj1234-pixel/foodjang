import { useState, useEffect } from "react";

export default function MealsData(){
    const[data, setData] = useState([]);
    const[error, setError] = useState(null);

    useEffect(()=>{
        fetch('https://dummyjson.com/recipes')
        .then((res)=>{
            if(!res.ok){
                throw new Error(`에러메시지 ${res.status}`)
            }
            return res.json()
        })
        .then((data)=>{
            setData(data.recipes);
        })
        .catch((err)=>{
            console.error(`오류 : ${err.message}`);
            setError(err.message);
        })
        .finally(()=>{
            console.log('요청완료');
        })

    },[])

    return data;
}