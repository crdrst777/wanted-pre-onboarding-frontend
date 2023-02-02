import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Nav from "./components/Nav";
import SignUp from "../src/pages/SignUp";
import SignIn from "../src/pages/SignIn";
import TodoList from "./pages/TodoList/TodoList";

function App() {
  const haveToken = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Nav />

      <Routes>
        {/* 로컬 스토리지에 토큰이 있는 상태로 /signin 또는 /signup 페이지에 접속한다면 /todo 경로로 리다이렉트 시켜주세요 */}
        {/* 로컬 스토리지에 토큰이 없는 상태로 /todo페이지에 접속한다면 /signin 경로로 리다이렉트 시켜주세요 */}
        <Route
          path="/signin"
          element={!haveToken ? <SignIn /> : <Navigate to="/todo" replace />}
        />
        <Route
          path="/signup"
          element={!haveToken ? <SignUp /> : <Navigate to="/todo" />}
        />
        <Route
          path="/todo"
          element={haveToken ? <TodoList /> : <Navigate to="/signin" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
