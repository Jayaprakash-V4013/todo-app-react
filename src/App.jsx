import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AddTodoForm from './components/AddTodoForm'
import Home from './Home'
import UpdateTodoForm from './components/UpdateTodoForm'

function App() {
  const [todoList, setTodoList] = useState(() => {
    const savedTodos = localStorage.getItem("todoList");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
    // console.log(localStorage.getItem("todoList"), 'Home page');
  }, [todoList]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Home toDoListData={todoList} setTodoList={setTodoList} /> } />
          <Route path="/add-toDo" element={ <AddTodoForm todoList={todoList} setTodoList={setTodoList} /> } />
          <Route path="/update-toDo/:id" element={ <UpdateTodoForm todoList={todoList} setTodoList={setTodoList} /> } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
