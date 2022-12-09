import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";

import Main from "./pages/Main";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import TodoList from "./pages/TodoList";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/todolist" element={<TodoList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
