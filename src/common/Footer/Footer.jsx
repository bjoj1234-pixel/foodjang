import './Footer.css'

export default function Footer(){
    return(
        <>
            <footer>
                <div className="footer-wrap">
                    <div className="ft-left">
                        <p className="txt1">고객센터<br />1899-4797</p>
                        <p className="txt2">
                            평일 10:00~17:00<br />
                            점심시간 12:00~13:00<br />
                            토요일/일요일/공휴일 휴무
                        </p>
                    </div>
                    <div className="ft-right">
                        <p className="txt1"> 
                            <img src="/img/logo.gif" alt="logo" />
                            <span>
                                COMPANY : (주)푸드장 / OWNER : 조제효 / CALL CENTER : 1899-4797 / FAX : 02-356-8448<br />
                                ADDRESS : 본사 (사무실) - 서울특별시 서초구 사임당로 52(서초동) 2층 푸드장<br />
                                                    반품 주소지 (물류센터) - 경기도 고양시 일산동구 감내길 22푸드장<br />
                                개인정보관리책임자 : 조제효 help@foodjang.com<br />
                                사업자등록번호 : [188-87-00048] / 통신판매업 신고번호 : 제2023-서울서초-0995호 [사업자정보확인]<br />
                                입금계좌 : (주)푸드장 - 기업은행 55503373004011 (기타 은행은 고객센터로 문의)
                            </span>
                        </p>
                        <p className="txt2">Copyright (c) by foodjang.com. All Right Reserved.</p>
                    </div>
                </div>
            </footer>
        </>
    )
}