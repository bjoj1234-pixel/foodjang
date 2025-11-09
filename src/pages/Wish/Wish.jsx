import '../Wish/Wish.css'
import { useState, useContext } from "react";
import { AuthContext } from '../../AuthContext';
import { Link } from "react-router-dom";

export default function Wish(){
    const{wishList, wishArray, setWishArray, wishHandler} = useContext(AuthContext);

    

    return(
        <section className="main-content">
            <div className="contents">
                <h2>찜목록</h2>
                <ul>
                    {wishArray && wishArray.length > 0 ? (wishArray.sort((a,b)=> b.date - a.date).map((item)=>(
                        <li key={item.id}>
                            <Link to={`/detail/${item.id}`}>
                                <img src={item.image} alt="#" /> 
                                <p className="product-name">{item.name}</p>
                                <p className="product-ingre">{item.ingredients}</p>
                            </Link>
                            <p className="product-delete">
                                <button type="button" onClick={()=>wishHandler(item)}>❌삭제</button>
                            </p>
                        </li>     
                    ))) : <p>찜한 상품이 없습니다.</p>}
                </ul>
            </div>
        </section>
    )

}