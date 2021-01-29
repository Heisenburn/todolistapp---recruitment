const AddTodo = ({
    todoInspectModeState,
    onHandleFormSubmit,
    addNewTodoInputValue,
    setAddNewTodoInputValue,
}) => {
    if (todoInspectModeState === false) {
        return (
            <form onSubmit={onHandleFormSubmit}>
                <label htmlFor="addNewTodoInput">Add new element</label>
                <input
                    id="addNewTodoInput"
                    value={addNewTodoInputValue}
                    onChange={(event) => setAddNewTodoInputValue(event.target.value)}
                ></input>
                <input type="submit" value="Add todo"></input>
            </form>
        );
    }
    return null;
};

export default AddTodo;
