import { sendToServer } from '../../apiFunctions/send';

const AddTodo = ({ controlledInputValues, setControlledInputValues, setAddMode }) => {
    const handleAddTodo = (event) => {
        event.preventDefault();

        let tempAddObject = {
            is_completed: 0,
            task: controlledInputValues.addNewTodoInputValue,
        };

        controlledInputValues.addNewTodoInputValue.length && //validating form
        setControlledInputValues({ ...controlledInputValues, addNewTodoInputValue: '' });
        sendToServer(tempAddObject.task, 0);
        setAddMode(false);
 
    };

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
};

export default AddTodo;
