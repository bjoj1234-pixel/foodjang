import { useState,useContext } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './common/common.css'
import Header from './common/Header/Header'
import Footer from './common/Footer/Footer'
import MealsData from './api/MealsData'
import NewMeals from './pages/NewMeals/NewMeals'
import MealsDetail from './pages/Detail/MealsDetail';
import Home from './pages/Home/Home'
import Login from './common/Login/Login'
import AuthProvider from './AuthContext';
import Wish from './pages/Wish/Wish';
import Join from './pages/Join/Join';


function App() {
  
  const data = MealsData();

  return (
    <>
    {/* <AuthProvider>가 <BrowserRouter>안에 있으면 라우터가 페이지를 이동할때 마다 마운트->언마운트를 반복하기때문에, 데이터가 초기화됨.  */}
    {/* 초기화되면 안되는 로그인 id같은 경우 원래 세션이나, LocalStorage저장해서 가지고 이동하는게 원칙. */}
      {/* <AuthProvider> */}
        <BrowserRouter>
          <AuthProvider >
            <Header />
            
            <Routes>
              <Route path='/' element={<Home data={data}/>}></Route>
              <Route path='/login' element={<Login data={data}/>}></Route>
              <Route path='/join' element={<Join/>}></Route>
              <Route path='/wish' element={<Wish />}></Route>
              <Route path='/new' element={<NewMeals data={data}/>}></Route>
              <Route path='/detail/:id' element={<MealsDetail data={data}/>}></Route>
            </Routes>

            <Footer />
          </AuthProvider>
        </BrowserRouter>      
      {/* </AuthProvider> */}
    </>
  )
}

export default App
