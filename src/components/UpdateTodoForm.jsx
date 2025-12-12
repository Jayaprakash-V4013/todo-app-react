import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateTodoForm({ todoList, setTodoList }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [currentTodoData, setCurrentTodoData] = useState({
        "todo-title": '',
        "todo-description": '',
        "todo-status": 'inprogress',
        "todo-due-date": '',
        "todo-priority": 'low'
    });

    useEffect(() => {
        const currentTodo = todoList.find(todo => todo.id === parseInt(id));
        if (currentTodo) {
            setCurrentTodoData(currentTodo);
        }
    }, [id, todoList]);

    function handleChange(e) {
        setCurrentTodoData({
            ...currentTodoData,
            [e.target.name]: e.target.value
        });
    }

    function updateTodo(e) {
        e.preventDefault();
        
        // Update the todo in the list
        const updatedTodoList = todoList.map(todo => 
            todo.id === parseInt(id) ? currentTodoData : todo
        );
        
        setTodoList(updatedTodoList);
        navigate("/");                                                                
    }

    return(
        <div className="addtodo-item-form">
            <form onSubmit={updateTodo}>
                <h3>Update Todo</h3>
                <div className="form-element-div">
                    <label htmlFor="todo-title">Title:</label>
                    <input type="text" id="todo-title" name="todo-title" placeholder="Enter todo title" value={currentTodoData["todo-title"] || ''} onChange={handleChange} />
                    <div className="todo-error-txt"></div>
                </div>
                <div className="form-element-div">
                    <label htmlFor="todo-description">Description:</label>
                    <textarea id="todo-description" name="todo-description" placeholder="Enter todo description" value={currentTodoData["todo-description"] || ''} onChange={handleChange}></textarea>
                    <div className="todo-error-txt"></div>
                </div>
                <div className="form-element-div">
                    <label htmlFor="todo-status">Status:</label>
                    <select id="todo-status" name="todo-status" value={currentTodoData["todo-status"] || 'inprogress'} onChange={handleChange}>
                        <option value="inprogress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <div className="form-element-div">
                    <label htmlFor="todo-due-date">Due Date:</label>
                    <input type="date" id="todo-due-date" name="todo-due-date" value={currentTodoData["todo-due-date"] || ''} onChange={handleChange} />
                    <div className="todo-error-txt"></div>
                </div>
                <div className="form-element-div">
                    <label htmlFor="todo-priority">Priority:</label>
                    <select id="todo-priority" name="todo-priority" value={currentTodoData["todo-priority"] || 'low'} onChange={handleChange}>
                        <option value="low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <button type="submit">Update Todo</button>
            </form>
        </div>
    );
}