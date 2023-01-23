import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/dashboardPage";
import LoginPage from "./pages/login/Login";
import MessengerPage from "./pages/Messenger/Messenger";
import ChatRoom from "./pages/chatRoomPage"

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element = {<LoginPage/>}></Route>
      <Route path="/dashboard" element = {<DashboardPage/>}></Route>
      <Route path="/" element = {<MessengerPage/>}></Route>
      <Route path="/chatRoom/:id" element = {<ChatRoom/>}></Route>
    </Routes>
  </BrowserRouter>
    )

}

export default App;
