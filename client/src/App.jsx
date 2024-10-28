import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import Chatbot from "./components/layout/Chatbot";

function App() {
  return (
    <>
      <Chatbot></Chatbot>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer> 
    </>
  );
}

export default App;
