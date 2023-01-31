import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import SignUp from "../src/pages/SignUp";
import SignIn from "./pages/SignIn";
import TodoList from "./pages/TodoList/TodoList";

function App() {
  return (
    <BrowserRouter>
      <Nav />

      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/todo" element={<TodoList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
