import { useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { Link } from "react-router-dom";
import './Home.css'

export default function Home({data}){
    const{wishList, wishHandler} = useContext(AuthContext);

    //data얕은 복사
    const copyData1 = [...data];
    //인기상품 정렬(평점순)
    const best = copyData1.sort((a,b)=> b.rating - a.rating);

    //data얕은 복사
    const copyData2 = [...data];
    //리뷰많은순 정렬
    const review = copyData2.sort((a,b)=> b.reviewCount - a.reviewCount);

    
    return(
        <section className="container">
            <div className="main-bn">
                {/* 메인배너 */}
            </div>
            <div className="contents">
                <div className="con1">
                    <h2>평점이 높은 상품</h2>
                    <ul>
                        {best.slice(0,6).map((item)=>(
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
                <div className="con2">
                    <h2>리뷰가 많은 상품</h2>
                    <ul>
                        {review.slice(0,6).map((item)=>(
                            <li key={item.id}>
                                <Link to={`/detail/${item.id}`}>
                                    <img src={item.image} alt="#" /> 
                                    <p className="product-name">{item.name}</p>
                                    <p className="product-ingre">{item.ingredients}</p>
                                </Link>
                                    <p className="product-reviewCount">⭐{item.rating} 💬{item.reviewCount}
                                        <button type="button" onClick={()=>wishHandler(item)}>
                                            {wishList[item.id] === undefined || wishList[item.id].div === false ? '🤍찜하기':'🧡찜해제'}
                                        </button>
                                    </p> 
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )

}