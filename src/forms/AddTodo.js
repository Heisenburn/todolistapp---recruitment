const addTodoToServer = (elementToBeSend) => {

    const customFormData = new FormData();
    customFormData.append('task', 'tresc taska');
    customFormData.append('is_completed', 0);
    customFormData.append('id', '');
    
    fetch('https://react.massivepixel.io/api/rudnik.marcin/1', {
        method: 'POST',
        body: customFormData,
    })
        .then((response) => response.json())
        .then((json) => console.log(json))
        .catch((error) => console.log('Error:: ' + error.message));
};

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
            addTodoToServer(todos);
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
