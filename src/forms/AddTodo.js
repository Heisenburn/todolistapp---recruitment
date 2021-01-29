

const AddTodo = ({
    todoInspectModeState,
    onHandleFormSubmit,
    controlledInputValues,
    setControlledInputValues,
}) => {
    if (todoInspectModeState === false) {
        return (
            <form onSubmit={onHandleFormSubmit}>
                <label htmlFor="addNewTodoInput">Add new element</label>
                <input
                    id="addNewTodoInput"
                    value={controlledInputValues.addNewTodoInputValue}
                    onChange={(event) => setControlledInputValues({ ...controlledInputValues, addNewTodoInputValue: event.target.value })}
                ></input>
                <input type="submit" value="Add todo"></input>
            </form>
        );
    }
    return null;
};

export default AddTodo;
