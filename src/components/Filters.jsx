export default function Filters({ searchText, setSearchText, statusFilter, setStatusFilter }) {

    function fileterByText(e) {
        setSearchText(e.target.value);
    }

    function filterByStatus(e) {
        setStatusFilter(e.target.value);
    }

    return (
        <div className="filter-section">
            <div className="filter-section-left">
                <h3>Filters</h3>
            </div>
            <div className="filter-section-right">
                <input 
                    type="text" 
                    placeholder="Search the todo.." 
                    value={searchText}
                    onChange={fileterByText} 
                />
                <select 
                    name="select-todo-status" 
                    id="select-todo-status" 
                    value={statusFilter}
                    onChange={filterByStatus}
                >
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="inprogress">In Progress</option>
                </select>
            </div>
        </div>
    );
}