import { useState,useContext } from "react";
import { AuthContext } from "../../AuthContext";
import './MealsDetail.css';
import { useParams } from "react-router-dom";

export default function MealsDetail({data}){
    const{wishList, wishHandler} = useContext(AuthContext);

    const{id} = useParams();

    const product = data.find((item)=> item.id === Number(id));


    if(!product) return <p>데이터 불러오는중....</p>

    return(
        <>
            {product !== null &&  product !== undefined ? (
                <div className="detail-wrap">
                    <div className="product">
                        <div className="product-left">
                            <img src={product.image} alt={product.name} />
                        </div>
                        <div className="product-right">
                            <h2>{product.name}</h2>
                            <p><strong>MealType:</strong> {product.mealType.join(', ')}</p>
                            {/* 객체내 값에 ,콤마 추가 */}
                            <p><strong>Tags:</strong> {product.tags.join(', ')}</p>
                            <p><strong>Instructions:</strong> {product.instructions}</p>
                            <p><strong>PrepTime:</strong> {product.prepTimeMinutes} Minutes,
                                <strong> CookTime:</strong> {product.cookTimeMinutes} Minutes
                            </p>
                            <p><strong>Difficulty:</strong> {product.difficulty}</p>
                            <button type="button" onClick={()=>wishHandler(product)}>{wishList[product.id] === undefined || wishList[product.id].div === false ? '🤍찜하기':'🧡찜해제'}</button>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    )
}