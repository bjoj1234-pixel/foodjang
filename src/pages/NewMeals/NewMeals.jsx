import { useState,useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import './NewMeals.css';

export default function NewMeals({data}){
    const{wishList, wishHandler} = useContext(AuthContext);
    
    //현재 보여지는 리스트
    const[list, setList] = useState(null);
    //음식종류 선택값
    const[inputVal, setInputVal] = useState('');
    //00개씩 보기
    const[view, setView] = useState(6);
    //현재고른 카테고리의 체크표시를 위한 변수
    const[checked, setChecked] = useState(null);


    const listRating = () =>{
        let copyData = [];
        //만약 음식종류를 선택하지 않았다면(전체선택)에는 전체데이터를 복사
        if(inputVal === null || inputVal === undefined || inputVal === '' || inputVal === 'all'){
            copyData = [...data];
        }else{
        //만약 음식종류를 선택했다면 현재 리스트 데이터를 복사
            copyData = [...list];
        }
        //복사한 데이터를 별점순으로 정렬
        const copySort = copyData.sort((a,b)=> b.rating - a.rating);        
        setList(copySort);
    }

    const listReview = () =>{
        let copyData = [];
       //만약 음식종류를 선택하지 않았다면(전체선택)에는 전체데이터를 복사
        if(inputVal === null || inputVal === undefined || inputVal === '' || inputVal === 'all'){
            copyData = [...data];
        }else{
        //만약 음식종류를 선택했다면 현재 리스트 데이터를 복사
            copyData = [...list];
        }
        //복사한 데이터를 리뷰순으로 정렬
        const copySort = copyData.sort((a,b)=> b.reviewCount - a.reviewCount);        
        setList(copySort);
    }

    const listChange = (val) =>{
        setInputVal(val);

        const copyData = [...data];
        //인풋select에 선택된 값이 all이 아닐경우 해당 값과 동일한 data 카테고리로 필터링
        if(val !== 'all'){
            const filtering = copyData.filter((item)=>(item.mealType.includes(val) || item.tags.includes(val)));
            setList(filtering);
        }else{
            setList(copyData);
        }

        setChecked(null);
      
    }
    
    //인풋select에 선택된 값으로 view(00개씩 보기) 상태 변경
    const viewChange = (view) =>{    
        setView(Number(view));
    }

    //현재 선택된 카테고리에 체크 표시를 위한 함수
    const checkHandler = (key) =>{
        setChecked(key);
    }


    return(
        <section className="main-content">
            <div className="category">
                <p>상품갯수 {list !== null && list !== undefined ? list.length : data.length}개</p>
                <div className="btns">
                    <label htmlFor="mealtype">음식종류</label>
                    <select name="mealtype" id="mealtype" onChange={(e)=>listChange(e.target.value)} value={inputVal}>
                        <option value="all">전체</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                        <option value="Pasta">Pasta</option>
                        <option value="Salad">Salad</option>
                        <option value="Snacks">Snacks</option>
                    </select>
                    
                    <label htmlFor="list-view">보기</label>
                    <select name="list-view" id="list-view" onChange={(e)=>viewChange(e.target.value)} value={view}>
                        <option value="6">6개씩보기</option>
                        <option value="12">12개씩보기</option>
                        <option value="18">18개씩보기</option>
                        <option value="24">24개씩보기</option>
                        <option value="30">30개씩보기</option>
                    </select>
                    <button type="button" onClick={()=>{listRating();checkHandler(1);}}>{checked === 1 ? '✔️' : null}별점순</button>
                    <button type="button" onClick={()=>{listReview();checkHandler(2);}}>{checked === 2 ? '✔️' : null}리뷰순</button>
                </div>
            </div>
            <div className="contents">
                <ul>
                    {list !== null && list !== undefined ? list.slice(0,view).map((item)=>(
                        <li key={item.id}>
                            <Link to={`/detail/${item.id}`}>
                                <img src={item.image} alt="#" /> 
                                <p className="product-name">{item.name}</p>
                                <p className="product-ingre">{item.ingredients}</p>
                            </Link>
                                <p className="product-rating">⭐{item.rating} 💬{item.reviewCount} 
                                    <button type="button" onClick={()=>wishHandler(item)}>
                                        {wishList[item.id] === undefined || wishList[item.id].div === false ? '🤍찜하기':'🧡찜해제'}
                                    </button>
                                </p>
                            
                        </li>
                    )) : [...data].slice(0,view).map((item)=>(
                        <li key={item.id}>
                            <Link to={`/detail/${item.id}`}>
                                <img src={item.image} alt="#" /> 
                                <p className="product-name">{item.name}</p>
                                <p className="product-ingre">{item.ingredients}</p>
                            </Link>
                                <p className="product-rating">⭐{item.rating} 💬{item.reviewCount} 
                                    <button type="button" onClick={()=>wishHandler(item)}>
                                        {wishList[item.id] === undefined || wishList[item.id].div === false ? '🤍찜하기':'🧡찜해제'}
                                    </button>
                                </p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}