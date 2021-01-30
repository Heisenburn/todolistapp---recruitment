import sendToServer from '../apiFunctions/send';
 

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
            
            let tempAddObject = {
                id: todos.length,
                value: controlledInputValues.addNewTodoInputValue,
                isCompleted: 0,
            }
            setTodos([
                ...todos,tempAddObject,
            ]);

            setControlledInputValues({ ...controlledInputValues, addNewTodoInputValue: '' });
            // sendToServer(tempAddObject);
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
