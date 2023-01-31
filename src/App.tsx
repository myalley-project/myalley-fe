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
import Mypage from "./pages/Mypage";
import MateList from "./pages/MateList";
import Mate from "./pages/Mate";
import Footer from "./components/Footer";
import BlogReviewPage from "./pages/BlogReviewPage";
import BlogReviewDetail from "./components/blogreview/BlogReviewDetail";
import BlogReviewWrite from "./pages/BlogReviewWrite";

const App = () => (
  <BrowserRouter>
    <Nav />
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup?" element={<SignUp />} />
      <Route path="/exhibition-list" element={<ExhibitionList />} />
      <Route path="/exhibition/:id" element={<Exhibition />} />
      <Route
        path="/exhibition/:id/edit"
        element={<ExhibitionWrite mode="edit" />}
      />
      <Route
        path="/exhibition-write"
        element={<ExhibitionWrite mode="create" />}
      />
      <Route path="/mypage/:subpages" element={<Mypage />} />
      <Route path="/mate-list" element={<MateList />} />
      <Route path="/mate/:id" element={<Mate />} />
      <Route path="/blogs" element={<BlogReviewPage />} />
      <Route path="/blog-write" element={<BlogReviewWrite />} />
      <Route path="/blog-detail" element={<BlogReviewDetail />} />
    </Routes>
    <ReactQueryDevtools />
    <Footer />
  </BrowserRouter>
);

export default App;
