import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Main from "./pages/Main";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ExhibitionList from "./pages/ExhibitionList";
import Exhibition from "./pages/Exhibition";
import Footer from "./components/Footer";
import MateList from "./pages/MateList";
import Mate from "./pages/Mate";

const App = () => (
  <BrowserRouter>
    <Nav />
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup?" element={<SignUp />} />
      <Route path="/exhibition-list" element={<ExhibitionList />} />
      <Route path="/exhibition/:id" element={<Exhibition />} />
      <Route path="/mate-list" element={<MateList />} />
      <Route path="/mate/:id" element={<Mate />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);

export default App;
