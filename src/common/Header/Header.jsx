import { Link } from "react-router-dom";
import './Header.css';
import { useContext } from "react";
import { AuthContext } from "../../AuthContext";

export default function Header(){
    const {user,logout} = useContext(AuthContext);
    //console.log(user);
    return(
        <>
            <header>
                <div className="header-wrap">
                    <div className="a-link">
                        {user ? (<>
                            <span>{user.userId}님 입장</span>
                            <button type="button" onClick={logout}>로그아웃</button>
                        </>)                   
                        :(<>
                                <Link to='/login'>로그인</Link>
                                <Link to='/join'>회원가입</Link>
                        </>)}                        
                        <Link to='/wish'>찜목록</Link>
                    </div>
                    <div className="logo-wrap">
                        <Link to='/'>
                            <img src="../img/logo.gif" alt="로고" />
                        </Link>
                    </div>
                    <nav>
                        <ul>
                            <li>
                                <Link to='/new'>신상품</Link>
                            </li>
                            <li>
                                <Link to='/new'>베스트</Link>
                            </li>
                            <li>
                                <Link to='/new'>알뜰쇼핑</Link>
                            </li>
                            <li>
                                <Link to='/new'>선물세트</Link>
                            </li>                        
                        </ul>
                    </nav>
                </div>
                <div className="header-border"></div>
            </header>
        </>
    )
}