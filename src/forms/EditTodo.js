const TodoInspectMode = ({
    todos,
    setTodos,
    elementCurrentlyBeingEdited,
    controlledInputValues,
    setControlledInputValues,
    setTodoInspectModeState,
    todoInspectModeState,
}) => {
    const handleEditTodo = (newValue) => {
        let tempArray = [...todos];

        tempArray[elementCurrentlyBeingEdited].value = newValue;

        setTodos(tempArray);
    };

    const handleClickCheckbox = () => {
        let tempArray = [...todos];

        tempArray[elementCurrentlyBeingEdited].isCompleted = !tempArray[elementCurrentlyBeingEdited]
            .isCompleted; //changing to opposite value

        setTodos(tempArray);
        setTodoInspectModeState(false);
    };

    const handleDeleteTodo = (event) => {
        event.preventDefault();
        let filteredArray = todos.filter((item) => item.id !== elementCurrentlyBeingEdited);

        filteredArray = filteredArray.map((item, index) => {
            return {
                id: index,
                value: item.value,
                isCompleted: item.isCompleted,
            };
        });

        setTodos(filteredArray);
        setTodoInspectModeState(false);
    };

    const handleEditSubmitForm = (event) => {
        event.preventDefault();

        if (controlledInputValues.editTodoInputValue.length >= 1) {
            //validating form

            handleEditTodo(controlledInputValues.editTodoInputValue);
            setControlledInputValues({ ...controlledInputValues, editTodoInputValue: '' });
            setTodoInspectModeState(false);
        }
    };

    if (todoInspectModeState === true) {
        return (
            <form onSubmit={handleEditSubmitForm}>
                <label htmlFor="editTodoInput">Edit element</label>
                <input
                    id="editTodoInput"
                    value={controlledInputValues.editTodoInputValue}
                    onChange={(event) =>
                        setControlledInputValues({
                            ...controlledInputValues,
                            editTodoInputValue: event.target.value,
                        })
                    }
                ></input>
                <input
                    type="checkbox"
                    onClick={() => handleClickCheckbox(elementCurrentlyBeingEdited)}
                    defaultChecked={todos[elementCurrentlyBeingEdited].isCompleted}
                ></input>

                <input type="submit" value="submit edit"></input>
                <button onClick={handleDeleteTodo}>delete</button>
            </form>
        );
    }
    return null;
};

export default TodoInspectMode;
