import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import Nav from "./components/Nav";
import Main from "./pages/Main";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ExhibitionList from "./pages/ExhibitionList";
import Exhibition from "./pages/Exhibition";
import ExhibitionWrite from "./pages/ExhibitionWrite";
import MypageEdit from "./pages/MypageEdit";
import MypageWrite from "./pages/MypageWrite";
import Footer from "./components/Footer";

const App = () => (
  <BrowserRouter>
    <Nav />
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup?" element={<SignUp />} />
      <Route path="/exhibition-list" element={<ExhibitionList />} />
      <Route path="/exhibition/:id" element={<Exhibition />} />
      <Route path="/exhibition-write" element={<ExhibitionWrite />} />
      <Route path="/mypage" element={<MypageEdit />} />
      <Route path="/mypage/write" element={<MypageWrite />} />
      <Route path="/mypage/bookmark" element={<MypageWrite />} />
    </Routes>
    <ReactQueryDevtools />
    <Footer />
  </BrowserRouter>
);

export default App;
