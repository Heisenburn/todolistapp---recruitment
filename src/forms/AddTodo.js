const AddTodo = ({
    todoInspectModeState,
    setTodos,
    todos,
    controlledInputValues,
    setControlledInputValues,
}) => {
    const handleAddTodo = (event) => {
        event.preventDefault();

        if (controlledInputValues.addNewTodoInputValue.length >= 1) {
            //validating form

            setTodos([
                ...todos,
                {
                    id: todos.length,
                    value: controlledInputValues.addNewTodoInputValue,
                    isCompleted: false,
                },
            ]);

            setControlledInputValues({ ...controlledInputValues, addNewTodoInputValue: '' });
        }
    };

    if (todoInspectModeState === false) {
        return (
            <form onSubmit={handleAddTodo}>
                <label htmlFor="addNewTodoInput">Add new element</label>
                <input
                    id="addNewTodoInput"
                    value={controlledInputValues.addNewTodoInputValue}
                    onChange={(event) =>
                        setControlledInputValues({
                            ...controlledInputValues,
                            addNewTodoInputValue: event.target.value,
                        })
                    }
                ></input>
                <input type="submit" value="Add todo"></input>
            </form>
        );
    }
    return null;
};

export default AddTodo;
