import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Main from "./pages/main/Main";
import Login from "./pages/login/Login";
import SignUp from "./pages/signUp/SignUp";
import ExhibitionList from "./pages/exhibitionList/ExhibitionList";
import Exhibition from "./pages/exhibition/Exhibition";
import Footer from "./components/Footer";

const App = () => (
  <BrowserRouter>
    <Nav />
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup/:type" element={<SignUp />} />
      <Route path="/exhibition-list" element={<ExhibitionList />} />
      <Route path="/exhibition/:id" element={<Exhibition />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);

export default App;
