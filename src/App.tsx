import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import ScrollTop from "./components/ScrollTop";
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
import MateWrite from "./pages/MateWrite";
import BlogReviewList from "./pages/BlogReviewList";
import BlogReviewWrite from "./pages/BlogReviewWrite";
import BlogReviewUpdate from "./pages/BlogReviewModify";
import BlogReview from "./pages/BlogReview";
import Footer from "./components/Footer";

const App = () => (
  <BrowserRouter>
    <ScrollTop />
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
      <Route path="/mate-write" element={<MateWrite />} />
      <Route path="/blogreview-list" element={<BlogReviewList />} />
      <Route path="/blogreview-write" element={<BlogReviewWrite />} />
      <Route path="/blogreview-edit" element={<BlogReviewUpdate />} />
      <Route path="/blog/:id" element={<BlogReview />} />
    </Routes>
    <ReactQueryDevtools />
    <Footer />
  </BrowserRouter>
);

export default App;
