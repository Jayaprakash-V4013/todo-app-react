import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { reandumNumer } from "../utils/utils";

export default function AddTodoForm({ todoList, setTodoList }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        "todo-title": '',
        "todo-description": '',
        "todo-status": 'inprogress',
        "todo-due-date": '',
        "todo-priority": 'low'
    });

    const [errors, setErrors] = useState({});

    // Validation rules
    const validators = {
        "todo-title": value => value.trim() ? "" : "Title is required",
        "todo-description": value => value.trim() ? "" : "Description is required",
        "todo-due-date": value => value ? "" : "Due date is required"
    };

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    function storeToDo(e) {
        e.preventDefault();

        let newErrors = {};

        // Run all validations
        for (let key in validators) {
            const error = validators[key](formData[key]);
            if (error) newErrors[key] = error;
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        setTodoList([
            ...todoList,
            {
                id: reandumNumer()+ todoList.length,
                "todo-title": formData["todo-title"],
                "todo-description": formData["todo-description"],
                "todo-status": formData["todo-status"],
                "todo-due-date": formData["todo-due-date"],
                "todo-priority": formData["todo-priority"]
            }
        ]);

        // Navigate to home page after adding todo
        navigate("/");
    }

    return (
        <div className="addtodo-item-form">
            <form onSubmit={storeToDo}>
                <h3>Add a New Todo</h3>
                <div className="form-element-div">
                    <label htmlFor="todo-title">Title:</label>
                    <input type="text" id="todo-title" name="todo-title" value={formData["todo-title"]} onChange={handleChange} placeholder="Enter todo title" />
                    <div className="todo-error-txt">{errors["todo-title"]}</div>
                </div>
                <div className="form-element-div">
                    <label htmlFor="todo-description">Description:</label>
                    <textarea id="todo-description" name="todo-description" value={formData["todo-description"]} onChange={handleChange} placeholder="Enter todo description"></textarea>
                    <div className="todo-error-txt">{errors["todo-description"]}</div>
                </div>
                <div className="form-element-div">
                    <label htmlFor="todo-status">Status:</label>
                    <select id="todo-status" name="todo-status" value={formData["todo-status"]} onChange={handleChange}>
                        <option value="inprogress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <div className="form-element-div">
                    <label htmlFor="todo-due-date">Due Date:</label>
                    <input type="date" id="todo-due-date" name="todo-due-date" value={formData["todo-due-date"]} onChange={handleChange} />
                    <div className="todo-error-txt">{errors["todo-due-date"]}</div>
                </div>
                <div className="form-element-div">
                    <label htmlFor="todo-priority">Priority:</label>
                    <select id="todo-priority" name="todo-priority" value={formData["todo-priority"]} onChange={handleChange}>
                        <option value="low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <button type="submit">Add Todo</button>
            </form>
        </div>
    )
}