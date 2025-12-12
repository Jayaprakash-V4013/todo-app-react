import { use, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function TodoList({ toDoListData, setTodoList }) {
    const navigate = useNavigate();
    
    const [todoData, setTodoData] = useState([]);
    const [ backgroundColor, setBackgroundColor ] = useState(["#000000", "#e63e3e", "#976a1c", "#898b22", "#3f8344ff", "#15838fff", "#1d1f80ff", "#8f1433ff", "#e63ed4", "#e67e3eff", "#3e9de6ff"]);

    useEffect(() => {
        // console.log("Todo List Data:", JSON.stringify(localStorage.getItem("todoList")));
        setTodoData(toDoListData);
    }, [toDoListData]);

    function deleteTodo(e) {
        const todoId = parseInt(e.target.getAttribute("data-todo-id"));
        const updatedTodoData = todoData.filter(item => item.id !== todoId);
        setTodoData(updatedTodoData);
        setTodoList(updatedTodoData); // Update parent state
    }

    function updateTodo(e) {
        e.preventDefault();
        const todoId = parseInt(e.target.getAttribute("data-todo-id"));
        navigate(`/update-toDo/${todoId}`);
    }

    return (
        <div className="toDo-list-comp">
            <h2 style={{ textAlign: 'center' }}>Your Todo Lists</h2>
            <div className="todo-list">
                <div className="row">
                    {todoData.length !== 0 ?
                    todoData.map(element => (
                        <div className="todo-item" key={element.id} style={{ backgroundColor: backgroundColor[element.id % backgroundColor.length] }}>
                            <h3>{element["todo-title"]}</h3>
                            <p>{element["todo-description"]}</p>
                            <p>Status: {element["todo-status"]}</p>
                            <p>Due Date: {element["todo-due-date"]}</p>
                            <p>Priority: {element["todo-priority"]}</p>
                            <div className="todo-list-action-div">
                                <button className="todo-item-btn todo-edit-btn" data-todo-id={element.id} onClick={updateTodo}>Edit</button>
                                <button className="todo-item-btn todo-delete-btn" data-todo-id={element.id} onClick={deleteTodo}>Delete</button>
                            </div>
                        </div>
                    )) : ''}
                    <Link to="/add-toDo" className="dummy-element-item">
                        <svg width="100" height="100" viewBox="0 0 24 24" fill="#ffffffff" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
}