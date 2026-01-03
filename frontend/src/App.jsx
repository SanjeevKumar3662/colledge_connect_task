import { useState } from "react";
import "./App.css";

import Todos from "./components/Todos";
import { TodoForm } from "./components/TodoForm";

import { Routes, Route } from "react-router-dom";

function App() {
  // const [count, setCount] = useState(0)
  const [todos, setTodos] = useState([]);

  // console.log(user);

  return (
    <>
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <div className="main">
                {/* <TodoForm todos={todos} setTodos={setTodos} /> */}
                <Todos todos={todos} setTodos={setTodos} />
              </div>
            }
          ></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
