import { useState } from "react";
import Filters from "./components/Filters";
import Header from "./components/Header";
import TodoList from "./components/TodoList";

export default function Home({toDoListData, setTodoList}) {
    const [searchText, setSearchText] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    // Filter todos based on search text and status
    const filteredTodos = toDoListData.filter(todo => {
        const matchesSearch = todo["todo-title"].toLowerCase().includes(searchText.toLowerCase()) ||
                            todo["todo-description"].toLowerCase().includes(searchText.toLowerCase());
        const matchesStatus = statusFilter === 'all' || todo["todo-status"] === statusFilter;
        
        return matchesSearch && matchesStatus;
    });

    return(
        <>
            <Header />
            <Filters 
                searchText={searchText} 
                setSearchText={setSearchText}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
            />
            <TodoList toDoListData={filteredTodos} setTodoList={setTodoList} />
        </>
    );
}