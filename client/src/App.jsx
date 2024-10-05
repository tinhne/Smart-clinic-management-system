import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./component/layout/header";
function App() {
return (
  <>
  <Header></Header>
  <Outlet></Outlet>
  </>
)
}

export default App;
