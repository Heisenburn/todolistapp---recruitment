import ApiCommunication from '../../apiFunctions/ApiCommunication';
const db = new ApiCommunication()

const AddTodo = ({ controlledInputValues, setControlledInputValues, setAddMode, setUpdating }) => {
    const handleAddTodo = (event) => {
        event.preventDefault();

        setUpdating(true);
        let tempAddObject = {
            is_completed: 0,
            task: controlledInputValues.addNewTodoInputValue,
        };

        controlledInputValues.addNewTodoInputValue.length && //validating form
            setControlledInputValues({ ...controlledInputValues, addNewTodoInputValue: '' });
        db.sendToServer(tempAddObject.task, 0, setUpdating);
        setAddMode(false);
    };

    return (
        <form id="addTodoForm" onSubmit={handleAddTodo}>
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
};

export default AddTodo;
