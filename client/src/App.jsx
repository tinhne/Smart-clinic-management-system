import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./component/layout/header";
import Footer from "./component/layout/footer";
function App() {
  return (
    <>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
}

export default App;
