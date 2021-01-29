const TodoInspectMode = ({
    todos,
    setTodos,
    elementCurrentlyBeingEdited,
    editTodoInputValue,
    setEditTodoInputValue,
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
    };

    const handleDeleteTodo = () => {
         
      
        let filteredArray = todos.filter((item) => item.id !== elementCurrentlyBeingEdited);
     
       

        filteredArray = filteredArray.map((item, index) => {
         
            return {
                id: index,  
                value: item.value,
                isCompleted: item.isCompleted,
            };
        });

        

        setTodos(filteredArray);
    };

    const handleEditSubmitForm = (event) => {
        event.preventDefault();

        //TODO: walidacja

        handleEditTodo(editTodoInputValue);
        setEditTodoInputValue('');
        setTodoInspectModeState(false);
    };

    if (todoInspectModeState === true) {
        return (
            <form onSubmit={handleEditSubmitForm}>
                <label htmlFor="editTodoInput">Edit element</label>
                <input
                    id="editTodoInput"
                    value={editTodoInputValue}
                    onChange={(event) => setEditTodoInputValue(event.target.value)}
                ></input>
                <input
                    type="checkbox"
                    onClick={() => handleClickCheckbox(elementCurrentlyBeingEdited)}
                    defaultChecked={todos[elementCurrentlyBeingEdited].isCompleted}
                ></input>
                <button onClick={handleDeleteTodo}>X</button>
                <input type="submit" value="submit edit"></input>
            </form>
        );
    }
    return null;
};

export default TodoInspectMode;
